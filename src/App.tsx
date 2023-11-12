import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ContactUs } from "./pages/ContactUs";
import { NavBar } from "./components/NavBar";
import { ProductSlugPage } from "./pages/ProductSlugPage";

export default function App() {
  return (
    <>
      <header className="border-b border-orange-900">
        <NavBar />
      </header>
      <div className="max-w-5xl p-5 m-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductSlugPage />}></Route>
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </>
  );
}
