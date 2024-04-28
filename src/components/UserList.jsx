import { useEffect, useState } from "react"
import UserCard from "./UserCard"
import apiRequest from "../ultils/requestMethods"
import MultipleMap from "./MultipleMarkerMaps"


const UserList = ({ homepage }) => {
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
    return (
        <div className="bg-white">
            <div className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ${!homepage ? "flex gap-5" : ""}`}>
                <div className={homepage ? "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" : "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 flex-1"}>
                    {data?.map((user) => (
                        <UserCard user={user} />
                    ))}
                </div>
                {!homepage &&
                    <div className="flex-1 md:block hidden ">
                        <MultipleMap data={data}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default UserList
