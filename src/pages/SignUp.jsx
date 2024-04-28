import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';
import apiRequest from "../ultils/requestMethods";
import { AuthContext } from "../contextApi/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
    const { updateUser } = useContext(AuthContext)
    const [inputs, setInputs] = useState({});
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setErr("")
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id: uuidv4(),
            ...inputs
        }

        if (inputs.password !== inputs.conformPassword) return setErr("Password does not Match")
        try {
            const res = await apiRequest.get(`/users`,)
            if (res.data) {
                if (res.data.find((user) => user.email === inputs.email)) {
                    setErr("This Email Already taken")
                } else {
                    const res = await apiRequest.post("/users", data)
                    if (res.data) {
                        updateUser(res.data)
                        navigate(`/settings/${res.data.id}`)
                        toast.success("SignUp Success")
                    }
                }
            }
        } catch (error) {
            setErr("this email Already taken")
        }

    }

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Start Your Journy with us
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="flex gap-4 ">
                            <div className="flex-1">
                                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firsttame"
                                        name="firstname"
                                        type="text"
                                        autoComplete="firstname"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        autoComplete="lastname"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="conform-password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Conform  Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="conformPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <p className="mt-10  text-sm text-red-500">{err}</p>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to={"/signin"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignUp
