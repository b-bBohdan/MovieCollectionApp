import { Link } from "react-router-dom";
import './Header.css'

export default function Header() {
    return (
      <header className="bg-white shadow-md mb-6 rounded-2xl">
        <div className="header-container mx-auto px-4 py-3 flex justify-between items-center ">

          <div className="text-2xl font-bold text-gray-800"><Link to='/'>Mogo</Link></div>

          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-amber-500">Service</a>
            <a href="#" className="text-gray-600 hover:text-amber-500">About</a>
            <a href="#" className="text-gray-600 hover:text-amber-500">Blog</a>
            <a href="#" className="text-gray-600 hover:text-amber-500">Work</a>
            <a href="#" className="ml-6 text-gray-800 font-semibold hover:text-amber-500">Login</a>
          </nav>
        </div>
      </header>
    );
  }
  