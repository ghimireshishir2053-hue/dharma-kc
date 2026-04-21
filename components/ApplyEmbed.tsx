"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { CALL_FOR_EXPERTS as C } from "@/content/callForExperts";
import Icon from "./Icon";

export default function ApplyEmbed() {
  const { lang } = useLang();
  const hasForm = Boolean(C.formEmbedUrl && !C.formEmbedUrl.startsWith("["));

  return (
    <section className="section" style={{ background: "var(--bg)", paddingTop: 48 }}>
      <div className="container-x" style={{ maxWidth: 900 }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "var(--ink-muted)", fontSize: 13, marginBottom: 20,
          }}
        >
          ← {lang === "en" ? "Back to site" : "साइटमा फर्कनुहोस्"}
        </Link>

        <div className="eyebrow" style={{ marginBottom: 12 }}>
          {lang === "en" ? C.subtitleEn : C.subtitleNe}
        </div>
        <h1
          style={{
            fontSize: 36, fontWeight: 600, lineHeight: 1.15,
            letterSpacing: "-0.02em", marginBottom: 16,
            fontFamily: lang === "en" ? "var(--f-serif)" : "var(--f-deva-serif)",
          }}
        >
          {lang === "en"
            ? "Expert & Stakeholder Application"
            : "विज्ञ तथा सरोकारवाला आवेदन"}
        </h1>
        <p
          style={{
            color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          {lang === "en"
            ? "Please complete the form below. Shortlisted applicants will be invited to a virtual consultation, followed by a 2–3 day workshop in Besisahar. Estimated time: 15–20 minutes."
            : "तलको फारम भर्नुहोस्। छनोट भएका आवेदकहरूलाई भर्चुअल परामर्शपछि बेसीशहरमा २–३ दिने कार्यशालामा आमन्त्रण गरिनेछ। अनुमानित समय: १५–२० मिनेट।"}
        </p>

        {hasForm ? (
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "#fff",
            }}
          >
            <iframe
              src={C.formEmbedUrl}
              style={{
                width: "100%",
                minHeight: 900,
                border: 0,
                display: "block",
              }}
              title={
                lang === "en"
                  ? "Expert & Stakeholder Application Form"
                  : "विज्ञ तथा सरोकारवाला आवेदन फारम"
              }
            >
              {lang === "en" ? "Loading…" : "लोड हुँदैछ…"}
            </iframe>
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: "56px 32px", textAlign: "center",
              borderStyle: "dashed",
            }}
          >
            <div
              style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(201,138,31,0.14)", color: "var(--accent)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Icon name="clock" size={26} />
            </div>
            <h2 style={{ fontSize: 22, marginBottom: 10 }}>
              {lang === "en"
                ? "Application form is being prepared"
                : "आवेदन फारम तयारीको क्रममा छ"}
            </h2>
            <p
              style={{
                color: "var(--ink-dim)", fontSize: 14,
                maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.6,
              }}
            >
              {lang === "en"
                ? "The Google Form will appear here shortly. Please check back soon, or get in touch with the MP office for any queries."
                : "Google फारम यहाँ छिट्टै उपलब्ध हुनेछ। कृपया केही बेरपछि फेरि हेर्नुहोस्, वा प्रश्नको लागि सांसद कार्यालयमा सम्पर्क गर्नुहोस्।"}
            </p>
            <a
              href="mailto:office@dharmakc.np"
              className="btn btn-ghost"
              style={{ fontSize: 14 }}
            >
              <Icon name="mail" size={14} /> office@dharmakc.np
            </a>
          </div>
        )}

        <p
          className="mono"
          style={{
            marginTop: 20, fontSize: 12, color: "var(--ink-muted)",
            textAlign: "center", letterSpacing: "0.02em",
          }}
        >
          {lang === "en"
            ? "Responses are collected via Google Forms. Your data is handled by the MP office for the purposes of this initiative."
            : "प्रतिक्रियाहरू Google Forms मार्फत सङ्कलन गरिन्छ। तपाईंको विवरण सांसद कार्यालयले यो पहलका लागि मात्र प्रयोग गर्नेछ।"}
        </p>
      </div>
    </section>
  );
}
