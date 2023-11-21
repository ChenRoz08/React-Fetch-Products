import { FormEvent, useState } from "react";
import { LoginSchema, loginValidation } from "../validation/login";
import { useUser } from "../contexts/UserContext";
import { login } from "../services/users";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { updateToken, user, logout } = useUser();

  const [formData] = useState<LoginSchema>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginSchema>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (user !== null) {
      logout();
      return;
    }
    const response = loginValidation.safeParse(formData);

    if (!response.success) {
      const parseErrors = response.error.format();

      setErrors((prevErrors) => {
        prevErrors = {};
        for (const objectKey in formData) {
          const key = objectKey as keyof LoginSchema;
          prevErrors[key] = parseErrors[key]?._errors[0];
        }
        return prevErrors;
      });
    }
    handleClick();
  }

  async function handleClick() {
    const token = await login({
      email: formData.email,
      password: formData.password,
    });
    if (token !== null) updateToken(token);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-right block mb-2 text-sm font-bold text-gray-700">
              כתובת מייל
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border"
              id="email"
              type="email"
              onChange={(e) => (formData.email = e.target.value)}
            />
            {errors.email && (
              <small className="text-red-600 block italic custom-text">
                {errors.email}
              </small>
            )}
          </div>

          <div className="mb-4">
            <label className="text-right block mb-2 text-sm font-bold text-gray-700">
              סיסמא
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border"
              id="password"
              type="password"
              onChange={(e) => (formData.password = e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="mb-6 text-center">
            {/* <Link to="/"> */}
            <button
              className="w-full px-4 py-2 font-bold text-white bg-orange-700 rounded-md hover:bg-orange-900 focus:outline-none focus:shadow-outline"
              type="submit"
              // onClick={handleClick}
            >
              {user ? "התנתק" : "התחבר"}
            </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
