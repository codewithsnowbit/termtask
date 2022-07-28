import React, { useState } from 'react'

export default function TaskInput() {
    const [taskValue, setTaskValue] = useState('')
  return (
    <>
        <div className="max-w-screen-md mx-auto p-4">
            <input className="w-full resize-none bg-transparent text-brand-black focus:outline-none text-[14px] p-2 leading-snug placeholder-brand-grey-500 focus:border-gray-50 focus:bg-white focus:ring-0 border-gray-50" type="text" placeholder="Add a task" value={taskValue} onChange={(e) => setTaskValue(e.target.value)}/>
            <div className="flex justify-end mt-2">
                        <button className={`border px-4 py-1 rounded-md text-md font-light ${taskValue ? "bg-black text-white" : "bg-gray-300 text-black"} duration-300`}
                        disabled={!taskValue}>
                            Add Task
                        </button>
            </div>
        </div>
    </>
  )
}
