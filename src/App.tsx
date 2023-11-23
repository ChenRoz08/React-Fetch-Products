import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ContactUs } from "./pages/ContactUs";
import { NavBar } from "./components/NavBar";
import { ProductSlugPage } from "./pages/ProductSlugPage";
import { ErrorPage } from "./pages/ErrorPage";
import { UserContextprovider } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import { CartContextProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <>
      <CartContextProvider>
        <UserContextprovider>
          <header className="border-b border-orange-900">
            <NavBar />
          </header>
          <div className="max-w-5xl p-5 m-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="products/:slug"
                element={<ProductSlugPage />}
              ></Route>
              <Route path="/contact" element={<ContactUs />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </UserContextprovider>
      </CartContextProvider>
    </>
  );
}
