export const stageRobots =
  process.env.NEXT_PUBLIC_SITE_STAGE === "production"
    ? { index: true, follow: true }
    : { index: false, follow: false };
