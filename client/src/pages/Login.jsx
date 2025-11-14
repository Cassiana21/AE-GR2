import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { loginUser } from "../api/auth.routes"
import { setToken } from "../store/slices/userSlice"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await loginUser(formData)

    if (response?.success) {
      dispatch(setToken(response.data))
      toast.success("Login successful! Redirecting...")
      setTimeout(() => navigate("/"), 1500)
    } else {
      toast.error(response?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-white to-rose-200 px-6">
      
      {/* Card container */}
      <div className="backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-sm border border-white/40">
        
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <img
            alt="Brand logo"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=rose&shade=500"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-4 text-2xl font-bold text-rose-700">
            Sign in to your account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
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
              className="mt-2 block w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
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
              className="mt-2 block w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-rose-600 text-white font-semibold py-2.5 shadow-md hover:bg-rose-700 transition-all"
          >
            Sign in
          </button>
        </form>

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-rose-600 hover:text-rose-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
