"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import { AdminProvider } from "../context/AdminContext";
import Breadcrumbs from "@/components/Common/Breadcrumbs";

import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <AdminProvider>
                <CartModalProvider>
                  <ModalProvider>
                    <PreviewSliderProvider>
                      <Header />
                      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 pt-36 lg:pt-44">
                        <Breadcrumbs />
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.main
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          {children}
                        </motion.main>
                      </AnimatePresence>
                      <QuickViewModal />
                      <CartSidebarModal />
                      <PreviewSliderModal />
                    </PreviewSliderProvider>
                  </ModalProvider>
                </CartModalProvider>
              </AdminProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
