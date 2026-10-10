import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
// import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
  title: "বাজার দর | নিত্যপণ্যের হালনাগাদ দাম",
  description: "প্রয়োজনীয় পণ্যের বাজার দর এক নজরে।",
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col bg-base-200 text-base-content antialiased">
        <AuthProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <Navbar initialCategories={categories} />
          <PriceTicker products={products} />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
            {children}
          </main>
          {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}