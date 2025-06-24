
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import './AuthForm.css'

function AuthForm() {
    const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to backend
  };

 
    
     
 //const data = useActionData();
 //const navigation = useNavigation();

 //const [searchParams, setSearchParams] = useSearchParams();
 //const isLogin = searchParams.get('mode') === 'login';
// const isSubmitting = navigation.state ==='submitting';
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Form method="post" className="space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Register :3</h1>

        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="username"
            name="username"
            placeholder='Create username'
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

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

      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 bg-blue-500  hover:bg-blue-800 text-white rounded"
      >
        Continue with Google
      </button>


        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            type="submit"
            disabled={false}
            className="px-6 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-blue-300 transition-colors"
          >
            Save
          </button>
          <a
            href="/"
            className="text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </a>
        </div>
      </Form>
    </div>)
}

export default AuthForm;
