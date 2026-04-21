import { NextResponse } from "next/server";
import { FORM } from "@/content/applicationForm";

type Values = Record<string, string | string[] | boolean>;

export const runtime = "nodejs";

function generateId() {
  const n = String(Math.floor(Math.random() * 9000) + 1000);
  return `LJ-EXP-2082-${n}`;
}

function validate(values: Values): string[] {
  const missing: string[] = [];
  for (const s of FORM) {
    for (const f of s.fields) {
      if (!f.required) continue;
      const v = values[f.id];
      if (f.type === "checkboxes") {
        if (!Array.isArray(v) || v.length === 0) missing.push(f.id);
      } else if (f.type === "consent") {
        if (v !== true) missing.push(f.id);
      } else if (typeof v !== "string" || v.trim() === "") {
        missing.push(f.id);
      }
    }
  }
  return missing;
}

async function postToAirtable(id: string, values: Values): Promise<boolean> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "Expert Applicants";
  if (!token || !baseId) return false;

  const fields: Record<string, unknown> = {
    "Application ID": id,
    Name: values.name,
    Email: values.email,
    Phone: values.phone,
    "Current Location": values.currentLocation,
    "Permanent Address": values.permanentAddress,
    "Connection to Lamjung": values.connection,
    "Age Group": values.age,
    Gender: values.gender,
    "Role": values.role,
    Organization: values.organization,
    Sector: Array.isArray(values.sectors) ? values.sectors : [],
    "Sub-specialization": values.subSpecialization,
    "Years of Experience": values.yearsExperience,
    Qualification: values.qualification,
    "Key Skills": values.achievements,
    "Lamjung Experience": values.lamjungExperience,
    Projects: values.projects,
    "Portfolio Link": values.portfolioLink,
    "CV Link": values.cvLink,
    "Problem Statement": values.topProblems,
    "Proposed Solution": values.solution,
    "Implementation Approach": values.implementation,
    KPIs: values.kpis,
    "Virtual Meet Willing": values.virtualMeet === "yes",
    "Workshop Willing": values.workshop,
    "Hours/Week": values.hoursPerWeek,
    "Travel Support": values.travelSupport,
    "Prior Collaboration": values.priorCollaboration,
    "Mentor/Lead": values.mentorLead,
    Languages: Array.isArray(values.languages) ? values.languages : [],
    Notes: values.notes,
    Status: "New",
  };

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      },
    );
    if (!res.ok) {
      const body = await res.text();
      console.error("[apply] Airtable error:", res.status, body);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[apply] Airtable exception:", e);
    return false;
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const values = (body as { values?: Values }).values;
  if (!values || typeof values !== "object") {
    return NextResponse.json({ error: "missing_values" }, { status: 400 });
  }

  const missing = validate(values);
  if (missing.length > 0) {
    return NextResponse.json({ error: "missing_fields", fields: missing }, { status: 400 });
  }

  const id = generateId();

  // Log the submission — visible in Vercel logs. Production: replace with
  // Airtable (set AIRTABLE_TOKEN + AIRTABLE_BASE_ID env vars) or another
  // persistence layer (Supabase, Postgres, email).
  console.log("[apply] submission", { id, name: values.name, email: values.email, sectors: values.sectors });

  await postToAirtable(id, values);

  return NextResponse.json({ id });
}
