import type { Metadata } from "next";
import data from "@/content/project-management-vs-task-management.json";
import { LegacyPage } from "@/components/legacy-page";
import { stageRobots } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Project Management vs Task Management",
  description: "Compare project management vs task management, see real-world examples, understand key differences, and choose the right workflow and software for your team.",
  alternates: { canonical: "/guides/project-management-vs-task-management/" },
  robots: stageRobots,
  openGraph: {
    type: "article",
    title: "Project Management vs Task Management | DailyTechInsights",
    description: "Compare project management and task management with a quick table, real-world examples, software features, and a practical decision framework.",
    url: "/guides/project-management-vs-task-management/",
  },
};

export default function ProjectVsTaskGuidePage() {
  return <LegacyPage data={data} />;
}
