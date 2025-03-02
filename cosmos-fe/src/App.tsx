import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <QueryClientProvider client={new QueryClient()}>
      <AppRoutes />
      <Toaster/>
    </QueryClientProvider> 
    </>
  );
}

export default App;
