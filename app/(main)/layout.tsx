import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/lib/hooks/providers/Smoothscrollprovider";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmoothScrollProvider>
            <Navbar />
            {children}
            <Footer />
        </SmoothScrollProvider>
    );
}