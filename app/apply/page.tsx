import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ApplyEmbed from "@/components/ApplyEmbed";

export const metadata: Metadata = {
  title: "Apply — Lamjung Development Initiative",
  description:
    "Apply as an expert or stakeholder for the Lamjung Development Initiative led by Hon. Dharma Raj K.C., MP (Lamjung-1).",
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <ApplyEmbed />
      <Footer />
    </>
  );
}
