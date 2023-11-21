import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useUser } from "../contexts/UserContext";

export function NavBar() {
  const { user } = useUser();

  return (
    <nav className="max-w-5xl p-2 m-auto flex items-center justify-between">
      <div className=" text-orange-900 text-lg font-bold custom-text">
        {user ? (
          <p>שלום {user.firstName}</p>
        ) : (
          <Link to="/login"> התחברות</Link>
        )}
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
