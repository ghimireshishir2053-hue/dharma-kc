import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import KrishiBank from "@/components/KrishiBank";

export const metadata: Metadata = {
  title: "Krishi Bank — Lamjung",
  description:
    "Connecting Lamjung farmers' produce with buyers and retailers across Nepal's cities, facilitated by MP Dharma Raj K.C.'s office.",
};

export default function KrishiBankPage() {
  return (
    <>
      <Nav />
      <KrishiBank />
      <Footer />
    </>
  );
}
