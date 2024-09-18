import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRouter from "./router/AppRouter";
import { ConfigProvider, notification } from "antd";
import viVN from "antd/locale/vi_VN";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  notification.config({
    placement: "bottomRight",
    bottom: 50,
    duration: 3,
  });
  return (
    <ConfigProvider locale={viVN}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRouter />
      </QueryClientProvider>
      <Toaster
        position="top-center"
        containerStyle={{
          marginTop: "0.25rem",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "1rem",
            padding: "0.75rem 1rem",
          },
        }}
      />
    </ConfigProvider>
  );
}
export default App;
