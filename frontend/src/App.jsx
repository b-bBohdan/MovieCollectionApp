import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import MoviesPage, {loader as movieLoader} from './pages/MoviesPage'
import SingleMoviePage from './pages/SingleMoviePage'
import EditMoviePage from './pages/EditMoviePage'



const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout></RootLayout>,
    children: [
       { index: true,
         element: <MoviesPage/>,
         loader: movieLoader
        },
       { path: ':id',
        children:[
          {
            index: true,
            element: <SingleMoviePage/>,        
          },
          {
            path:'edit',
            element:<EditMoviePage/>,
          }
        ] 
      }
    ]
  }
]) 

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
