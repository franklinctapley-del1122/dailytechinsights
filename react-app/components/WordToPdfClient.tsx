"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    mammoth?: {
      convertToHtml: (input: { arrayBuffer: ArrayBuffer }, options?: Record<string, unknown>) => Promise<{ value: string; messages: Array<{ message?: string }> }>;
      images: { imgElement: (handler: (image: { contentType: string; read: (encoding: string) => Promise<string> }) => Promise<{ src: string }>) => unknown };
    };
    html2pdf?: (element: HTMLElement, options?: Record<string, unknown>) => { set: (options: Record<string, unknown>) => { from: (element: HTMLElement) => { save: () => Promise<void> } } };
  }
}

const styles = `
.wordpdf-page{max-width:1080px;margin:0 auto;padding:20px 20px 70px;color:#18213b}
.wordpdf-hero{padding:48px 20px 40px;text-align:center;background:radial-gradient(ellipse at 50% 0%,#e4e8ff 0%,#f7f8ff 48%,#fff 82%);border:1px solid #e8eaff;border-radius:24px;margin:0 0 24px}
.wordpdf-kicker{display:inline-block;border-radius:999px;background:#e9e8ff;color:#5545cf;font-size:11px;font-weight:850;letter-spacing:1px;text-transform:uppercase;padding:7px 12px}
.wordpdf-hero h1{font-size:clamp(32px,5vw,48px);letter-spacing:-1.7px;line-height:1.1;margin:16px 0 12px;color:#151b35}
.wordpdf-hero p{max-width:720px;margin:0 auto;color:#66708a;line-height:1.8;font-size:16px}
.wordpdf-panel{border:1px solid #e5e8f2;border-radius:18px;padding:24px;background:#fff;box-shadow:0 10px 35px #1d275208;margin-bottom:18px}
.wordpdf-panel h2{font-size:20px;margin:0 0 12px;color:#19213c}
.wordpdf-drop{display:flex;min-height:220px;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:2px dashed #c8c9f5;border-radius:15px;background:linear-gradient(145deg,#fafaff,#f5f8ff);padding:24px;cursor:pointer}
.wordpdf-drop:hover{border-color:#7066ed;background:#f4f3ff}
.wordpdf-drop strong{font-size:16px;color:#202747}.wordpdf-drop span{font-size:13px;color:#78819a;margin-top:8px}
.wordpdf-drop input{max-width:100%;margin-top:16px}
.wordpdf-btn{display:inline-flex;justify-content:center;align-items:center;border:0;border-radius:10px;padding:12px 17px;background:linear-gradient(110deg,#6558e8,#477fed);color:white;font:inherit;font-weight:800;font-size:14px;cursor:pointer}
.wordpdf-btn:disabled{opacity:.45;cursor:not-allowed}
.wordpdf-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
.wordpdf-meta,.wordpdf-note{font-size:13px;color:#66708a;line-height:1.8}
.wordpdf-alert{padding:12px 14px;border-radius:10px;font-size:13px;margin-top:14px;background:#fff1f2;border:1px solid #fecdd3;color:#9f1239}
.wordpdf-success{background:#effcf5;border-color:#bbf7d0;color:#166534}
.wordpdf-preview{border:1px solid #e5e7eb;border-radius:12px;background:#fafafa;padding:24px;max-height:420px;overflow:auto;color:#222;line-height:1.65}
.wordpdf-preview h1,.wordpdf-preview h2,.wordpdf-preview h3{color:#111827}
.wordpdf-preview img{max-width:100%;height:auto}
.wordpdf-page a{color:#5548d0}
@media(max-width:650px){.wordpdf-page{padding:12px 14px 52px}.wordpdf-hero{padding:36px 16px}.wordpdf-panel{padding:17px}.wordpdf-preview{padding:14px}}
`;

function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById(id)) {
      const existing = document.getElementById(id) as HTMLScriptElement;
      if (existing.dataset.loaded === "true") { resolve(); return; }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load the document conversion library. Check your connection and try again.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => { script.dataset.loaded = "true"; resolve(); };
    script.onerror = () => { script.remove(); reject(new Error("Could not load the document conversion library. Check your connection and try again.")); };
    document.head.appendChild(script);
  });
}

