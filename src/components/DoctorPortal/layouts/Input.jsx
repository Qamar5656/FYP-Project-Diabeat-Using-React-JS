import React from 'react'

const Input = () => {
    return (
        <div>
            <div className="flex justify-center items-center " data-aos = "fade-left">
                <input
                    type="number"
                    placeholder="Enter Sugar"
                    className="p-4 rounded-lg text-black bg-white border-transparent bg-clip-padding outline-none focus:border-yellow-400 border-2 relative"
                    style={{
                        borderImage: "linear-gradient(to right, purple, pink, red) 1",
                    }}
                />
            </div>

        </div>
    )
}

export default Input
