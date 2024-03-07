import { useEffect, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { openViewPopup, openEditPopup } from '../../../redux/actions/showPopup';

import AdsDashboardService from '../../../services/AdsDashboardService';
import { ADS_ITEM_ACTION, DEFAULT_ADS_PER_PAGE, PER_PAGE } from '../../../const/config';
import NotFound from '../../Loading/NotFound';
import AdsDetailsPopup from '../../AdsDetails.jsx/AdsDetailsPopup';

const VizualizedTable = ({ filter, initSort }) => {
    const dispatch = useDispatch();
    const isViewPopupOpen = useSelector(state => state.popup.isShowViewPopup);
    const isEditPopupOpen = useSelector(state => state.popup.isShowEditPopup);

    const { getAllAds } = AdsDashboardService();
    const titles = ['No', 'Name', 'Content', 'KPI', 'Created At', 'Updated At', 'Status', 'Action'];

    const initialSortState = titles.map(title => ({ title, direction: null }));

    const [sortState, setSortState] = useState(initialSortState);
    const [actionClickState, setActionClickState] = useState(new Array(10).fill(false));

    const [data, setData] = useState({ ads: [] });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(DEFAULT_ADS_PER_PAGE);

    const sortLabel = ['id', 'ad_name', 'ad_content', 'kpi', 'created_at', 'updated_at', 'status'];

    const [sort, setSort] = useState(initSort);

    useEffect(() => {
        setPage(1);
        setSort(initSort);
    }, [filter, initSort]);

    const handleChangeRowsPerPage = (e) => {
        setPage(1);
        setPerPage(e.target.value);
    };

    const toggleSortDirection = (index) => {
        setSort({ sort: sortLabel[index], direction: sortState[index].direction === 'asc' ? 'desc' : 'asc' });
        setPage(1);
        setSortState(prevState =>
            prevState.map((state, i) =>
                i === index
                    ? { ...state, direction: state.direction === 'asc' ? 'desc' : 'asc' }
                    : { ...state, direction: null }
            )
        );
    };

    useEffect(() => {
        async function fetchData() {
            const response = await getAllAds(page, perPage, sort, filter);
            setData(response);
        }
        fetchData();
    }, [page, perPage, sort, filter]);


    const toggleActionMenu = (index) => {
        setActionClickState(prevState =>
            prevState.map((state, i) =>
                i === index ? !state : false
            )
        );
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewClick = (item) => {
        setActionClickState(new Array(10).fill(false));
        setSelectedItem(item);
        dispatch(openViewPopup(true));
    };

    const handleEditClick = (item) => {
        setActionClickState(new Array(10).fill(false));
        setSelectedItem(item);
        dispatch(openEditPopup(true));
    };

    return (
        <div className="flex flex-1 flex-col p-4 text-base justify-start items-start w-full">
            {data?.ads?.length > 0 ? (
                <TableVirtuoso className='flex w-full justify-start items-start'
                    data={data.ads}
                    style={{ height: '500px' }}
                    fixedHeaderContent={() => (
                        <tr className='m-2'>
                            {titles.map((item, index) => (
                                <th className='border-b text-left p-2 bg-white text-[#758191]' key={index}>
                                    {item}
                                    {item !== 'Action' && item !== "No" && (
                                        <button className='mx-3' onClick={() => toggleSortDirection(index)}>
                                            {sortState[index]?.direction === 'asc' ? (
                                                <FontAwesomeIcon icon={faArrowUp} size='sm' />
                                            ) : (
                                                <FontAwesomeIcon icon={faArrowDown} size='sm' />
                                            )}
                                        </button>
                                    )}
                                </th>
                            ))}
                        </tr>
                    )}
                    itemContent={(index, item) => (
                        <>
                            <td className='p-2 border-b'>{index + 1}</td>
                            <td className='p-2 w-1/6 border-b'>{item.name}</td>
                            <td className='p-2 border-b w-2/5'>{item.content}</td>
                            <td className='w-1/12 border-b items-center text-center '>
                                <p className={`px-2 text-white mr-10 ${item.kpi > 50 ? "bg-[#0095FF]" : "bg-red-600"} rounded-2xl`}>{item.kpi}</p>
                            </td>
                            <td className='p-2 w-1/12 border-b'>{item.created_at}</td>
                            <td className='p-2 border-b'>{item.updated_at}</td>
                            <td className='border-b pl-4'>{item.status}</td>
                            <td className='pl-6 m-2 border-b'>
                                <FontAwesomeIcon icon={faEllipsisVertical} size='sm' className='cursor-pointer' onClick={() => toggleActionMenu(index)} />
                                {actionClickState[index] && (
                                    <div className='absolute bg-white right-0 shadow-lg rounded-xl p-3'>
                                        <p className='cursor-pointer hover:bg-slate-100 p-2 rounded-xl' onClick={() => handleViewClick(item)}>View</p>
                                        <p className='cursor-pointer hover:bg-slate-100 p-2 rounded-xl' onClick={() => handleEditClick(item)}>Edit</p>
                                    </div>
                                )}
                            </td>
                            <td>

                                {isViewPopupOpen && (
                                    <AdsDetailsPopup selectedItem={selectedItem} action={ADS_ITEM_ACTION.view} />
                                )}

                                {isEditPopupOpen && (
                                    <AdsDetailsPopup selectedItem={selectedItem} action={ADS_ITEM_ACTION.edit}/>
                                )}
                            </td>
                        </>
                    )}
                />
            ) : (
                <NotFound />
            )}
            <div className="flex justify-between items-center mt-4 w-full">
                <div className='flex items-center justify-end w-full'>
                    <p className='mr-20 opacity-70'>Total result: {data?.pagination?.total_result}</p>
                    <div className="flex justify-center items-center mx-10">
                        <label className='opacity-80'>Rows per page</label>
                        <select
                            value={perPage}
                            className='border rounded-xl p-2 px-4 mx-2 bg-slate-100'
                            onChange={handleChangeRowsPerPage}
                        >
                            {
                                PER_PAGE.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        {(page - 1) > 0 ? (
                            <button
                                className='bg-[#0095FF] text-white rounded-xl px-4 py-2 m-2'
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                        ) : (
                            <button
                                className='bg-slate-300 text-black rounded-xl px-4 py-2 m-2'
                                disabled
                            >
                                Previous
                            </button>
                        )}
                        <p className='opacity-70 text-base'>
                            {page} of {data?.pagination?.total_pages ? data?.pagination?.total_pages : 1}
                        </p>

                        {(page + 1) <= data?.pagination?.total_pages ? (

                            <button
                                className='bg-[#0095FF] text-white rounded-xl px-4 py-2 m-2'
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className='bg-slate-300 text-black rounded-xl px-4 py-2 m-2'
                                disabled
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VizualizedTable;
