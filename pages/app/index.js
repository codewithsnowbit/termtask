import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserButton } from '@clerk/nextjs'
import LoginKeyCard from '../../components/LoginKeyCard'
import TaskInput from '../../components/TaskInput'

export default function AppHome() {
  const [loading, setLoading] = useState(true)
  const [greet, setGreet] = useState(true)
  const [secretKey, setSecretKey] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    async function createUser() {
      const response = await axios.post('/api/user/create', {
        uid: localStorage.getItem('uid'),
        tasks: "[]"
      })
      setSecretKey(response.data.data.secretKey)
      setTasks(JSON.parse(response.data.data.tasks))
      if(response.data.success){
        setLoading(false)
      }
    }
    createUser()
  }, [])
  useEffect(() => {
    if(!loading){
      setTimeout(() => {
        setGreet(false)
      }, 3000)
    }
  })
  return (
    <>
      <div className={`${loading ? "flex" : "hidden"} justify-center items-center min-h-screen text-4xl font-black animate-pulse`}>
        Loading...
      </div>
        <div className={`max-w-screen-lg mx-auto m-2 p-4 ${loading ? "hidden" : "block"}`}>
            <div className="flex justify-between">
                <div className="font-mono text-lg sm:text-2xl">
                    {"<TermTask />"}
                </div>
                <div className="flex flex-row space-x-4 items-center">
                  <div className={`text-lg font-light duration-300 ${greet ? "opacity-100" : "opacity-0"}`}>
                    Hey there!
                  </div>
                  <div>
                    <UserButton />
                  </div>
                </div>
            </div>
        </div>
        <hr />
        <LoginKeyCard secretKey={secretKey}/>
        <div className="max-w-screen-md mx-auto my-4">
          <div className="p-3 font-bold text-xl">
            Tasks
          </div>
          <TaskInput tasks={tasks}/>
        </div>
    </>
  )
}
