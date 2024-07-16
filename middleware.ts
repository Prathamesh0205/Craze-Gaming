// import { clerkMiddleware } from "@clerk/nextjs/server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)',"/","/api/webhooks(.*)","/:username","/search"]);
export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
