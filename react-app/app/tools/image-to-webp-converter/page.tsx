import type { Metadata } from "next";
import ImageToWebpClient from "@/components/ImageToWebpClient";

export const metadata: Metadata = {
  title: "Free Image to WebP Converter Online | DailyTechInsights",
  description: "Convert PNG, JPG and other images to WebP online for free. Adjust quality, compare file sizes, and download results. Browser-based conversion keeps images on your device.",
  alternates: { canonical: "https://www.dailytechinsights.com/tools/image-to-webp-converter/" },
  robots: { index: true, follow: true },
};

export default function ImageToWebpConverterPage() {
  return <ImageToWebpClient />;
}
