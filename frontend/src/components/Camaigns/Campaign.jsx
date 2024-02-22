import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Campaign = () => {
    const handleShowSreach = () => {
    //    
    };
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col rounded-3xl border-2 border-gray-300 shadow-lg w-full'>
                <div className="flex flex-row justify-between p-4">
                    <div className="w-1/5 flex flex-col">
                        <p className='text-lg font-bold'>All Campaigns</p>
                        <p style={{ color: '#16C098' }} className='text-black opacity-70 font-medium text-sm'>Your Campaigns</p>
                    </div>
                    <div className="w-4/5 flex flex-row justify-between">
                        <div className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:outline-none border-red bg-white h-auto">
                            <input
                                type="text"
                                placeholder="Search here..."
                                id="name_campaign"
                                name="name_campaign"
                                icon={faMagnifyingGlass}
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{ color: '#387DE4' }}
                                size="xl"
                                onClick={handleShowSreach}
                            />
                        </div>
                        <div className="flex items-center flex-row px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:outline-none focus:border-[#9ECEC3] bg-white h-25">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showIcon
                                toggleCalendarOnIconClick
                                className="ml-3"
                            />
                        </div>
                        <div className="flex items-center flex-row px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none h-auto ml-3">
                            <p className="justify-center p-6" >Budget: </p>
                            <select className="selectpicker" data-width="2px" aria-label="None" id="milestoneSelect" name="milestone">
                                <option value="asc">Ascending</option>
                                <option value="desc">Decrease</option>
                            </select>
                        </div>
                        <button className="flex items-center flex-row bg-[#9ECEC3] rounded-3xl px-6 py-3 font-bold text-white">
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{ color: '#ffffff' }}
                                size="xl"
                                onClick={handleShowSreach}
                            />
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaign
