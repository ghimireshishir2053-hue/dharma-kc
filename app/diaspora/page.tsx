import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DiasporaLamjung from "@/components/DiasporaLamjung";

export const metadata: Metadata = {
  title: "Diaspora Lamjung — MP Dharma Raj K.C.",
  description:
    "A network connecting the MP, citizens, and the nation with Lamjung's diaspora abroad for collaboration on investment, mentorship, skill transfer, and trade.",
};

export default function DiasporaPage() {
  return (
    <>
      <Nav />
      <DiasporaLamjung />
      <Footer />
    </>
  );
}
