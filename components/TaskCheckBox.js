import React from 'react'

export default function TaskCheckBox({ task, onChange }) {
  return (
    <>
        <div className="max-w-screen-md mx-auto m-2 p-4">
        <div className="flex flex-row items-center">
                <input type="checkbox" className={`mr-2 checkbox-round`} onChange={onChange}/>
                <div className="flex flex-col">
                    <span className="text-[14px]">
                        {task.value}
                    </span>
                </div>
            </div>
        </div>
    </>
  )
}
