import { useEffect, useRef, useState } from "react";
import { FiMaximize2, FiMinimize2, FiMove, FiRotateCw, FiZoomIn, FiZoomOut } from "react-icons/fi";

const Product360Viewer = ({ product }) => {
  const frames = Array.isArray(product.images360) ? product.images360.filter(Boolean) : [];
  const has360Frames = frames.length > 1;
  const images = has360Frames ? frames : [product.image];
  const [frame, setFrame] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const dragStartX = useRef(null);
  const dragStartFrame = useRef(0);
  const isTouching = useRef(false);

  const setWrappedFrame = (value) => {
    setFrame(((value % images.length) + images.length) % images.length);
  };

  const resetTilt = () => {
    if (imageRef.current) imageRef.current.style.transform = "translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const handlePointerMove = (event) => {
    if (has360Frames) {
      if (dragStartX.current === null) return;
      const delta = event.clientX - dragStartX.current;
      const steps = Math.trunc(delta / Math.max(8, 220 / frames.length));
      setWrappedFrame(dragStartFrame.current - steps);
      return;
    }
    if (event.pointerType === "touch" && !isTouching.current) return;
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds || !imageRef.current) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 9;
    const shiftX = (x - 0.5) * 8;
    const shiftY = (y - 0.5) * 8;
    imageRef.current.style.transform = `translate3d(${shiftX}px,${shiftY}px,0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") isTouching.current = true;
    if (has360Frames) {
      dragStartX.current = event.clientX;
      dragStartFrame.current = frame;
    }
    // Capture touch input so movement continues to be received across the image.
    event.currentTarget.setPointerCapture?.(event.pointerId);
    if (!has360Frames && event.pointerType === "touch") {
      const bounds = stageRef.current?.getBoundingClientRect();
      if (bounds && imageRef.current) {
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        imageRef.current.style.transform = `translate3d(${(x - 0.5) * 8}px,${(y - 0.5) * 8}px,0) rotateX(${(0.5 - y) * 9}deg) rotateY(${(x - 0.5) * 12}deg) scale(1.025)`;
      }
    }
  };

  const stopPointer = () => {
    isTouching.current = false;
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
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isZoomed]);

  return (
    <section className="w-full" aria-label={`${product.name} product images`}>
      <div
        ref={stageRef}
        className={`product-viewer-stage relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#EEE9E3] sm:rounded-[2rem] ${has360Frames ? "cursor-ew-resize select-none" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopPointer}
        onPointerCancel={stopPointer}
        onLostPointerCapture={stopPointer}
        onPointerLeave={stopPointer}
        style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
      >
        <div className="product-viewer-shimmer pointer-events-none absolute inset-0" />
        <div ref={imageRef} className="product-viewer-image-wrap absolute inset-0" style={{ transform: "translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)", transition: "transform 180ms ease-out", transformStyle: "preserve-3d" }}>
          <img
            key={images[frame]}
            src={images[frame]}
            alt={`${product.name}${has360Frames ? ` — angle ${frame + 1} of ${frames.length}` : ""}`}
            draggable="false"
            className="h-full w-full select-none bg-[#EEE9E3] object-contain p-2 sm:p-4"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />
        {!has360Frames && (
          <button type="button" onClick={openZoom} className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#6F5B5F] shadow-md backdrop-blur transition hover:scale-105" aria-label="Enlarge product image">
            <FiMaximize2 />
          </button>
        )}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6F5B5F] shadow-sm backdrop-blur">
          {has360Frames ? <FiMove aria-hidden="true" /> : <FiZoomIn aria-hidden="true" />}
          {has360Frames ? "Drag to rotate" : "Tap the zoom button to enlarge"}
        </div>
      </div>

      {has360Frames && (
        <div className="mt-4 flex items-center gap-3">
          <button type="button" onClick={() => setWrappedFrame(frame - 1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCCFC5] bg-white text-[#6F5B5F] hover:bg-[#F7E8EA]" aria-label="Rotate product left"><FiRotateCw className="scale-x-[-1]" /></button>
          <input type="range" min="0" max={frames.length - 1} value={frame} onChange={(event) => setFrame(Number(event.target.value))} className="min-w-0 flex-1 accent-[#B98288]" aria-label="Product viewing angle" />
          <button type="button" onClick={() => setWrappedFrame(frame + 1)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCCFC5] bg-white text-[#6F5B5F] hover:bg-[#F7E8EA]" aria-label="Rotate product right"><FiRotateCw /></button>
          <span className="min-w-[3.5rem] text-right text-[10px] tabular-nums text-[#8B7776]">{frame + 1}/{frames.length}</span>
        </div>
      )}

      {!has360Frames && <p className="mt-2 text-center text-[10px] tracking-wide text-[#9A8580]">Move your cursor over the image for a subtle tilt · Tap the zoom button on mobile</p>}
      <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-black/25 sm:text-[10px]">F&A Fashion and Jewellery Collection</p>

      {isZoomed && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#241B1B]/95 p-3 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={`Enlarged view of ${product.name}`} onClick={() => setIsZoomed(false)}>
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-7 sm:top-7">
            <button type="button" onClick={(event) => { event.stopPropagation(); setZoomLevel((value) => Math.max(1, value - 0.25)); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Zoom out"><FiZoomOut /></button>
            <button type="button" onClick={(event) => { event.stopPropagation(); setZoomLevel((value) => Math.min(3, value + 0.25)); }} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Zoom in"><FiZoomIn /></button>
            <button type="button" onClick={() => setIsZoomed(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white hover:bg-white/20" aria-label="Close enlarged image"><FiMinimize2 /></button>
          </div>
          <div className="flex max-h-full max-w-5xl items-center justify-center overflow-auto" onClick={(event) => event.stopPropagation()}>
            <img src={images[frame]} alt={product.name} draggable="false" className="max-h-[88dvh] max-w-full rounded-xl object-contain transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }} />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/65">{product.name} · {Math.round(zoomLevel * 100)}%</p>
        </div>
      )}
    </section>
  );
};

export default Product360Viewer;
