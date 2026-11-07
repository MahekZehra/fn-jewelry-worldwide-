import { useEffect, useRef, useState } from "react";
import { FiMaximize2, FiMinimize2, FiMove, FiRotateCw, FiZoomIn, FiZoomOut } from "react-icons/fi";

/**
 * Hybrid product presentation:
 * - Uses real ordered images360 frames when supplied.
 * - With one image, provides subtle pointer tilt, cinematic ambient motion,
 *   and an accessible zoom/lightbox without claiming a true 360-degree view.
 * Add images360: ["/products/item-angle-01.jpg", ...] to a product
 * when genuine multiple-angle photography becomes available.
 */
const Product360Viewer = ({ product }) => {
  const frames = Array.isArray(product.images360)
    ? product.images360.filter(Boolean)
    : [];
  const has360Frames = frames.length > 1;
  const images = has360Frames ? frames : [product.image];

  const [frame, setFrame] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isTiltActive, setIsTiltActive] = useState(false);
  const imageStageRef = useRef(null);
  const dragStartX = useRef(null);
  const dragStartFrame = useRef(0);

  const setWrappedFrame = (value) => {
    setFrame(((value % images.length) + images.length) % images.length);
  };

  const resetTilt = () => {
    const stage = imageStageRef.current;
    if (!stage) return;
    stage.style.setProperty("--product-rotate-x", "0deg");
    stage.style.setProperty("--product-rotate-y", "0deg");
    stage.style.setProperty("--product-shift-x", "0px");
    stage.style.setProperty("--product-shift-y", "0px");
    setIsTiltActive(false);
  };

  const handlePointerMove = (event) => {
    if (has360Frames) {
      if (dragStartX.current === null) return;
      const distance = event.clientX - dragStartX.current;
      const steps = Math.trunc(distance / Math.max(8, 220 / frames.length));
      setWrappedFrame(dragStartFrame.current - steps);
      return;
    }

    if (event.pointerType === "touch") return;
    const stage = imageStageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 9;
    const rotateX = (0.5 - y) * 7;
    stage.style.setProperty("--product-rotate-x", `${rotateX.toFixed(2)}deg`);
    stage.style.setProperty("--product-rotate-y", `${rotateY.toFixed(2)}deg`);
    stage.style.setProperty("--product-shift-x", `${((x - 0.5) * 7).toFixed(1)}px`);
    stage.style.setProperty("--product-shift-y", `${((y - 0.5) * 7).toFixed(1)}px`);
    setIsTiltActive(true);
  };

  const handlePointerDown = (event) => {
    if (!has360Frames) return;
    dragStartX.current = event.clientX;
    dragStartFrame.current = frame;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const stopPointer = () => {
    dragStartX.current = null;
    resetTilt();
  };

  const openZoom = () => {
    setZoomLevel(1);
    setIsZoomed(true);
  };

  useEffect(() => {
    if (!isZoomed) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed]);

  return (
    <section className="w-full" aria-label={`${product.name} product images`}>
      <div
        ref={imageStageRef}
        className={`product-viewer-stage relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#EEE9E3] sm:rounded-[2rem] ${has360Frames ? "cursor-ew-resize select-none" : "cursor-zoom-in"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopPointer}
        onPointerCancel={stopPointer}
        onLostPointerCapture={stopPointer}
        onPointerLeave={stopPointer}
        onClick={has360Frames ? undefined : openZoom}
        onKeyDown={!has360Frames ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openZoom();
          }
        } : undefined}
        role={!has360Frames ? "button" : undefined}
        tabIndex={!has360Frames ? 0 : undefined}
        aria-label={!has360Frames ? `Zoom in to view ${product.name}` : undefined}
        style={{ touchAction: has360Frames ? "pan-y" : "manipulation" }}
      >
        <div className="product-viewer-image-wrap absolute inset-0">
          <img
            key={images[frame]}
            src={images[frame]}
            alt={`${product.name}${has360Frames ? ` — angle ${frame + 1} of ${frames.length}` : ""}`}
            draggable="false"
            className="h-full w-full select-none bg-[#EEE9E3] object-contain p-2 sm:p-4"
          />
        </div>
        <div className="product-viewer-shimmer pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />

        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[#6F5B5F] shadow-sm backdrop-blur">
          {has360Frames ? <FiMove aria-hidden="true" /> : <FiZoomIn aria-hidden="true" />}
        </div>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6F5B5F] shadow-sm backdrop-blur">
          {has360Frames ? <FiMove aria-hidden="true" /> : <FiZoomIn aria-hidden="true" />}
          {has360Frames ? "Drag to rotate" : "Explore · Tap to zoom"}
        </div>
      </div>

      {has360Frames && (
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => setWrappedFrame(frame - 1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCCFC5] bg-white text-[#6F5B5F] hover:bg-[#F7E8EA]" aria-label="Rotate product left">
            <FiRotateCw className="scale-x-[-1]" />
          </button>
          <input type="range" min="0" max={frames.length - 1} value={frame} onChange={(event) => setFrame(Number(event.target.value))} className="min-w-0 flex-1 accent-[#B98288]" aria-label="Product viewing angle" />
          <button type="button" onClick={() => setWrappedFrame(frame + 1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCCFC5] bg-white text-[#6F5B5F] hover:bg-[#F7E8EA]" aria-label="Rotate product right">
            <FiRotateCw />
          </button>
          <span className="min-w-[3.5rem] text-right text-[10px] tabular-nums text-[#8B7776]">{frame + 1}/{frames.length}</span>
        </div>
      )}

      {!has360Frames && (
        <p className="mt-2 text-center text-[10px] tracking-wide text-[#9A8580]">
          Move your cursor to explore · Tap image to enlarge
        </p>
      )}

      <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-black/25 sm:text-[10px]">
        F&A Fashion and Jewellery Collection
      </p>

      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241B1B]/90 p-3 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${product.name}`}
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-7 sm:top-7">
            <button type="button" onClick={(event) => { event.stopPropagation(); setZoomLevel((value) => Math.max(1, value - 0.25)); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Zoom out">
              <FiZoomOut />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); setZoomLevel((value) => Math.min(2.5, value + 0.25)); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Zoom in">
              <FiZoomIn />
            </button>
            <button type="button" onClick={() => setIsZoomed(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Close enlarged image">
              <FiMinimize2 />
            </button>
          </div>
          <div className="flex max-h-full max-w-5xl items-center justify-center overflow-auto" onClick={(event) => event.stopPropagation()}>
            <img
              src={images[frame]}
              alt={product.name}
              draggable="false"
              className="max-h-[88dvh] max-w-full rounded-xl object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/65">
            {product.name} · {Math.round(zoomLevel * 100)}%
          </p>
        </div>
      )}
    </section>
  );
};

export default Product360Viewer;
