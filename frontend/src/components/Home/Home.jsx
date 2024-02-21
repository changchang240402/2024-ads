import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faDownload } from '@fortawesome/free-solid-svg-icons'
import { BarChart } from '@mui/x-charts/BarChart';

const Home = () => {

    return (
        <div className='flex flex-1 flex-col font-poppins'>
            <div className="flex flex-col bg-white m-6 my-3 p-2 rounded-xl shadow-sm">
                <div className="flex justify-between mx-10">
                    <div className="flex flex-1 flex-col">
                        <p className='text-lg font-bold'>Today&apos;s Statistics</p>
                        <p className='text-black opacity-70 font-medium text-sm'>Summary</p>
                    </div>
                    <div className="flex flex-1 items-center flex-row justify-end mx-10">
                        <div className='border border-stone-300 rounded-lg p-2 cursor-pointer hover:bg-[#38a5e4] hover:text-white'>
                            <FontAwesomeIcon icon={faDownload} />
                            <label className='mx-2 cursor-pointer'>Export</label>
                        </div>
                    </div>

                </div>
                <div className="flex justify-around p-6">
                    <div className="flex flex-col justify-start items-start bg-[#FFE2E5] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#FA5A7D]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>1000</p>
                        <p className='opacity-60 text-sm'>Total Adsverstisements</p>
                        <p className='text-[#4079ED]'>+8 from last month</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#FFF4DE] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#FF947A]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>200</p>
                        <p className='opacity-60 text-sm'>Total Adsverstisements</p>
                        <p className='text-[#4079ED] text-xs'>+8 from last month</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#DCFCE7] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#3CD856]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>1000</p>
                        <p className='opacity-60 text-xs'>Total Adsverstisements</p>
                        <p className='text-[#4079ED]'>+8 from last month</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#F3E8FF] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#BF83FF]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>1000</p>
                        <p className='opacity-60 text-sm'>Total Adsverstisements</p>
                        <p className='text-[#4079ED]'>{`+1 from last month`}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between bg-white m-6  rounded-xl shadow-sm">
                <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                    <label className='text-sm font-bold'>Total ads by years</label>
                    <div className="flex justify-center items-center">
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Apr', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
                            series={[{ data: [1000, 290, 500, 200, 400, 290, 500, 200, 190, 700, 201, 100] }, { data: [600, 190, 700, 201, 290, 500, 200, 400, 290, 500, 999, 200] }]}
                            width={700}
                            height={400}
                            colors={['#0095FF', '#00E096']}
                        />
                    </div>
                </div>
                <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                    <label className='text-sm font-bold'>Total ads by years</label>
                    <div className="flex justify-center items-center">
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Apr', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
                            series={[{ data: [1000, 290, 500, 200, 400, 290, 500, 200, 190, 700, 201, 100] }, { data: [600, 190, 700, 201, 290, 500, 200, 400, 290, 500, 999, 200] }]}
                            width={700}
                            height={400}
                            colors={['#0095FF', '#00E096']}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
