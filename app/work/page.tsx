import InfiniteGrid from "@/components/ui/infinite-grid";

export default function WorkPage() {
  return (
    <div className="w-full h-[110lvh] sm:h-screen overflow-hidden bg-white">
      <div className="h-24 bg-gradient-to-b from-white to-transparent absolute top-0 left-0 right-0 z-10 block sm:hidden"></div>
      <div className="h-24 bg-gradient-to-b from-transparent to-white absolute -bottom-26 left-0 right-0 z-10 block"></div>
      <InfiniteGrid />
    </div>
  );
}
