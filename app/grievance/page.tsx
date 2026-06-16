import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Grievance from "@/components/Grievance";

export const metadata: Metadata = {
  title: "File a grievance — Lamjung",
  description:
    "File a grievance or suggestion with Hon. Dharma Raj K.C., MP (Lamjung-1). The identity of the person filing the grievance is kept confidential.",
};

export default function GrievancePage() {
  return (
    <>
      <Nav />
      <Grievance />
      <Footer />
    </>
  );
}
