import React from 'react'

const Button = ({title}) => {
  return (
    <div>
      <button className='bg-orange-600 text-white px-3 py-1 text-xl rounded-md hover:bg-hoverColors transition duration-300 ease-in-out'>
      {title}
      </button>
    </div>
  )
}

export default Button
