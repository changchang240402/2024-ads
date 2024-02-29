import React, { useEffect, useState } from 'react'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CustomTable from '../Table/CustomTable'
import adminDashboardServvice from '../../../services/adminDashboardServvice'

const User = () => {

    const { getAllUsers } = adminDashboardServvice();
    const START_PAGE = 1;
    const PER_PAGE = 5;
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await getAllUsers(START_PAGE, PER_PAGE);
            console.log(response);
            setData(response.total);
        }
        fetchData();

    }, []);

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
                        <p className='text-lg font-bold'>Top Adsverstisements</p>
                    </div>
                    <CustomTable />
                </div>
            </div>
        </div>
    )
}

export default User
