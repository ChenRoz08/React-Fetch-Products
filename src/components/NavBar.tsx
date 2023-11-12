import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export function NavBar() {
  return (
    <nav className="max-w-5xl p-2 m-auto flex items-center justify-between">
      {/* <div>Cart</div> */}
      <div className="text-2xl">
        <Link to={"/"}>
          <img className="h-28 w-28" src={logo} />
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