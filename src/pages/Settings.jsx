
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import apiRequest from '../ultils/requestMethods'
import { AuthContext } from '../contextApi/AuthContext'
import { states } from '../StateData/data'
import axios from 'axios'
import { toast } from 'react-toastify'
import { LoadScript, Autocomplete } from '@react-google-maps/api';



const Settings = () => {
    const { id } = useParams()
    const { updateUser } = useContext(AuthContext)
    const [data, setData] = useState("")
    const [profilePic, setProfilePic] = useState('')
    const imageRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const fetchingUser = async () => {
                const res = await apiRequest.get("/users/" + id)
                setData(res.data)
            }
            fetchingUser()
        } catch (error) {
            console.log(error)
        }
    }, [id])

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'crowdFunding');
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/ddsepnnsm/image/upload',
                    formData
                );
                const imageUrl = response.data.secure_url;
                setProfilePic(imageUrl);

            } catch (err) {
                console.log(err)
            }

        }
    }

    const handleUpate = async (e) => {
        e.preventDefault()
        const formData = {
            profile: data.profile ? data.profile : profilePic,
            ...data
        }
        try {
            const res = await apiRequest.put(`/users/${id}`, formData)
            toast.success("Updated Successfully")
            updateUser(res.data)
        } catch (error) {

        }
    }
    const handleDelete = async (userId) => {
        await apiRequest.delete("/users/" + userId)
        navigate("/")
        toast.success("Deleted Successfully")
    }

    return (
        <>

            <form className='w-[50%] m-auto my-20' onSubmit={handleUpate}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="first-name"
                                        autoComplete="given-name"
                                        defaultValue={data?.firstname}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="last-name"
                                        autoComplete="family-name"
                                        defaultValue={data?.lastname}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        defaultValue={data?.email}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="desc"
                                        rows={3}
                                        defaultValue={data?.desc}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Profile Picture
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    {data.profile || profilePic ?
                                        <img src={profilePic ? profilePic : data.profile} alt="" className='w-60 h-40 object-cover rounded-lg' />
                                        :
                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                    }
                                    <input type="file" hidden ref={imageRef} onChange={handleUpload} />
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => imageRef.current.click()}
                                    >
                                        Upload New
                                    </button>
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="gender"
                                        name="gender"
                                        autoComplete="gender"
                                        value={data?.gender}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value={""}>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        defaultValue={data?.address}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="State" className="block text-sm font-medium leading-6 text-gray-900">
                                    State
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="text"
                                        name="state"
                                        value={data?.state}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value={""}>Select</option>
                                        {states?.map((s, i) => {
                                            return (
                                                <option key={i}>{s}</option>
                                            )
                                        })}

                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        defaultValue={data?.city}
                                        onChange={handleChange}
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="latitude" className="block text-sm font-medium leading-6 text-gray-900">
                                    Latitudes
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="latitude"
                                        id="latitude"
                                        autoComplete="latitude"
                                        defaultValue={data?.latitude}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="plongitude" className="block text-sm font-medium leading-6 text-gray-900">
                                    Longitudes
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="longitude"
                                        id="longitude"
                                        autoComplete="longitude"
                                        defaultValue={data?.longitude}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save Changes
                    </button>
                    <button type="button" onClick={() => handleDelete(data.id)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-red:outline-indigo-600">
                        Delete Account
                    </button>
                </div>
            </form>
        </>
    )
}

export default Settings
