import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClientProvider, QueryClient } from "react-query";
import useAuthRefresh from "./hooks/useAuthRefresh";
import { useUserStore } from "./store/userStore";

const queryClient = new QueryClient();

export default function App() {
  useAuthRefresh();
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  );
}
