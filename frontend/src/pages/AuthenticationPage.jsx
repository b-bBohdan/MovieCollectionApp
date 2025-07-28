import AuthForm from "../components/forms/AuthForm";
import { redirect, useLocation } from "react-router-dom";

export default function AuthenticationPage() {
  const { pathname } = useLocation();
  const method = pathname.includes("login") ? "login" : "register";

  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw new Response(JSON.stringify({ message: "Unsupported mode" }), {
      status: 422,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const formData = await request.formData();

  const user = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    likes: [],
    pp_Url:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106",
    provider: null,
  };

  const response = await fetch(`http://localhost:3000/auth/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (!response.ok) {
    return redirect("/register");
  }

  return redirect("/");
}
