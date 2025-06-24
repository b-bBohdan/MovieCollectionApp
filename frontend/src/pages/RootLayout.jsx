import { useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from 'react-router-dom';
import { useUser } from "../context/UserContext";

export default function RootLayout(){

    const {fetchUser} = useUser();

    useEffect(()=>{
        fetchUser();
    }, [])

    return <>
            <Header></Header>  
            <Outlet></Outlet>  
        </>
}