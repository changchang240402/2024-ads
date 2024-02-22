import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Campaign = () => {
    const handleShowSidebar = () => {
    //    
    };
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className='flex flex-col'>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <p className='text-lg font-bold'>All Campaigns</p>
                    <p style={{ color: '#16C098' }}className='text-black opacity-70 font-medium text-sm'>Your Campaigns</p>
                </div>
                <div className="flex flex-row">
                    <div className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:outline-none focus:border-[#9ECEC3] bg-white" >
                        <input
                            className="focus:border-[#9ECEC3] bg-white"
                            type="text"
                            placeholder="Search here..."
                            id="name_campaign"
                            name="name_campaign"
                        />
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ color: '#387DE4' }}
                            size="xl"
                            // onClick={handleShowSreach}
                        />
                    </div>
                    <div className="flex-row px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none focus:outline-none focus:border-[#9ECEC3] bg-white">
                        <p>Date time: </p>
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            
                            />
                    </div>
                    <div className="px-4 py-3 shadow-sm rounded-3xl border-2 focus:outline-none">
                        <p>Date time: </p>
                        <select class="selectpicker" data-width="10%" aria-label="None" id="milestoneSelect" name="milestone">
                            <option value="asc">Ascending</option>
                                <option value="desc">Decrease</option>
                        </select>
                    </div>
                    <div className="mt-16 text-center">
                        <FontAwesomeIcon
                            icon={faPlus}
                            style={{ color: '#387DE4' }}
                            size="xl"
                            // onClick={handleShowSreach}
                        />
                        <button className="bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white">
                            Create
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}

export default Campaign
