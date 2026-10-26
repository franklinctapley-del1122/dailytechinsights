import type { Metadata } from "next";
import ImageToWebpClient from "@/components/ImageToWebpClient";

export const metadata: Metadata = {
  title: "PNG to WebP & JPG to WebP Converter Online | DailyTechInsights",
  description: "Convert PNG to WebP or JPG to WebP online for free. Adjust WebP quality, compare image sizes, and download smaller images securely in your browser without uploading files.",
  alternates: { canonical: "https://www.dailytechinsights.com/tools/image-to-webp-converter/" },
  robots: { index: true, follow: true },
};

export default function ImageToWebpConverterPage() {
  return <ImageToWebpClient />;
}
