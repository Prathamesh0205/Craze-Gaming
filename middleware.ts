// import { clerkMiddleware } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";
export default authMiddleware({
  publicRoutes:["/","/api/webhooks(.*)","/:username","/search"]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};