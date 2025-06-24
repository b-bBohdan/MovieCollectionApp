import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import MoviesPage, {loader as moviesLoader, action as loginAction} from './pages/MoviesPage'
import SingleMoviePage, {loader as movieLoader} from './pages/SingleMoviePage'
import EditMoviePage, {action as patchAction} from './pages/EditMoviePage'
import AddMoviePage, {action as addAction} from './pages/AddMoviePage'
import AuthenticationPage , {action as authAction} from './pages/AuthenticationPage'
import UserContextProvider from './context/UserContext'
import ProfilePage from './pages/ProfilePage'
import {action as logout} from './pages/Logout'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    action: loginAction,
    children: [
       { index: true,
         element: <MoviesPage/>,
         loader: moviesLoader,
        },
       { path: 'add',
          element: <AddMoviePage/>,
          action: addAction
        },
       { path: ':id',
        children:[
          {

            index: true,
            element: <SingleMoviePage/>,
            loader: movieLoader,        
          },
          {
            path:'edit',
            element:<EditMoviePage/>,
            loader: movieLoader,
            action: patchAction,
          }
        ] 
      },
      { path: 'register',
          element: <AuthenticationPage/>,
          action: authAction
        },     
      { path: 'profile',
          element: <ProfilePage/>,
         // action: addAction
      },     
      {
        path: 'logout',
        action: logout,
            },
      
    ]
  }
]) 

function App() {

  return (
    <UserContextProvider>
       <RouterProvider router={router}/>
    </UserContextProvider>
   
  )
}

export default App
