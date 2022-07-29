import React from 'react'

export default function TaskCheckBox({ task, onChange }) {
  return (
    <>
        <div className="flex flex-row items-center mb-4" id={task.id}>
                <input type="checkbox" className={`mr-2 checkbox-round`} onChange={onChange}/>
                <div className="flex flex-col">
                    <span className="text-[14px]">
                        {task.value}
                    </span>
                </div>
            </div>
    </>
  )
}
