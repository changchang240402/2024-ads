import React from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => {
    return (
        <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
            <div className="flex flex-1 justify-center items-center">
                <FontAwesomeIcon icon={faSpinner} style={{ color: "red" }} />
            </div>
        </div >
    )
}

export default Loading
