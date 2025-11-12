import type { ReactNode } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar/>
      <main className="flex-1 min-h-screen bg-slate-100">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
