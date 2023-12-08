import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { useModal } from "../contexts/modalContext";
import LoginPage from "./Modals/LoginModal";
// import LoginPage from "../pages/LoginPage";

export function NavBar() {
  const { user } = useUser();
  const { items } = useCart();
  const { openModal } = useModal();

  return (
    <nav className="max-w-5xl p-2 m-auto flex items-center justify-between">
      <div className=" text-orange-900 text-lg font-bold">
        <Link to="/cart">
          {items.length > 0 && <small>{items.length}</small>} עגלה
        </Link>
      </div>
      <div className=" text-orange-900 text-lg font-bold custom-text">
        {user ? <p> שלום {user.firstName}</p> : "שלום אורח"}
        <button onClick={() => openModal(<LoginPage />)} className="px-5">
          {user ? "התנתקות" : "התחברות"}
        </button>
      </div>
      <div className="text-2xl">
        <Link to={"/"}>
          <img className="h-20 w-20" src={logo} />
        </Link>
      </div>
      <div className="flex gap-4 text-orange-900 text-lg font-bold custom-text ">
        <Link
          className="hover:underline underline-offset-8 decoration-red-500"
          to={"/"}
        >
          עמוד הבית
        </Link>
        <Link
          className="hover:underline underline-offset-8 decoration-red-500"
          to={"/products"}
        >
          המוצרים שלנו
        </Link>
        <Link
          className="hover:underline underline-offset-8 decoration-red-500"
          to={"/contact"}
        >
          צור קשר
        </Link>
      </div>
    </nav>
  );
}
