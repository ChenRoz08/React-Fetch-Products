import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ContactUs } from "./pages/ContactUs";
import { NavBar } from "./components/NavBar";
import { ProductSlugPage } from "./pages/ProductSlugPage";
import { ErrorPage } from "./pages/ErrorPage";

// import LoginPage from "./pages/LoginPage";

import { CartPage } from "./pages/CartPage";
import { CustomModal, useModal } from "./contexts/modalContext";

export default function App() {
  const { modalChildren, closeModal } = useModal();
  return (
    <>
      {modalChildren && (
        <CustomModal children={modalChildren} closeModal={closeModal} />
      )}

      <header className="border-b border-orange-900">
        <NavBar />
      </header>
      <div className="max-w-5xl p-5 m-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductSlugPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<ErrorPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </div>
    </>
  );
}
