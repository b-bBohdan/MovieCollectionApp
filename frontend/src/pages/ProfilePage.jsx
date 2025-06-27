import { useUser } from "../context/UserContext";
import Profile from "../components/profile/Profile";
import LikedMovies from "../components/profile/LikedMovies";
import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import GhostContainer from "../components/movie/GhostContainer";
import Container from "../components/movie/Container";

export default function ProfilePage() {
  const data = useLoaderData();
  console.log(data);
  //const likedMovies = data.movie;
  const { user } = useUser();
  return (
    <>
      <Profile user={user}></Profile>
      <div className="text-base md:text-3xl text-left">
        <strong> Your liked likedMovies:</strong>
      </div>

      <Suspense fallback={<GhostContainer type="smallcontainer" />}>
        <Await resolve={data.movies}>
          {(likedMovies) => {
            return likedMovies.length === 0 ? (
              <p className="mt-7.5 text-4xl">You haven't liked any movie yet</p>
            ) : (
              <>
                <Container type="smallcontainer" movies={likedMovies} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export async function loader({ request, params }) {
  //defer
  return {
    movies: loadLikedMoviess(), /// so the navigation will load only when event loaded
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
