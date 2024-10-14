import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Toaster } from "react-hot-toast";
import AppRouter from "./router/AppRouter";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { VIETNAM_TIMEZONE } from "./interfaces/common/constants";

dayjs.locale("vi");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(VIETNAM_TIMEZONE);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
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
