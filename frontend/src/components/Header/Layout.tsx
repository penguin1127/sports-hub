import { ReactNode } from "react";
import NavigationBar from "@/components/Header/NavigationBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar />
      <main className="flex-1 w-full px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