export default function WordToPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  async function convert() {
    if (!file || busy) return;
    setBusy(true); setError(""); setNotice(""); setPreview("");
    try {
      await Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js", "wordpdf-mammoth"),
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.3/html2pdf.bundle.min.js", "wordpdf-html2pdf"),
      ]);
      if (!window.mammoth || !window.html2pdf) throw new Error("The converter could not start. Please refresh the page and try again.");
      const buffer = await file.arrayBuffer();
      const result = await window.mammoth.convertToHtml(
        { arrayBuffer: buffer },
        { convertImage: window.mammoth.images.imgElement((image) => image.read("base64").then(data => ({ src: "data:" + image.contentType + ";base64," + data }))) }
      );
      const holder = document.createElement("div");
      holder.innerHTML = result.value;
      holder.style.cssText = "font-family:Arial,Helvetica,sans-serif;font-size:11pt;line-height:1.55;color:#222;background:#fff;padding:20px;width:760px;box-sizing:border-box;overflow-wrap:anywhere";
      holder.querySelectorAll("table").forEach(table => { (table as HTMLElement).style.cssText += ";width:100%;border-collapse:collapse;table-layout:fixed"; });
      holder.querySelectorAll("td,th").forEach(cell => { (cell as HTMLElement).style.cssText += ";border:1px solid #999;padding:5px;vertical-align:top"; });
      holder.querySelectorAll("img").forEach(img => { (img as HTMLElement).style.cssText += ";max-width:100%;height:auto"; });
      holder.querySelectorAll("h1,h2,h3,h4").forEach(heading => { (heading as HTMLElement).style.cssText += ";break-after:avoid;page-break-after:avoid"; });
      setPreview(result.value);
      document.body.appendChild(holder);
      try {
        const safeName = file.name.replace(/\.docx$/i, "").replace(/[^a-z0-9-_ ]/gi, "").trim() || "converted-document";
        await window.html2pdf(holder, {
          margin: [12, 12, 12, 12],
          filename: safeName + ".pdf",
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        }).set({}).from(holder).save();
        setNotice("Your PDF download has started. Review the file before sharing it.");
        if (result.messages.length) setError("Some Word formatting may not transfer perfectly to PDF. Please review the downloaded document.");
      } finally {
        document.body.removeChild(holder);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed. Please try another DOCX file.");
    } finally {
      setBusy(false);
    }
  }

  return <>
    <style>{styles}</style>
    <main className="wordpdf-page">
      <header className="wordpdf-hero">
        <span className="wordpdf-kicker">Free document tool</span>
        <h1>Word to PDF Converter</h1>
        <p>Convert a Microsoft Word DOCX document into a downloadable PDF right in your browser. No account required, and your document is not uploaded to DailyTechInsights.</p>
      </header>
      <section className="wordpdf-panel">
        <h2>Convert your Word document</h2>
        <label className="wordpdf-drop">
          <strong>{file ? file.name : "Choose a Word document (.docx)"}</strong>
          <span>{file ? (file.size / 1024).toFixed(1) + " KB · Ready to convert" : "Select a DOCX file from your device. For privacy, conversion runs locally in your browser."}</span>
          <input type="file" accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => { const next=e.target.files?.[0] || null; setFile(next); setError(""); setNotice(""); setPreview(""); if(next && !next.name.toLowerCase().endsWith(".docx")){setFile(null);setError("Please select a modern Word .docx file. Legacy .doc files are not supported yet.");} }} />
        </label>
        <div className="wordpdf-actions">
          <button className="wordpdf-btn" type="button" onClick={convert} disabled={!file || busy}>{busy ? "Converting document…" : "Convert to PDF ↓"}</button>
          <button className="wordpdf-btn" type="button" style={{background:"#eef2ff",color:"#4e47bb"}} onClick={() => {setFile(null);setError("");setNotice("");setPreview("");}}>Clear</button>
        </div>
        <p className="wordpdf-note">Supported input: .docx. Legacy .doc files, password-protected documents, and some advanced Word layouts may not convert correctly. External browser libraries are loaded when you start conversion.</p>
        {error && <div className="wordpdf-alert" role="alert">{error}</div>}
        {notice && <div className="wordpdf-alert wordpdf-success" role="status">{notice}</div>}
      </section>
      {preview && <section className="wordpdf-panel"><h2>Document preview</h2><p className="wordpdf-meta">A simplified preview of the extracted document text. Compare the downloaded PDF with your original Word file, especially tables, images and page breaks.</p><div ref={previewRef} className="wordpdf-preview" dangerouslySetInnerHTML={{__html:preview}} /></section>}
      <section className="wordpdf-panel">
        <h2>How to convert Word to PDF</h2>
        <p className="wordpdf-meta">1. Choose your .docx file. 2. Select Convert to PDF. 3. Wait for the PDF download to begin. 4. Open and check the downloaded PDF before sending or printing it.</p>
        <h2>Privacy and formatting</h2>
        <p className="wordpdf-meta">Your document is processed locally in your browser and is not sent to our server by this tool. Conversion uses browser-based libraries, so an internet connection is needed to load them. Word and PDF layout engines differ, so complex formatting, headers, footers, tracked changes, and page numbering may not be preserved exactly.</p>
        <h2>Word to PDF FAQs</h2>
        <h3>Is this Word to PDF converter free?</h3><p className="wordpdf-meta">Yes, it is free to use and does not require an account.</p>
        <h3>Does it support DOC and DOCX?</h3><p className="wordpdf-meta">This version supports .docx files. Older .doc files should first be saved as .docx in Microsoft Word or another compatible editor.</p>
        <h3>Are my documents uploaded?</h3><p className="wordpdf-meta">The document content is processed in your browser; it is not uploaded to DailyTechInsights. The conversion libraries are downloaded from their public CDNs when you start.</p>
      </section>
    </main>
  </>;
}
