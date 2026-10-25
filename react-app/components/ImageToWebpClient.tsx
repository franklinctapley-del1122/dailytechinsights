"use client";

import { useRef, useState } from "react";

type ConvertedImage = { id: string; name: string; originalSize: number; outputSize: number; url: string; width: number; height: number };
const styles = `
.webp-page{max-width:1120px;margin:0 auto;padding:0 22px 76px;color:#18213b}
.webp-hero{padding:48px 20px 38px;text-align:center;background:radial-gradient(ellipse at 50% 0%,#e4e8ff 0%,#f6f7ff 45%,#fff 80%);border:1px solid #e8eaff;border-radius:24px;margin:20px 0 26px}
.webp-kicker{display:inline-block;border-radius:999px;background:#e9e8ff;color:#5545cf;font-size:11px;font-weight:850;letter-spacing:1px;text-transform:uppercase;padding:7px 12px}
.webp-hero h1{font-size:clamp(32px,5vw,48px);letter-spacing:-1.7px;line-height:1.1;margin:16px 0 12px;color:#151b35}
.webp-hero p{max-width:700px;margin:0 auto;color:#66708a;line-height:1.8;font-size:16px}
.webp-workspace{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);gap:20px;align-items:start}
.webp-panel{border:1px solid #e5e8f2;border-radius:18px;padding:22px;background:#fff;box-shadow:0 10px 35px #1d275208;margin-bottom:18px}
.webp-panel h2{font-size:19px;margin:0 0 12px;color:#19213c}
.webp-drop{display:flex;min-height:230px;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:2px dashed #c8c9f5;border-radius:15px;background:linear-gradient(145deg,#fafaff,#f5f8ff);padding:24px;cursor:pointer;transition:border-color .2s,background .2s}
.webp-drop:hover,.webp-drop:focus-within{border-color:#7066ed;background:#f4f3ff}
.webp-upload-icon{display:grid;place-items:center;width:55px;height:55px;border-radius:17px;background:#e8e8ff;color:#5545d6;font-size:26px;margin-bottom:12px}
.webp-drop strong{font-size:16px;color:#202747}.webp-drop span{font-size:13px;color:#78819a;margin-top:7px}
.webp-drop input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.webp-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:15px}
.webp-btn{display:inline-flex;justify-content:center;align-items:center;gap:8px;border:0;border-radius:10px;padding:12px 16px;background:linear-gradient(110deg,#6558e8,#477fed);color:white;font:inherit;font-weight:800;font-size:13px;cursor:pointer;text-decoration:none;transition:transform .18s,box-shadow .18s}
.webp-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px #6558e833}.webp-btn:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}
.webp-btn.secondary{background:#f0f1ff;color:#4e47bb}
.webp-label{display:flex;justify-content:space-between;gap:12px;font-size:13px;font-weight:750;color:#343d5c;margin:17px 0 9px}
.webp-range{width:100%;accent-color:#6558e8}
.webp-hint{font-size:12px;color:#79829a;line-height:1.7}
.webp-list{display:grid;gap:11px;margin-top:17px}
.webp-item{display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:12px;align-items:center;padding:11px;border:1px solid #e8eaf3;border-radius:13px}
.webp-thumb{width:64px;height:64px;display:grid;place-items:center;overflow:hidden;border-radius:9px;background:repeating-conic-gradient(#eef0f8 0% 25%,#fff 0% 50%) 50%/14px 14px}
.webp-thumb img{width:100%;height:100%;object-fit:contain}
.webp-filename{font-size:13px;font-weight:800;color:#29324f;overflow-wrap:anywhere}
.webp-meta{font-size:11px;color:#79829a;margin-top:4px;line-height:1.5}
.webp-item-actions{display:flex;flex-direction:column;gap:7px;align-items:flex-end}
.webp-download{font-size:12px;font-weight:800;color:#5548d0;text-decoration:none;white-space:nowrap}
.webp-remove{border:0;background:transparent;color:#9299ad;font-size:11px;cursor:pointer}
.webp-error{padding:12px 14px;background:#fff1f2;border:1px solid #fecdd3;border-radius:10px;color:#9f1239;font-size:13px;margin-top:13px}
.webp-success{padding:13px 14px;background:#effcf5;border:1px solid #bbf7d0;border-radius:10px;color:#166534;font-size:13px;margin-top:13px}
.webp-info{font-size:13px;color:#66708a;line-height:1.8}
.webp-info h2{color:#1c2440;font-size:19px;margin:0 0 10px}
.webp-info h3{color:#2b3451;font-size:14px;margin:17px 0 5px}
.webp-info p{margin:7px 0}
.webp-info a{color:#5548d0}
.webp-faq{border-top:1px solid #eceef6;padding-top:13px;margin-top:13px}
@media(max-width:760px){.webp-workspace{grid-template-columns:1fr}.webp-panel{padding:17px}.webp-hero{padding:38px 16px}.webp-item{grid-template-columns:54px minmax(0,1fr)}.webp-thumb{width:54px;height:54px}.webp-item-actions{grid-column:2;flex-direction:row;align-items:center;justify-content:flex-start}.webp-page{padding-inline:16px}}
@media(prefers-reduced-motion:reduce){.webp-drop,.webp-btn{transition:none}}
`;

function prettyBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return (bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1) + " " + units[index];
}
function toWebp(file: File, quality: number): Promise<Omit<ConvertedImage, "id" | "name" | "originalSize">> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const sourceUrl = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) { URL.revokeObjectURL(sourceUrl); reject(new Error("Your browser could not prepare this image.")); return; }
      context.drawImage(image, 0, 0);
      canvas.toBlob(blob => {
        URL.revokeObjectURL(sourceUrl);
        if (!blob) { reject(new Error("WebP conversion failed. Try another image or browser.")); return; }
        if (blob.type !== "image/webp") { reject(new Error("This browser does not support WebP export. Try an up-to-date version of Chrome, Edge, or Firefox.")); return; }
        resolve({ url: URL.createObjectURL(blob), outputSize: blob.size, width: image.naturalWidth, height: image.naturalHeight });
      }, "image/webp", quality);
    };
    image.onerror = () => { URL.revokeObjectURL(sourceUrl); reject(new Error("Could not read this image. Please try a PNG, JPG, or other supported image file.")); };
    image.src = sourceUrl;
  });
}

export default function ImageToWebpClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [converted, setConverted] = useState<ConvertedImage[]>([]);
  const [quality, setQuality] = useState(82);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dragging, setDragging] = useState(false);

  function addFiles(incoming: FileList | File[]) {
    const valid = Array.from(incoming).filter(file => file.type.startsWith("image/"));
    if (!valid.length) { setError("Please choose image files such as PNG, JPG, or GIF."); return; }
    setError(""); setNotice("");
    setFiles(previous => [...previous, ...valid].slice(0, 30));
    setConverted(previous => { previous.forEach(item => URL.revokeObjectURL(item.url)); return []; });
  }
  function clearAll() {
    converted.forEach(item => URL.revokeObjectURL(item.url));
    setFiles([]); setConverted([]); setError(""); setNotice("");
    if (inputRef.current) inputRef.current.value = "";
  }
  async function convertAll() {
    if (!files.length || busy) return;
    setBusy(true); setError(""); setNotice("");
    converted.forEach(item => URL.revokeObjectURL(item.url));
    setConverted([]);
    const results: ConvertedImage[] = [];
    const failures: string[] = [];
    for (const file of files) {
      try {
        const result = await toWebp(file, quality / 100);
        results.push({ ...result, id: file.name + file.size + Math.random().toString(36).slice(2), name: file.name.replace(/\.[^.]+$/, "") + ".webp", originalSize: file.size });
      } catch (e) { failures.push(file.name + ": " + (e instanceof Error ? e.message : "Conversion failed")); }
    }
    setConverted(results);
    if (failures.length) setError(failures.slice(0, 3).join(" • ") + (failures.length > 3 ? " • and " + (failures.length - 3) + " more." : ""));
    if (results.length) setNotice("Converted " + results.length + " of " + files.length + " image" + (files.length === 1 ? "" : "s") + ". Download each WebP file below.");
    setBusy(false);
  }
  const saved = converted.reduce((sum, item) => sum + item.originalSize - item.outputSize, 0);
  const totalOriginal = converted.reduce((sum, item) => sum + item.originalSize, 0);
  const totalOutput = converted.reduce((sum, item) => sum + item.outputSize, 0);
  return <>
    <style>{styles}</style>
    <main className="webp-page">
      <div className="webp-hero">
        <span className="webp-kicker">Free browser-based image tool</span>
        <h1>Image to WebP Converter</h1>
        <p>Convert PNG, JPG and other supported images to lightweight WebP files in seconds. Adjust image quality, compare file sizes, and download your results—without uploading images to our server.</p>
      </div>
      <div className="webp-workspace">
        <section className="webp-panel">
          <h2>1. Choose your images</h2>
          <label className="webp-drop" onDragOver={e => {e.preventDefault();setDragging(true);}} onDragLeave={() => setDragging(false)} onDrop={e => {e.preventDefault();setDragging(false);if(e.dataTransfer.files.length)addFiles(e.dataTransfer.files);}} style={dragging?{borderColor:"#6558e8",background:"#f0efff"}:undefined}>
            <span className="webp-upload-icon">⇧</span>
            <strong>Drag and drop images here</strong>
            <span>or click to browse · PNG, JPG, GIF, BMP and more</span>
            <input ref={inputRef} type="file" accept="image/*" multiple onChange={e => {if(e.target.files)addFiles(e.target.files);e.currentTarget.value="";}} aria-label="Choose image files to convert" />
          </label>
          <div className="webp-label"><span>WebP quality</span><span>{quality}%</span></div>
          <input className="webp-range" type="range" min="40" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} aria-label="WebP output quality" />
          <p className="webp-hint">80–85% is a useful starting point for web images. Higher quality usually means larger files. Transparent PNG backgrounds are supported. Animated GIFs are converted as a still image of their first frame.</p>
          <div className="webp-actions"><button className="webp-btn" onClick={convertAll} disabled={!files.length || busy}>{busy ? "Converting…" : "Convert to WebP →"}</button><button className="webp-btn secondary" onClick={clearAll} disabled={busy || (!files.length && !converted.length)}>Clear all</button></div>
          {files.length > 0 && <p className="webp-hint" aria-live="polite">{files.length} image{files.length === 1 ? "" : "s"} selected · Maximum 30 files per batch.</p>}
          {error && <div className="webp-error" role="alert">{error}</div>}
          {notice && <div className="webp-success" role="status">{notice}</div>}
          {converted.length > 0 && <div className="webp-list"><div className="webp-label"><span>Converted files</span><span>{prettyBytes(totalOutput)} total</span></div>
            {converted.map(item => <div className="webp-item" key={item.id}>
              <div className="webp-thumb"><img src={item.url} alt="" /></div>
              <div><div className="webp-filename">{item.name}</div><div className="webp-meta">{item.width} × {item.height} · {prettyBytes(item.originalSize)} → {prettyBytes(item.outputSize)} {item.outputSize < item.originalSize ? "· " + Math.round((1-item.outputSize/item.originalSize)*100) + "% smaller" : ""}</div></div>
              <div className="webp-item-actions"><a className="webp-download" href={item.url} download={item.name}>Download ↓</a></div>
            </div>)}
            <p className="webp-hint">Original total: {prettyBytes(totalOriginal)} · Converted total: {prettyBytes(totalOutput)} · {saved >= 0 ? prettyBytes(saved) + " saved" : prettyBytes(Math.abs(saved)) + " larger"}</p>
          </div>}
        </section>
        <aside>
          <section className="webp-panel webp-info"><h2>Why use WebP?</h2><p>WebP can reduce image file sizes while maintaining good visual quality. Smaller images can help pages load faster, especially on mobile connections.</p><h3>How to convert an image</h3><p>1. Select one or more images.</p><p>2. Set your preferred WebP quality.</p><p>3. Select <strong>Convert to WebP</strong>.</p><p>4. Download each converted file.</p><h3>Private by design</h3><p>Image conversion happens locally in your browser. Your selected images are not uploaded to DailyTechInsights.</p><h3>Good to know</h3><p>WebP is widely supported by modern browsers. Keep your original files as a backup, and inspect image quality before replacing production assets.</p></section>
        </aside>
      </div>
      <section className="webp-panel webp-info"><h2>Image to WebP Converter FAQs</h2><div className="webp-faq"><h3>Is this image to WebP converter free?</h3><p>Yes. It is free to use, requires no account, and runs directly in your browser.</p></div><div className="webp-faq"><h3>Are my images uploaded?</h3><p>No. The conversion uses your browser's built-in image and canvas features. Your images are not sent to our server.</p></div><div className="webp-faq"><h3>Will WebP always make an image smaller?</h3><p>No. The result depends on the source format, image content and quality setting. Some images may be similar in size or larger.</p></div><div className="webp-faq"><h3>Can I convert multiple images at once?</h3><p>Yes. Select up to 30 images per batch and download each converted WebP file separately.</p></div><div className="webp-faq"><h3>Does it preserve transparency?</h3><p>Yes. Transparent areas in supported source images, such as PNG files, can remain transparent in WebP.</p></div><p>Explore more <a href="/tools/">free online tools</a> from DailyTechInsights.</p></section>
    </main>
  </>;
}
