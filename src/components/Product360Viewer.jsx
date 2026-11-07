import { useRef, useState } from "react";
import { FiRotateCw, FiMove } from "react-icons/fi";

/**
 * Supply ordered image paths through product.images360 when
 * real turntable photography is available for that product.
 * Until then, show the original product image without pretending
 * that a single photograph is a 360-degree model.
 */
const Product360Viewer = ({ product }) => {
  const frames = Array.isArray(product.images360)
    ? product.images360.filter(Boolean)
    : [];
  const ready = frames.length > 1;
  const images = ready ? frames : [product.image];
  const [frame, setFrame] = useState(0);
  const startX = useRef(null);
  const startFrame = useRef(0);

  const setWrappedFrame = (value) => {
    setFrame(((value % images.length) + images.length) % images.length);
  };

  const onPointerDown = (event) => {
    if (!ready) return;
    startX.current = event.clientX;
    startFrame.current = frame;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!ready || startX.current === null) return;
    const delta = event.clientX - startX.current;
    const step = Math.trunc(delta / Math.max(8, 220 / frames.length));
    setWrappedFrame(startFrame.current - step);
  };

  const stopDrag = () => { startX.current = null; };

  return (
    <section className="w-full" aria-label={`${product.name} product images`}>
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#EEE9E3] sm:rounded-[2rem] ${ready ? "cursor-ew-resize select-none" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        style={{ touchAction: ready ? "pan-y" : "auto" }}
      >
        <img
          key={images[frame]}
          src={images[frame]}
          alt={`${product.name}${ready ? ` — angle ${frame + 1} of ${frames.length}` : ""}`}
          draggable="false"
          className="h-full w-full select-none bg-[#EEE9E3] object-contain p-2 sm:p-4"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/70 bg-white/85 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6F5B5F] shadow-sm backdrop-blur">
          {ready ? <FiMove aria-hidden="true" /> : <FiRotateCw aria-hidden="true" />}
          {ready ? "Drag to rotate" : "360° view coming soon"}
        </div>
      </div>
      {ready && (
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
      <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.3em] text-black/25 sm:text-[10px]">F&A Fashion and Jewellery Collection</p>
    </section>
  );
};

export default Product360Viewer;
