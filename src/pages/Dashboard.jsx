import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiRequest from '../ultils/requestMethods'

const Dashboard = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        try {
            const fetchingUser = async () => {
                const res = await apiRequest(`/users`)
                setData(res.data)
            }
            fetchingUser()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDelete = async (userId) => {
        await apiRequest.delete("/users/" + userId)
        toast.success("Delected Successfully")
        window.location.reload()
    }
    return (
        <div className='w-[80%] m-auto py-20'>
            {/* <!-- component --> */}
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">Admin Panel</h3>
                    </div>
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <Link to={"/adduser"} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-10 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Add New User</Link>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Gender</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Addess</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">City</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {data?.map((user) => {
                            return (
                                <tr className="hover:bg-gray-50">
                                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                        <div className="relative h-10 w-10">
                                            {user.profile ?
                                                <img
                                                    className="h-full w-full rounded-full object-cover object-center"
                                                    src={user?.profile}
                                                    alt=""
                                                />
                                                :
                                                <img
                                                    className="h-full w-full rounded-full object-cover object-center"
                                                    src="https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                                                    alt=""
                                                />
                                            }
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">{user?.firstname}</div>
                                            <div className="text-gray-400">{user?.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <p>
                                            {user.gender}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">{user.desc.slice(0,100)}...</td>
                                    <td className="px-6 py-4">{user.address}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {user.city}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-4">
                                            <button onClick={() => handleDelete(user.id)} x-data="{ tooltip: 'Delete' }" >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                            <Link to={`/editpage/${user.id}`} x-data="{ tooltip: 'Edite' }" href="#">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                    x-tooltip="tooltip"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
