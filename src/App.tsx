import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MouseGlow from "@/components/MouseGlow";

import IntroPage from "@/pages/IntroPage";
import WelcomePage from "@/pages/WelcomePage";

import MemoryGardenPage from "@/pages/MemoryGardenPage";
import WishesPage from "@/pages/WishesPage";
import FromMePage from "@/pages/FromMePage";
import FinalePage from "@/pages/FinalePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IntroPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/memories" element={<MemoryGardenPage />} />
        <Route path="/wishes" element={<WishesPage />} />
        <Route path="/from-me" element={<FromMePage />} />
        <Route path="/finale" element={<FinalePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <MouseGlow />

        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
