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
        setTimeout(() => navigate('/login'), 1500)
    } 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-12">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/30">
        
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <img
            alt="Logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-12"
          />
          <h2 className="mt-4 text-3xl font-bold text-slate-900 drop-shadow-lg">
            Create an account
          </h2>
          <p className="text-sm text-slate-700 mt-1">
            Join our platform in seconds!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-900">
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
              className="mt-2 block w-full rounded-lg bg-white/50 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-inner focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900">
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
              className="mt-2 block w-full rounded-lg bg-white/50 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-inner focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-900">
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
              className="mt-2 block w-full rounded-lg bg-white/50 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-inner focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-lg bg-rose-600 text-white font-semibold py-2 hover:bg-rose-500 transition shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-rose-600 hover:text-rose-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
