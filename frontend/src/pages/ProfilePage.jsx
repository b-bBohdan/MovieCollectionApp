import { useUser } from "../context/UserContext";
import Profile from "../components/profile/Profile";
import LikedMovies from "../components/profile/LikedMovies";
import { useLoaderData } from "react-router-dom";

export default function ProfilePage() {
  const data = useLoaderData();
  const likedMovies = data.movie;
  const { user } = useUser();
  return (
    <>
      <Profile user={user}></Profile>
      {likedMovies.length === 0 ? (
        <p className="mt-7.5 text-4xl">You haven't liked any movie yet</p>
      ) : (
        <LikedMovies likedMovies={likedMovies} />
      )}
    </>
  );
}

export async function loader({ request, params }) {
  //defer
  return {
    movie: await loadLikedMoviess(), /// so the navigation will load only when event loaded
  };
}

async function loadLikedMoviess() {
  // console.log(Id);
  try {
    const response = await fetch("http://localhost:3000/users/likes", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // throw json({message: "Couldnt fetch the data"}, {status:500})
      throw new Response(
        JSON.stringify({ message: " coulddddddddnot fetch data " }),
        { status: 500 }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  } catch {
    throw new Response(
      JSON.stringify({ message: " coulddddddddnot fetch data " }),
      { status: 500 }
    );
  }
}
