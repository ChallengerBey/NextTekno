import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextTekno | En Ucuz Teknoloji Mağazası",
  description: "NextTekno - En uygun fiyatlı teknoloji ürünleri.",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
