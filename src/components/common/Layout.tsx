import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";

export function Layout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
