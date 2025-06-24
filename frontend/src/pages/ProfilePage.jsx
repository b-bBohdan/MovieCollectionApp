import { useUser } from "../context/UserContext"
import { Form } from "react-router-dom";

export default function ProfilePage(){

    const {user} = useUser();

    return <>
    
            <div className="max-w-5xl mx-auto p-6 space-y-6 flex flex-row">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Movie Poster */}
                    <div className="flex-shrink-0">
                    <img
                        src={user && user.pp_Url}
                        alt="Movie Poster"
                        className="rounded-full shadow-lg object-cover"
                    />
                    </div>
                </div>

                <div className="flex-1 space-y-4 max-w-prose">
                <h1 className="text-4xl font-bold">{user && user.username}</h1>
                <p className="text-gray-600 break-words whitespace-pre-wrap">
                    {"No info"}
                </p>
                <p className="text-gray-500">
                    <strong>Email:</strong> {user && user.email}
                </p>
                <Form method="post" action="/logout">
  <button type="submit">Logout</button>
</Form>
            </div>
            </div>

           
           
        
    </>
}