import { redirect } from "react-router-dom";

export async function action(){
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
     return redirect('/')
}