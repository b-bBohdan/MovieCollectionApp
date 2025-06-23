import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import MoviesPage, {loader as moviesLoader} from './pages/MoviesPage'
import SingleMoviePage, {loader as movieLoader} from './pages/SingleMoviePage'
import EditMoviePage, {action as patchAction} from './pages/EditMoviePage'
import AddMoviePage, {action as addAction} from './pages/AddMoviePage'
import AuthenticationPage from './pages/AuthenticationPage'
 


const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    children: [
       { index: true,
         element: <MoviesPage/>,
         loader: moviesLoader
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
          action: addAction
        },     
      { path: 'oauth-success',
          element: <AuthenticationPage/>,
          action: addAction
      },     
      
    ]
  }
]) 

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
