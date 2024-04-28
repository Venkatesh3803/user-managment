import { useContext, useEffect, useState } from 'react'
import Map from '../components/Map'
import { Link, useParams } from 'react-router-dom'
import apiRequest from '../ultils/requestMethods'
import { AuthContext } from '../contextApi/AuthContext'

const ProfilePage = () => {
    const { currUser } = useContext(AuthContext)
    const { id } = useParams()
    const [data, setData] = useState("")

    useEffect(() => {
        try {
            const fetchingUser = async () => {
                const res = await apiRequest(`/users/${id}`)
                setData(res.data)
            }
            fetchingUser()
        } catch (error) {
            console.log(error)
        }
    }, [id])


    return (
        <div className='px-20 py-10 flex gap-4'>
            <div className=' flex-[2]'>
                <div className="px-4 sm:px-0 flex  justify-between">
                    <div className="">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal user details.</p>
                    </div>
                    <div className="">
                        {currUser?.id === id &&
                            <Link to={`/settings/${currUser.id}`}>
                                <button className='rounded-md bg-green-600 px-3 py-2 h-fit text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
                                    Edit
                                </button>
                            </Link>
                        }
                    </div>
                </div>


                <div className="mt-6 border-t border-gray-100">
                    <img src={data.profile ? data.profile : "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} className='w-60 h-52 object-cover rounded-lg' alt="" />
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.firstname} {data.lastname}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">City</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.city}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">State</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.state}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Latitude & Longitude</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.latitude} , {data.longitude}</dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data.desc}
                            </dd>
                        </div>

                    </dl>
                </div>
            </div>
            <div className="flex-1 h-[100vh]">
                <Map data={data} />
            </div>
        </div>

    )
}

export default ProfilePage

