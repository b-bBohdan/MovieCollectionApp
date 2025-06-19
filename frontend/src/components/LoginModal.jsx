import { Link } from "react-router-dom";

export default function LoginModal({onClose}){
     const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return<>
  {/* Backdrop + Centering Container */}
  <div
    className="fixed inset-0 bg-black/50 flex justify-center items-center z-51"
    onClick={onClose}
  >
    {/* Modal */}
    <div
      className="bg-stone-600 p-6 rounded shadow-xl"
      onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
    >
      <h2 className="text-3xl mb-4 text-white">Future Login Form...</h2>
      <h2 className="text-xl mb-4 text-white">Dont have account?
         Then <Link to="/register" className="text-amber-300">Register here</Link></h2>
     
    </div>
  </div>
</>

}