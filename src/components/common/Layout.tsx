import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import PropTypes from "prop-types";

export function Layout(children: PropTypes.ReactNodeLike) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
