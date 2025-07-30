"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import captions from "../../public/portfolio/captions.json";

// All portfolio images from public/portfolio folder
const imagesSources = [
  { src: "1.png", caption: captions["1"] },
  { src: "2.png", caption: captions["2"] },
  { src: "3.png", caption: captions["3"] },
  { src: "4.png", caption: captions["4"] },
  { src: "5.png", caption: captions["5"] },
  { src: "6.png", caption: captions["6"] },
  { src: "7.png", caption: captions["7"] },
  { src: "8.png", caption: captions["8"] },
  { src: "9.png", caption: captions["9"] },
  { src: "10.png", caption: captions["10"] },
  { src: "11.png", caption: captions["11"] },
  { src: "12.png", caption: captions["12"] },
  { src: "13.png", caption: captions["13"] },
  { src: "14.png", caption: captions["14"] },
  { src: "15.png", caption: captions["15"] },
  { src: "16.png", caption: captions["16"] },
  { src: "17.png", caption: captions["17"] },
  { src: "18.png", caption: captions["18"] },
  { src: "19.png", caption: captions["19"] },
  { src: "20.png", caption: captions["20"] },
  { src: "21.png", caption: captions["21"] },
  { src: "22.png", caption: captions["22"] },
  { src: "23.png", caption: captions["23"] },
  { src: "24.png", caption: captions["24"] },
  { src: "25.png", caption: captions["25"] },
  { src: "26.png", caption: captions["26"] },
  { src: "27.png", caption: captions["27"] },
  { src: "28.png", caption: captions["28"] },
  { src: "29.png", caption: captions["29"] },
  { src: "30.png", caption: captions["30"] },
  { src: "31.png", caption: captions["31"] },
  { src: "32.png", caption: captions["32"] },
  { src: "33.png", caption: captions["33"] },
  { src: "34.png", caption: captions["34"] },
  { src: "35.png", caption: captions["35"] },
  { src: "36.png", caption: captions["36"] },
  { src: "37.png", caption: captions["37"] },
  { src: "38.png", caption: captions["38"] },
  { src: "53.png", caption: captions["53"] },
  { src: "54.png", caption: captions["54"] },
  { src: "55.png", caption: captions["55"] },
  { src: "56.png", caption: captions["56"] },
  { src: "57.png", caption: captions["57"] },
  { src: "58.png", caption: captions["58"] },
  { src: "59.png", caption: captions["59"] },
  { src: "60.png", caption: captions["60"] },
  { src: "61.png", caption: captions["61"] },
  { src: "62.png", caption: captions["62"] },
  { src: "63.png", caption: captions["63"] },
  { src: "64.png", caption: captions["64"] },
  { src: "65.png", caption: captions["65"] },
  { src: "66.png", caption: captions["66"] },
  { src: "67.png", caption: captions["67"] },
  { src: "68.png", caption: captions["68"] },
  { src: "69.png", caption: captions["69"] },
  { src: "70.png", caption: captions["70"] },
  { src: "71.png", caption: captions["71"] },
  { src: "72.png", caption: captions["72"] },
  { src: "73.png", caption: captions["73"] },
  { src: "74.png", caption: captions["74"] },
  { src: "75.png", caption: captions["75"] },
  { src: "76.png", caption: captions["76"] },
  { src: "77.png", caption: captions["77"] },
  { src: "78.png", caption: captions["78"] },
  { src: "79.png", caption: captions["79"] },
  { src: "80.png", caption: captions["80"] },
  { src: "81.png", caption: captions["81"] },
  { src: "82.png", caption: captions["82"] },
  { src: "83.png", caption: captions["83"] },
  { src: "84.png", caption: captions["84"] },
];

const randomizedImages = imagesSources.sort(() => Math.random() - 0.5);

// Function to load image and get its dimensions
const loadImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      // Fallback dimensions if image fails to load
      resolve({ width: 400, height: 300 });
    };
    img.src = `/portfolio/${src}`;
  });
};

// Base item interface for layout calculation
interface BaseItem {
  src: string;
  caption: string;
  x: number;
  y: number;
  w: number;
  h: number;
  originalW: number;
  originalH: number;
}

interface GridItem {
  el: HTMLDivElement;
  container: HTMLDivElement;
  wrapper: HTMLDivElement;
  img: HTMLImageElement;
  x: number;
  y: number;
  w: number;
  h: number;
  extraX: number;
  extraY: number;
  rect: DOMRect;
  ease: number;
  isRendered: boolean;
  src: string;
}

interface ScrollState {
  current: { x: number; y: number };
  target: { x: number; y: number };
  last: { x: number; y: number };
  ease: number;
}

const InfiniteGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<GridItem[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<ScrollState>({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    ease: 0.1,
  });
  const tileSizeRef = useRef({ w: 0, h: 0 });
  const isDraggingRef = useRef(false);
  const dragRef = useRef({ startX: 0, startY: 0, scrollX: 0, scrollY: 0 });

  const openModal = useCallback((imageSrc: string) => {
    if (!modalRef.current) return;

    const modalImage = modalRef.current.querySelector(
      "img"
    ) as HTMLImageElement;
    if (modalImage) {
      modalImage.src = `/portfolio/${imageSrc}`;
    }

    modalRef.current.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Animate in
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      modalImage,
      { scale: 0.7 },
      { scale: 0.9, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, []);

  const closeModal = useCallback(() => {
    if (!modalRef.current) return;

    const modalImage = modalRef.current.querySelector(
      "img"
    ) as HTMLImageElement;

    // Animate out
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        if (modalRef.current) {
          modalRef.current.style.display = "none";
          document.body.style.overflow = "auto";
        }
      },
    });
    gsap.to(modalImage, {
      scale: 0.9,
      duration: 0.2,
      ease: "power2.in",
    });
  }, []);

  const onResize = useCallback(async () => {
    if (!containerRef.current) return;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const gap = 20;

    // Reset scroll state
    scrollRef.current.current = { x: 0, y: 0 };
    scrollRef.current.target = { x: 0, y: 0 };
    scrollRef.current.last = { x: 0, y: 0 };

    // Clear existing tiles
    containerRef.current.innerHTML = "";

    // Load all image dimensions
    const imageDimensions = await Promise.all(
      randomizedImages.map((source) => loadImageDimensions(source.src))
    );

    // Generate tiles based on actual image dimensions
    const baseItems: BaseItem[] = [];
    const maxSize = Math.min(winW, winH) * 0.4; // Max size relative to viewport
    const minSize = 200; // Minimum size

    let currentX = 0;
    let currentY = 0;
    let rowHeight = 0;

    randomizedImages.forEach((source, index) => {
      const dimensions = imageDimensions[index];

      // Scale image to fit within reasonable bounds while maintaining aspect ratio
      const aspectRatio = dimensions.width / dimensions.height;
      let scaledWidth, scaledHeight;

      if (dimensions.width > dimensions.height) {
        // Landscape orientation
        scaledWidth = Math.max(
          minSize,
          Math.min(maxSize, dimensions.width * 0.3)
        );
        scaledHeight = scaledWidth / aspectRatio;
      } else {
        // Portrait or square orientation
        scaledHeight = Math.max(
          minSize,
          Math.min(maxSize, dimensions.height * 0.3)
        );
        scaledWidth = scaledHeight * aspectRatio;
      }

      // Check if we need to wrap to next row
      if (currentX + scaledWidth > winW * 1.2) {
        // Allow some overflow for wrapping
        currentX = 0;
        currentY += rowHeight + gap;
        rowHeight = 0;
      }

      baseItems.push({
        src: source.src,
        caption: source.caption,
        x: currentX,
        y: currentY,
        w: scaledWidth,
        h: scaledHeight,
        originalW: dimensions.width,
        originalH: dimensions.height,
      });

      currentX += scaledWidth + gap;
      rowHeight = Math.max(rowHeight, scaledHeight);
    });

    // Calculate total grid dimensions based on actual layout
    const maxX = Math.max(...baseItems.map((item) => item.x + item.w));
    const maxY = Math.max(...baseItems.map((item) => item.y + item.h));

    tileSizeRef.current = {
      w: maxX + gap,
      h: maxY + gap,
    };

    itemsRef.current = [];

    // Create 3x3 tiling for better infinite scroll coverage
    const reps = [
      { x: -tileSizeRef.current.w, y: -tileSizeRef.current.h },
      { x: 0, y: -tileSizeRef.current.h },
      { x: tileSizeRef.current.w, y: -tileSizeRef.current.h },
      { x: -tileSizeRef.current.w, y: 0 },
      { x: 0, y: 0 },
      { x: tileSizeRef.current.w, y: 0 },
      { x: -tileSizeRef.current.w, y: tileSizeRef.current.h },
      { x: 0, y: tileSizeRef.current.h },
      { x: tileSizeRef.current.w, y: tileSizeRef.current.h },
    ];

    baseItems.forEach((base) => {
      reps.forEach((offset) => {
        // Create item DOM structure
        const el = document.createElement("div");
        el.classList.add("item");
        el.style.position = "absolute";
        el.style.width = `${base.w}px`;
        el.style.willChange = "transform";

        const wrapper = document.createElement("div");
        wrapper.classList.add("item-wrapper");
        wrapper.style.willChange = "transform";
        el.appendChild(wrapper);

        const itemImage = document.createElement("div");
        itemImage.classList.add("item-image");
        itemImage.style.width = `${base.w}px`;
        itemImage.style.height = `${base.h}px`;
        itemImage.style.overflow = "hidden";
        itemImage.style.borderRadius = "16px";
        itemImage.style.border = "1px solid #e5e7eb";
        wrapper.appendChild(itemImage);

        const img = new Image();
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.willChange = "transform";
        img.style.cursor = "pointer";

        // Add click handler for zoom
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          openModal(base.src);
        });

        itemImage.appendChild(img);

        // Don't append to DOM immediately - will be added when in viewport

        // Store item metadata
        itemsRef.current.push({
          el,
          container: itemImage,
          wrapper,
          img,
          x: base.x + offset.x,
          y: base.y + offset.y,
          w: base.w,
          h: base.h,
          extraX: 0,
          extraY: 0,
          rect: el.getBoundingClientRect(),
          ease: Math.random() * 0.1 + 0.9,
          isRendered: false,
          src: base.src,
        });
      });
    });

    // No need to multiply since we're using absolute positioning

    // Set initial scroll position to center the grid better
    scrollRef.current.current.x =
      scrollRef.current.target.x =
      scrollRef.current.last.x =
        -(tileSizeRef.current.w - winW) / 2;
    scrollRef.current.current.y =
      scrollRef.current.target.y =
      scrollRef.current.last.y =
        -(tileSizeRef.current.h - winH) / 2;
  }, [openModal]);

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const factor = 0.4;
    scrollRef.current.target.x -= e.deltaX * factor;
    scrollRef.current.target.y -= e.deltaY * factor;
  }, []);

  const onPointerDown = useCallback((e: PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    document.documentElement.classList.add("dragging");
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.scrollX = scrollRef.current.target.x;
    dragRef.current.scrollY = scrollRef.current.target.y;
  }, []);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    document.documentElement.classList.remove("dragging");
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      scrollRef.current.target.x = dragRef.current.scrollX + dx;
      scrollRef.current.target.y = dragRef.current.scrollY + dy;
    }
  }, []);

  const render = useCallback(() => {
    const scroll = scrollRef.current;
    const tileSize = tileSizeRef.current;
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Smooth current → target
    scroll.current.x += (scroll.target.x - scroll.current.x) * scroll.ease;
    scroll.current.y += (scroll.target.y - scroll.current.y) * scroll.ease;

    // Calculate delta for parallax
    const dx = scroll.current.x - scroll.last.x;
    const dy = scroll.current.y - scroll.last.y;

    // Update each tile
    itemsRef.current.forEach((item) => {
      const parX = 5 * dx * item.ease;
      const parY = 5 * dy * item.ease;

      // Infinite wrapping - wrap tiles when they go off screen
      const posX = item.x + scroll.current.x + item.extraX + parX;
      if (posX > winW + 200) item.extraX -= tileSize.w * 3; // 3x3 grid
      if (posX + item.w < -200) item.extraX += tileSize.w * 3;

      const posY = item.y + scroll.current.y + item.extraY + parY;
      if (posY > winH + 200) item.extraY -= tileSize.h * 3; // 3x3 grid
      if (posY + item.h < -200) item.extraY += tileSize.h * 3;

      // Check if item should be visible (with buffer)
      const buffer = 200; // Buffer distance around viewport
      const isInViewport =
        posX > -buffer - item.w &&
        posX < winW + buffer &&
        posY > -buffer - item.h &&
        posY < winH + buffer;

      // Add to DOM if in viewport and not rendered
      if (isInViewport && !item.isRendered) {
        containerRef.current?.appendChild(item.el);
        // Load image when first rendered
        if (!item.img.src) {
          item.img.src = `/600/${item.src}`;
        }
        item.isRendered = true;
      }
      // Remove from DOM if out of viewport and rendered
      else if (!isInViewport && item.isRendered) {
        try {
          containerRef.current?.removeChild(item.el);
        } catch {
          // Element might already be removed, ignore error
        }
        item.isRendered = false;
      }

      // Only update transform for rendered items
      if (item.isRendered) {
        item.el.style.transform = `translate(${posX}px, ${posY}px)`;
      }
    });

    scroll.last.x = scroll.current.x;
    scroll.last.y = scroll.current.y;

    requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const initGrid = async () => {
      await onResize();
      requestAnimationFrame(render);
    };

    initGrid();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    onResize,
    onWheel,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    render,
    closeModal,
  ]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full relative shadow-lg"
        style={{ willChange: "transform" }}
      />

      {/* Modal for zoomed images */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 hidden items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        }}
        onClick={closeModal}
      >
        <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          {/* Zoomed image */}
          <img
            alt="Portfolio item"
            className="max-w-full max-h-full object-contain cursor-pointer"
            style={{
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
            onClick={closeModal}
          />
        </div>
      </div>

      {/* CSS for dragging cursor */}
      <style jsx global>{`
        .dragging {
          cursor: grabbing !important;
        }

        .dragging * {
          cursor: grabbing !important;
        }

        #images {
          cursor: grab;
        }
      `}</style>
    </div>
  );
};

export default InfiniteGrid;
