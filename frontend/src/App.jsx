import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import MoviesPage, {loader as moviesLoader} from './pages/MoviesPage'
import SingleMoviePage, {loader as movieLoader} from './pages/SingleMoviePage'
import EditMoviePage, {action as patchAction} from './pages/EditMoviePage'
import AddMoviePage, {action as addAction} from './pages/AddMoviePage'


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
