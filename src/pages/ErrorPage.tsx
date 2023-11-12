import { Link } from "react-router-dom";
import error from "../images/error-symbol.png";

export function ErrorPage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-orange-900">
        <img className="h-96" src={error} />

        <div className="mt-96">
          <Link
            to="/"
            className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
