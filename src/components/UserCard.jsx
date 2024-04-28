import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
    return (
        <div key={user.id} className="group relative h-fit">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={user.profile}
                    alt={user.firstname}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link to={`/profile/${user?.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {user.firstname}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{user.desc.slice(0,50)}...</p>
                </div>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-0 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Summery
                </button>
            </div>
        </div>
    )
}

export default UserCard
