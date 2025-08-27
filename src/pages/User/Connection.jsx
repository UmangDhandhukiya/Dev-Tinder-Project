import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../../utils/connection'

const Connection = () => {
    const dispatch = useDispatch()
    const connection = useSelector((store) => store.connection)
    const showconnection = async () => {
        const response = await fetch(BASE_URL + "/user/request/receiver", {
            credentials: "include",
        })

        const data = await response.json()
        console.log(data);
        
        dispatch(addConnection(data.data))    
    }

    useEffect(()=>{
        showconnection()
    },[])

    if(!connection) return

    if(connection.length === 0) return <h1>Connection not found</h1>
    return (
         <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Connections</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {connection.map((conn) => {
          const user = conn.fromuserid; 
          return (
            <div
              key={conn._id}
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <img
                src={user.imageUrl || "https://via.placeholder.com/150"}
                alt={user.firstname}
                className="w-20 h-20 rounded-full mb-4 object-cover border"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {user.firstname} {user.lastname}
              </h3>
              <p className="text-sm text-gray-500">Status: {conn.status}</p>
                <div className='flex gap-3'>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
                Accepted
              </button>
               <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition">
                Rejected
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    )
}

export default Connection