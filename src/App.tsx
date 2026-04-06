import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot-Groq-WithWhatsApp"; // ✅ ADD THIS LINE

import Index from "./pages/Index";
import Contact from "./pages/Contact";
import BlogPage from "./pages/Blogpage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* ✅ ADD THIS COMPONENT - BEFORE CLOSING </BrowserRouter> */}
        <ChatBot />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;