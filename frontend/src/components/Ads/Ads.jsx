import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import PieChartBasic from '../Chart/PieChar/PieChartBasic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import topAdsConfig from './TopAdsTable/TopAdstaleConfig';
import AdsDashboardService from '../../services/AdsDashboardService';
import Loading from '../Loading/Loading';
import PieCharConfig from '../Chart/PieChar/PieChartConfig';

import { ADS_STATUS } from '../../const/config';
import { formatDateCustom } from '../../utility/formatdate';
import VizualizedTable from './DataTable/VizualizedTable';

const Ads = () => {
    const { getTopAds } = AdsDashboardService();

    const sort = {
        sort: '',
        direction: '',
    };

    const [date, setDate] = useState(formatDateCustom(new Date()));
    const [status, setStatus] = useState('');

    const [filter, setFilter] = useState({
        search: {
            'key': 'ad_name',
            'value': ''
        },
        date: '',
        status: '',
    });

    const size = PieCharConfig;

    const [data, setData] = useState({
        topAds: [],
    });

    const handleClearFilter = () => {
        setFilter({ search: { key: 'ad_name', value: '' }, date: '', status: '' });
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
        const fetchData = async () => {
            const topAdsResult = await getTopAds();
            setData({
                totalAds: topAdsResult,
            });

        };

        fetchData();
    }, []);

    const statusData = ADS_STATUS;

    return (
        <div className='flex flex-1 flex-col justify-around font-poppins'>
            <div className="flex flex-col px-10 bg-white mx-6 mb-3 p-2 m-2 rounded-xl shadow-lg">
                <div className="flex">
                    <div className="flex flex-1 flex-col rounded-lg justify-between ">
                        <div className="flex">
                            <p className='text-lg font-bold'>Top Adsverstisements</p>
                        </div>
                        <div className='flex flex-1 p-4 justify-center items-center w-full'>
                            {data?.totalAds?.topAds?.length > 0 ? (
                                <table className='border-b rounded-xl w-full text-base'>
                                    <thead>
                                        <tr>
                                            {topAdsConfig.title.map((item, index) => (
                                                <th className='border-b text-left py-2 text-[#96A5B8]' key={index}>{item}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.totalAds.topAds.map((item, index) => (
                                            <tr className='border-b items-start' key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.kpi}</td>
                                                <td>
                                                    <div className={`progress-bar text-base flex items-center justify-start 
                                                    ${item.kpi < item.conversion_rate ? "bg-[#CDE7FF]" : "bg-red-200"}  mr-4 my-2 rounded-2xl`}>
                                                        <div className={`progress rounded-2xl flex justify-center 
                                                        ${item.kpi < item.conversion_rate ? "bg-[#0095FF]" : "bg-red-600"} `}
                                                            style={{ width: `${item.conversion_rate}%` }}>
                                                            <p className='px-2 text-white'>{item.conversion_rate}%</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className='flex flex-1 flex-col justify-center items-center bg-white m-2'>
                                    <Loading />
                                </div >
                            )}
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col w-full">
                        <div className='text-lg font-bold'>Ads by platforms</div>
                        {data?.totalAds?.totalAdsByPlatforms?.length > 0 ? (
                            <div className='flex items-center'>
                                <PieChartBasic size={size} data={data?.totalAds?.totalAdsByPlatforms} />
                            </div>
                        ) : (
                            <div className='flex flex-1 flex-col justify-center items-center bg-white m-2'>
                                <Loading />
                            </div >
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col p-4 items-start bg-white mx-6 rounded-xl shadow-lg">
                <div className='flex flex-1 justify-between items-center mb-4 w-full'>
                    <div className='flex flex-1 items-center'>
                        <div className="flex justify-center items-center p-2 m-2 mx-4 shadow-sm rounded-3xl border-2 focus:outline-none border-[#387DE4] bg-white    ">
                            <FontAwesomeIcon icon={faSearch} />
                            <input className=' px-2 focus:outline-none focus:border-[#387DE4] outline-none bg-white' type="text" placeholder='Search here'
                                value={filter.search.value}
                                onChange={(e) => setFilter({ ...filter, search: { ...filter.search, value: e.target.value } })} />
                        </div>
                        <div className='mx-4'>
                            <span className='opacity-85 mx-2'>Filter by</span>
                            <select className='border p-2 focus:border-[#387DE4]' value={filter.search.key}
                                onChange={(e) => (setFilter({ ...filter, search: { ...filter.search, key: e.target.value } }))}>
                                <option value="ad_name">Name</option>
                                <option value="ad_content">Content</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center z-50 py-2 border px-2 mx-10'>
                        <DatePicker className='outline-none' selected={date} onChange={handleDateChange} />
                        <FontAwesomeIcon icon={faCalendar} color={'#387DE4'} size='lg' />
                    </div>
                    <div className='mx-2'>
                        <select className='border rounded-2xl p-2 focus:border-[#387DE4]' value={status} onChange={handleChangeStatus}>
                            <option value="">Status</option>
                            {statusData?.map((item, index) => (
                                <option key={index} value={item == ADS_STATUS[0] ? 'active' : 'paused'}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <button className="mx-4 mr-20" onClick={handleClearFilter}>
                        <FontAwesomeIcon icon={faFilterCircleXmark} color={'#387DE4'} size='xl' />
                    </button>
                </div>
                <div className='flex flex-1 w-full shadow-md'>
                    <VizualizedTable filter={filter} initSort={sort} />
                </div>
            </div >
        </div >
    );
};

export default Ads;
