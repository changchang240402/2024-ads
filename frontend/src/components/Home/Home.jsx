import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple, faDownload } from '@fortawesome/free-solid-svg-icons'

import BasicBar from '../Chart/BasicBar/BasicBar'
import userDashboardService from '../../services/userDashboardService'
import Loading from '../Loading/Loading'
import basicChartConfig from '../Chart/BasicBar/BasicBarConfig';
import PlatformBarConfig from '../Chart/BasicBar/PlatformBarConfig';


const Home = () => {
    const { statistics } = userDashboardService();
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await statistics();
            setData(response);
        }

        fetchData();
    }, [])

    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
                        <p className='font-bold text-lg my-1'>{data?.total?.ads?.totalAds}</p>
                        <p className='opacity-60 text-sm'>Total Adsverstisements</p>
                        <p className='text-[#4079ED]'>{`+${data?.total?.ads?.adsDiff} from last month`}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#FFF4DE] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#FF947A]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>{data?.total?.groups?.totalGroups}</p>
                        <p className='opacity-60 text-sm'>Total Groups</p>
                        <p className='text-[#4079ED]'>{`+${data?.total?.groups?.groupsDiff} from last month`}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#DCFCE7] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#3CD856]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>{data?.total?.campaigns?.totalCampaigns}</p>
                        <p className='opacity-60 text-sm'>Total Campaigns</p>
                        <p className='text-[#4079ED]'>{`+${data?.total?.campaigns?.campaignsDiff} from last month`}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start bg-[#F3E8FF] rounded-2xl p-4">
                        <div className="rounded-full px-2 py-1 bg-[#BF83FF]">
                            <FontAwesomeIcon icon={faChartSimple} style={{ color: "white" }} />
                        </div>
                        <p className='font-bold text-lg my-1'>{data?.total?.adsPaused?.totalAdsPaused}</p>
                        <p className='opacity-60 text-sm'>Ads Paused Now</p>
                        <p className='text-[#4079ED]'>{`+${data?.total?.adsPaused?.adsPausedDiff} from last month`}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center bg-white m-6  rounded-xl shadow-sm">
                {data?.dataTotalAds ? (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Total ads by years</label>
                        <div className="flex justify-center items-center">
                            <BasicBar data={data?.dataTotalAds} config={basicChartConfig} xLabels={xLabels} />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Total ads by years</label>
                        <Loading />
                    </div>
                )}
                {(data?.plasformXlables && data?.dataPlatforms) ? (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Ads by platform statistics</label>
                        <div className="flex flex-1 justify-center items-center">
                            <BasicBar data={data?.dataPlatforms} config={PlatformBarConfig} xLabels={data?.plasformXlables}  />
                        </div>
                    </div >
                ) : (
                    <div className='flex flex-1 flex-col bg-white w-1/2 m-2'>
                        <label className='text-base font-bold'>Ads by platform statistics</label>
                        <Loading />
                    </div >
                )}
            </div >
        </div >
    )
}

export default Home
