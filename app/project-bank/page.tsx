import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectBank from "@/components/ProjectBank";

export const metadata: Metadata = {
  title: "Project Bank — Lamjung",
  description:
    "Lamjung citizens can submit a project their ward or palika needs and request government funding through Hon. Dharma Raj K.C., MP (Lamjung-1).",
};

export default function ProjectBankPage() {
  return (
    <>
      <Nav />
      <ProjectBank />
      <Footer />
    </>
  );
}
