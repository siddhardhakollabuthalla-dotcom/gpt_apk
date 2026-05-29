import { QueryClient } from "@tanstack/react-query";
import { createFileRoute, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import Events from "./pages/Events";
export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });




  return router;
};
