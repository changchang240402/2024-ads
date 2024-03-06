import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import { closeViewPopup, closeEditPopup } from '../../redux/actions/showPopup.js';
import { useState } from 'react';
import Label from '../Label/Label.jsx';
import { TableVirtuoso } from 'react-virtuoso';
import AdsAtribute from '../Ads/AdsAtribute/AdsAtribute.jsx';
import { formatDateString } from '../../utility/formatdate.js';
import { ADS_ITEM_ACTION } from '../../const/config.js';

const AdsDetailsPopup = ({ action }) => {
    const dispatch = useDispatch();

    const handleClosePopup = () => {
        dispatch(closeViewPopup());
        dispatch(closeEditPopup());
    }


    const selectedItem = {
        name: 'Ad 1 Content 1 asd fasd',
        content: 'Illo alias omnis quis enim dolore iure. Quia adipisci ut ipsum.',
        kpi: '0.5',
        type: 'video',
        destinationUrl: 'https://www.google.com',
        status: 'active',
        createdAt: '2021-10-12T13:00:00.000Z',
        updatedAt: '2021-10-12T13:00:00.000Z',
        group: 'group 1',
        campaign: 'campaign 1',
    }

    const adsDetails = [
        {
            platform: 'Facebook',
            impressions: 31440,
            click: '0.5',
            ctr: '12323',
            cpc: '0.52',
            cpa: '123',
            conversions: '154',
            conversionRate: '12.4',
        },
        {
            platform: 'Youtube',
            impressions: 31440,
            click: '0.5',
            ctr: '123123',
            cpc: '0.52',
            cpa: '12312',
            conversions: '154',
            conversionRate: '12.4',
        },
        {
            platform: 'Google',
            impressions: 31440,
            click: '0.5',
            ctr: '42000',
            cpc: '0.52',
            cpa: '12213',
            conversions: '20000',
            conversionRate: '97.8',
        },
        {
            platform: 'Tiktok',
            impressions: 31440,
            click: '0.5',
            ctr: '10000',
            cpc: '0.52',
            cpa: '13212',
            conversions: '1000',
            conversionRate: '0.54',
        },

    ]

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

    const [volume, setVolume] = useState(selectedItem?.kpi * 100);

    return (
        <div className='fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-slate-400 bg-opacity-10'>
            <div className="flex flex-col bg-white px-14 pt-6 rounded-xl">
                <div className="flex flex-1 justify-between ">
                    {
                        action === ADS_ITEM_ACTION.edit ? (
                            <p className='text-2xl font-bold pr-10'>Edit Adverstisement</p>
                        ) : (
                            <p className='text-2xl font-bold pr-10'>View Adverstisement</p>
                        )
                    }
                    <button className='rounded-full hover:bg-red-100'
                        onClick={handleClosePopup}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} color='red' size='2xl' />
                    </button>
                </div>
                <div className='flex justify-center items-center rounded-xl py-4 mt-4 w-full'>
                    <AdsAtribute label='Name: ' content={selectedItem?.name} />
                    <div className="flex flex-col justify-center items-center mx-32">
                        <div>
                            <Label label='KPI: ' />
                            {action === ADS_ITEM_ACTION.edit ? (
                                <>
                                    <input className='w-16 outline-none px-3 border border-[#0095FF] rounded-lg' type="text" value={volume} onChange={(e) => setVolume(e.target.value)} />
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
                                <span>{selectedItem.kpi * 100}</span>


                            )}

                        </div>
                    </div>
                </div>

                <div className="flex my-2">
                    <AdsAtribute label='Destination URL: ' content={selectedItem?.destinationUrl} />
                    <AdsAtribute label='Type: ' content={selectedItem?.type} />
                    <AdsAtribute label='Group: ' content={selectedItem?.group} />
                </div>

                <div className="flex flex-col my-2">
                    <AdsAtribute label='Content: ' content={selectedItem?.content} />
                </div>

                <div className="flex my-2">
                    <AdsAtribute label='Created at: ' content={formatDateString(selectedItem?.createdAt)} />
                    <AdsAtribute className='px-10' label='Updated at: ' content={formatDateString(selectedItem?.updatedAt)} />
                    <AdsAtribute label='Campaign name: ' content={selectedItem?.campaign} />
                </div>

                <div className="flex flex-col w-full justify-center items-center mt-10 font-bold text-xl">
                    <p>
                        Ads Details on different platforms
                    </p>
                </div>
                <TableVirtuoso className='flex w-full justify-start items-start mt-4'
                    data={adsDetails}
                    style={{ height: '250px', width: '100%' }}
                    fixedHeaderContent={() => (
                        <tr className='m-2'>
                            {titles.map((item, index) => (
                                <th className='border-b text-left p-2 bg-white text-[#758191]' key={index}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    )}
                    itemContent={(index, item) => (
                        <>
                            <td className='p-1 border-b'>{index + 1}</td>
                            <td className='p-1 w-1/12 border-b'>{item.platform}</td>
                            <td className='p-1 border-b w-1/12'>{item.impressions}</td>
                            <td className='p-1 border-b w-1/12'>{item.click}</td>
                            <td className='p-1 border-b w-1/12'>{item.ctr}</td>
                            <td className='p-1 border-b w-1/12'>{item.cpc}</td>
                            <td className='p-1 border-b w-1/12'>{item.cpa}</td>
                            <td className='p-1 border-b w-1/12'>{item.conversions}</td>
                            <td className='w-4/5 border-b items-center text-center '>
                                <p className={`px-2 text-white mr-10 ${item.conversionRate > 0.5 ?
                                    "bg-[#0095FF]" : "bg-red-600"} rounded-2xl`}>{item.click}</p>
                            </td>
                        </>
                    )}
                />
                {
                    action === ADS_ITEM_ACTION.edit && (
                        <div className='flex flex-row justify-center'>
                            <div className="flex justify-center items-center m-4 mx-10">
                                <button className='bg-[#0095FF] text-white px-4 w-24 py-2 rounded-lg'>Edit</button>
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
