import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর | নিত্যপণ্যের হালনাগাদ দাম",
  description: "প্রয়োজনীয় পণ্যের বাজার দর এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col bg-[#fbfcfb] text-gray-900 antialiased">
        <AuthProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <Navbar />
          <PriceTicker />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}