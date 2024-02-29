import React, { useEffect, useState } from 'react'
import { faCalendar, faChartSimple, faFilterCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import CustomTable from '../Table/CustomTable'
import adminDashboardServvice from '../../../services/adminDashboardServvice'
import { DEFAULT_USER_PER_PAGE, USER_STATUS } from '../../../const/config';
import { formatDateCustom } from '../../../utility/formatdate';

const User = () => {
    const { getAllUsers } = adminDashboardServvice();
    const [date, setDate] = useState(formatDateCustom(new Date()));
    const [status, setStatus] = useState('');
    const [filter, setFilter] = useState({
        search: {
            'key': 'name',
            'value': ''
        },
        date: '',
        status: ''
    });

    const statusData = [
        USER_STATUS.active,
        USER_STATUS.banned
    ]

    const [data, setData] = useState(null);

    const START_PAGE = 1;
    const PER_PAGE = DEFAULT_USER_PER_PAGE;


    const handleClearFilter = () => {
        setFilter({ search: { key: 'name', value: '' }, date: '', status: '' });
        setDate(formatDateCustom(new Date()));
    };

    const handleDateChange = (date) => {
        setDate(formatDateCustom(date));
        setFilter({ ...filter, date: formatDateCustom(date) });
    };

    const handleChangeStatus = (e) => {
        setFilter({ ...filter, status: e.target.value })
        setStatus(e.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await getAllUsers(START_PAGE, PER_PAGE, '', '');
            setData(response?.total);
        }
        fetchData();

    }, [filter]);

    return (
        <div className='flex flex-1 flex-col font-poppins'>
            <div className="flex flex-col bg-white m-6 my-3 p-2 rounded-xl shadow-sm">
                <div className="flex justify-between mx-10">
                    <div className="flex flex-1 flex-col">
                        <p className='text-lg font-bold'>User&apos;s Statistics</p>
                        <p className='text-black opacity-70 font-medium text-sm'>Summary</p>
                    </div>
                </div>
                <div className="flex justify-around p-6">
                    <div className="flex flex-col justify-start items-start w-40 bg-[#DCFCE7] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#3CD856]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1 mx-1'>{data?.all}</p>
                        <p className='opacity-60 text-sm'>Total Users </p>
                    </div>
                    <div className="flex flex-col justify-start items-start w-40 bg-[#FFF4DE] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#FF947A]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1 mx-1'>{data?.active}</p>
                        <p className='opacity-60 text-sm'>Total active user</p>
                    </div>
                    <div className="flex flex-col justify-start items-start w-40 bg-[#FFE2E5]  rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1  bg-[#FA5A7D]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1 mx-1'>{data?.inactive}</p>
                        <p className='opacity-60 text-sm'>Total deleted user</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-10 bg-white mx-6 mb-3 p-2 m-2 rounded-xl shadow-lg">
                <div className="flex flex-1 flex-col rounded-lg justify-between ">
                    <div className="flex">
                        <p className='text-lg font-bold'>Users management</p>
                    </div>
                    <div className="flex">
                        <div className='flex flex-1 items-center justify-center'>
                            <div className="flex justify-center items-center p-2 m-2 mx-4 shadow-sm rounded-3xl border-2 focus:outline-none border-[#0095FF] bg-white    ">
                                <FontAwesomeIcon icon={faSearch} size='lg' color='#387DE4' />
                                <input className=' px-2 focus:outline-none focus:border-[#0095FF] outline-none bg-white' type="text" placeholder='Search here'
                                    value={filter.search.value}
                                    onChange={(e) => setFilter({ ...filter, search: { ...filter.search, value: e.target.value } })}
                                />
                            </div>
                            <div className='mx-4'>
                                <span className='opacity-85 mx-2'>Filter by</span>
                                <select className='border p-2 focus:border-[#0095FF]' value={filter.search.key} onChange={(e) => setFilter({ ...filter, search: { ...filter.search, key: e.target.value } })}>
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                            <div className='flex items-center py-2 border px-2 mx-10 '>
                                <DatePicker className="focus:outline-none focus:border-none" selected={date} onChange={handleDateChange} />
                                <FontAwesomeIcon icon={faCalendar} color={'#0095FF'} size='lg' />
                            </div>
                            <div className=''>
                                <select className='border rounded-2xl p-2 focus:border-[#0095FF]' value={status} onChange={handleChangeStatus}>
                                    <option value="status">Status</option>
                                    {statusData?.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="mx-4 mr-20" onClick={handleClearFilter}>
                                <FontAwesomeIcon icon={faFilterCircleXmark} color={'#0095FF'} size='xl' />
                            </button>
                        </div>
                    </div>
                    <CustomTable filter={filter} />
                </div>
            </div>
        </div>
    )
}

export default User
