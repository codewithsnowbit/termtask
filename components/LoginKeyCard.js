import React, { useState } from 'react'

export default function LoginKeyCard({secretKey}) {
    const [copied, setCopied] = useState(false)
  return (
    <>
        <div className="max-w-screen-md mx-auto m-2 p-4 shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-2">
                Access Tasks in your terminal
            </h1>
            <hr />
            <div className="mt-4">
                <div className="text-md  font-semibold">
                    Login key: <code className="font-light text-sm">{secretKey}</code>
                    &nbsp;
                    <span className="font-light text-sm cursor-pointer underline underline-offset-2 uppercase" onClick={() => {
                        navigator.clipboard.writeText(secretKey)
                        setCopied(true)
                        setTimeout(() => {
                            setCopied(false)
                        }, 2000)
                    }}>
                        {copied ? "Copied!" : "Copy"}
                    </span>
                </div>
            </div>
        </div>
    </>
  )
}
