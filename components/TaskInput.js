import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
export default function TaskInput({tasks}) {
    const [taskValue, setTaskValue] = useState('')
    async function createTask() {
        const response = await axios.post('/api/user/createtask', {
            uid: localStorage.getItem('uid'),
            value: JSON.stringify([...tasks, {
                id: uuidv4(),
                value: taskValue,
                completed: false,
            }])
        })
        if(response.data.success){
            setTaskValue('')
        }
    }
  return (
    <>
        <div className="max-w-screen-md mx-auto p-4">
            <input className="w-full resize-none bg-transparent text-brand-black focus:outline-none text-[14px] p-2 leading-snug placeholder-brand-grey-500 focus:border-gray-50 focus:bg-white focus:ring-0 border-gray-50" type="text" placeholder="Add a task" value={taskValue} onChange={(e) => setTaskValue(e.target.value)}/>
            <div className="flex justify-end mt-2">
                        <button className={`border px-4 py-1 rounded-md text-md font-light ${taskValue ? "bg-black text-white" : "bg-gray-300 text-black"} duration-300`}
                        disabled={!taskValue} onClick={createTask}>
                            Add Task
                        </button>
            </div>
        </div>
    </>
  )
}
