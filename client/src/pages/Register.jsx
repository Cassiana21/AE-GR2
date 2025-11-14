import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { registerUser } from "../api/user.routes"

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser(formData);

    if (response.success) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 px-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30">
        
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <img
            alt="Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-12"
          />
          <h2 className="mt-4 text-3xl font-bold text-white drop-shadow-lg">
            Create an account
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Join our platform in seconds!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NAME */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/90">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="mt-2 block w-full rounded-lg bg-white/25 px-3 py-2 text-white placeholder-white/60 shadow-inner focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/90">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-2 block w-full rounded-lg bg-white/25 px-3 py-2 text-white placeholder-white/60 shadow-inner focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/90">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="mt-2 block w-full rounded-lg bg-white/25 px-3 py-2 text-white placeholder-white/60 shadow-inner focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 rounded-lg bg-white/90 text-indigo-700 font-semibold py-2 hover:bg-white transition shadow-md"
          >
            Register
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-white hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
