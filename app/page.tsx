"use server";

import Hero from "@/components/ui/hero";

export default async function Home() {
  return (
    <div className="flex-col flex w-full overflow-x-hidden scroll-smooth">
      <div className="relative">
        <Hero />
      </div>
    </div>
  );
}
