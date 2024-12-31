"use server";

import Hero from "@/components/ui/hero - 1";

export default async function Home() {
  return (
    <div className="flex-col flex w-screen overflow-x-hidden scroll-smooth">
      <div className="relative overflow-w-hidden">
        <Hero />
      </div>
    </div>
  );
}
