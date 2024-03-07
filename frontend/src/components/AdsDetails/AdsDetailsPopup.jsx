import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { TableVirtuoso } from 'react-virtuoso';
import { useEffect, useState } from 'react';

import { closeViewPopup, closeEditPopup } from '../../redux/actions/showPopup.js';
import Label from '../Label/Label.jsx';
import AdsAtribute from '../Ads/AdsAtribute/AdsAtribute.jsx';
import { ADS_ITEM_ACTION } from '../../const/config.js';
import AdsDashboardService from '../../services/AdsDashboardService.js';
import Loading from '../Loading/Loading.jsx';
import NotFound from '../Loading/NotFound.jsx';

const AdsDetailsPopup = ({ selectedItem, action }) => {
    const { getAdsDetails, updateKpiAds } = AdsDashboardService();

    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [volume, setVolume] = useState(0);

    const handleClosePopup = () => {
        dispatch(closeViewPopup());
        dispatch(closeEditPopup());
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAdsDetails(selectedItem);
            setData(response);
        };

        if (selectedItem) {
            fetchData();
        }
    }, [selectedItem]);

    useEffect(() => {
        if (data.adsDetails && data.adsDetails.kpi !== undefined) {
            setVolume(parseFloat(data.adsDetails.kpi));
        }
    }, [data.adsDetails]);

    const handleUpdateKpi = async () => {
        await updateKpiAds(selectedItem, volume);
        dispatch(closeEditPopup());
    }


    const titles = [
        'No',
        'Platform',
        'Impressions',
        'Click',
        'CTR',
        'CPC',
        'CPA',
        'Conversions',
        'Conversion Rate',
    ]

    return (
        <div className='fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-slate-300 bg-opacity-70'>
            <div className="flex flex-col bg-white px-14 pt-6 rounded-xl">
                <div className="flex flex-1 justify-between ">
                    <p className='text-2xl font-bold pr-10'>{ADS_ITEM_ACTION.edit ? "Edit Adverstisement KPI" : "View Adverstisement"}</p>
                    <button className='rounded-full hover:bg-red-100'
                        onClick={handleClosePopup}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} color='red' size='2xl' />
                    </button>
                </div>
                {
                    data?.adsDetails ? (
                        <div className='flex justify-center items-center rounded-xl py-4 mt-4 w-full'>
                            <AdsAtribute label='Name: ' content={data?.adsDetails?.name} />
                            <div className="flex flex-col justify-center items-center mx-32">
                                <div>
                                    <Label label='KPI: ' />
                                    {action === ADS_ITEM_ACTION.edit ? (
                                        <>
                                            <input className='w-16 outline-none px-3 border border-[#0095FF] rounded-lg'
                                                type="text" value={volume}
                                                onChange={(e) => setVolume(e.target.value)} />
                                            <div className="flex rounded-lg mx-14 m-2">
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={100}
                                                    step={0.2}
                                                    value={volume}
                                                    onChange={event => {
                                                        setVolume(event.target.valueAsNumber)
                                                    }}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <span>{data?.adsDetails?.kpi}</span>
                                    )}

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center rounded-xl py-4 mt-4 w-full'>
                            <Loading />
                        </div>
                    )
                }

                <div className="flex my-2">
                    <AdsAtribute label='Destination URL: ' content={data?.adsDetails?.destinationUrl} />
                    <AdsAtribute label='Type: ' content={data?.adsDetails?.type} />
                    <AdsAtribute label='Group: ' content={data?.adsDetails?.group} />
                </div>

                <div className="flex flex-col my-2">
                    <AdsAtribute label='Content: ' content={data?.adsDetails?.content} />
                </div>

                <div className="flex my-2">
                    <AdsAtribute label='Created at: ' content={(data?.adsDetails?.createdAt)} />
                    <AdsAtribute className='px-10' label='Updated at: ' content={(data?.adsDetails?.updatedAt)} />
                    <AdsAtribute label='Campaign name: ' content={data?.adsDetails?.campaign} />
                </div>

                <div className="flex flex-col w-full justify-center items-center mt-10 font-bold text-xl">
                    <p>
                        Ads Details on different platforms
                    </p>
                </div>
                {
                    data?.platforms && data?.platforms.length === 0 ? (
                        <div className='flex justify-center items-center p-10'>
                            <NotFound className />
                        </div>
                    ) : (
                        <TableVirtuoso className='flex w-full justify-start items-start mt-4'
                            data={data?.platforms}
                            style={{ height: '250px', width: '100%' }}
                            fixedHeaderContent={() => (
                                <tr className='m-2 w-full'>
                                    {titles.map((item, index) => (
                                        <th className='border-b text-left p-2 bg-white text-[#758191]' key={index}>
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            )}
                            itemContent={(index, item) => (
                                <>
                                    <td className='p-1 w-1/12 border-b'>{index + 1}</td>
                                    <td className='p-1 w-1/12 border-b '>
                                        <p className='px-2 bg-green-200 w-24 rounded-md'>
                                            {item.platform}
                                        </p>
                                    </td>
                                    <td className='p-1 border-b w-1/12'>{item.impressions}</td>
                                    <td className='p-1 border-b w-1/12'>{item.click}</td>
                                    <td className='p-1 border-b w-1/12'>{item.ctr}</td>
                                    <td className='p-1 border-b w-1/12'>{item.cpc}</td>
                                    <td className='p-1 border-b w-1/12'>{item.cpa}</td>
                                    <td className='p-1 border-b w-1/12'>{item.conversions}</td>
                                    <td className='w-1/12 border-b items-center text-center '>
                                        <p className={`px-2 text-white mr-10 ${item.conversionRate > 0.5 ?
                                            "bg-[#0095FF]" : "bg-red-600"} rounded-2xl`}>{item.conversionRate}
                                        </p>
                                    </td>
                                </>
                            )}
                        />
                    )
                }
                {
                    action === ADS_ITEM_ACTION.edit && (
                        <div className='flex flex-row justify-center'>
                            <div className="flex justify-center items-center m-4 mx-10">
                                <button className='bg-[#0095FF] text-white px-4 w-24 py-2 rounded-lg'
                                    onClick={handleUpdateKpi}>
                                    Edit
                                </button>
                            </div>
                            <div className="flex justify-center items-center my-4">
                                <button className='bg-red-600 text-white px-4 py-2 w-24 rounded-lg'
                                    onClick={handleClosePopup}>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdsDetailsPopup;
