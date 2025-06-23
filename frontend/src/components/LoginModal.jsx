import { Link, Form } from "react-router-dom";

export default function LoginModal({onClose}){
     const handleModalClick = (e) => {
        e.stopPropagation();
    };
    return <> {/* Backdrop + Centering Container */}
  <div
    className="fixed inset-0 bg-black/50 flex justify-center items-center z-51"
    onClick={onClose}
  >
    {/* Modal */}
    <div
      className="bg-stone-600 p-6 rounded shadow-xl"
      onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
    >
     <Form method="post" className="space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Login :3</h1>

       

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder='Write your valid email'
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder='Create your password'
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>


        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            type="submit"
            disabled={false}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-blue-300 transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
      <h2 className="text-xl mb-4 text-white">Dont have account?
         Then <Link to="/register" onClick={onClose} className="text-amber-300">Register here</Link></h2>
     
   
    
  

    </div>
  </div>
  </>

}