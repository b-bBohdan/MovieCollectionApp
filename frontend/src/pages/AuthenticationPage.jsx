import AuthForm from "../components/AuthForm";
import { redirect } from "react-router-dom";


export default function AuthenticationPage(){

    return <AuthForm />;

  
}

export async function action ({ request }) {

    const formData = await request.formData();
    
    const user = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      likes: [],
      pp_Url: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106",
      provider: null,
    };

    const response = await fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: 'include'
    });
    if (!response.ok){
      return redirect(`http://localhost:5173/register`);
    }

      return redirect(`http://localhost:5173/`)
    
  }