import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GroupService from '../../services/GroupService';
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { faMagnifyingGlass, faFilterCircleXmark, faEye } from '@fortawesome/free-solid-svg-icons'
import { ADS_STATUS, BIDDING_STRATEGY, SORT } from '../../const/config';
import { Button, Paginate, Status } from "../Component/Component";
import GroupDetail from './ShowGroup/GroupDetail';
import Loading from '../Loading/Loading';
import Popup from 'reactjs-popup';

const Group = () => {
    const statusData = ADS_STATUS;
    const biddingData = BIDDING_STRATEGY;
    const sortData = Object.keys(SORT);
    const { groups } = GroupService();
    const [filter, setFilter] = useState({
        pageCount: 0,
        currentPage: 0,
        totalGroup: 0,
        search: '',
        bidding: '',
        status: '',
        totalSort: ''
    });

    const [dataGroups, setDataGroups] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    const [isShow, setIsShow] = useState(true);
    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
        const handleResize = () => {
            setIsShow(window.innerWidth > 1400);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [filter, isSearchClicked]);

    const fetchData = async () => {
        try {
            const data = await groups.getGroupData(filter.currentPage, filter.search, filter.bidding, filter.status, filter.totalSort);
            if (data.total > 0) {
                const dataGroups = data.groups.map(group => ({
                    id: group.id,
                    adgroup_name: group.adgroup_name,
                    campaign_id: group.campaign_id,
                    bidding_strategy: group.bidding_strategy,
                    ad_schedule: group.ad_schedule,
                    target_keywords: group.target_keywords,
                    status: group.status,
                    total_advertisement: group.total_advertisement,
                    campaign_name: group.campaign?.campaign_name,
                }));
                setDataGroups(dataGroups);
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalGroup: data.total }));
            } else {
                setDataGroups([]);
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalGroup: 0 }));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageClick = (selectedPage) => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };

    const handleSearchChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, search: event.target.value }));
    };

    const handleBiddingChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, bidding: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleStatusChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, status: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleTotalSortChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, totalSort: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleSearch = () => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleClearFilter = () => {
        setFilter({
            pageCount: 0,
            currentPage: 0,
            totalGroup: 0,
            search: '',
            bidding: '',
            status: '',
            totalSort: ''
        });
        setIsSearchClicked(true);
    };

    const columns = [
        {
            field: 'adgroup_name',
            headerName: 'Group Name',
            width: isShow ? 380 : 250,
            sortable: true,
        },
        {
            field: 'campaign_name',
            headerName: 'Campaign Name',
            width: isShow ? 280 : 160,
            sortable: true,
        },
        {
            field: 'bidding_strategy',
            headerName: 'Bidding Strategy',
            width: isShow ? 160 : 80,
            sortable: true,
        },
        {
            field: 'target_keywords',
            headerName: 'Target Keywords',
            width: isShow ? 200 : 120,
            headerAlign: 'center',
            align: 'center',
            sortable: true,
        },
        {
            field: 'total_advertisement',
            headerName: 'Advertisements',
            type: 'number',
            width: isShow ? 150 : 100,
            align: 'center',
            headerAlign: 'center',
            sortable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: isShow ? 160 : 100,
            align: isShow ? 'right' : 'left',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Status value={params.value} className="justify-center" />
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: isShow ? 160 : 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Popup
                        trigger={<Box display="flex" borderRadius="2px" className='items-center'>
                            <FontAwesomeIcon
                                icon={faEye}
                                size="xl"
                                color='#387DE4'
                            />
                        </Box>}
                        modal
                        nested
                        style='height: 100%, width: 95%'
                        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                    >
                        {close => (
                            <div className="modal flex flex-row">
                                <button className="modal__close" onClick={close}>
                                    &times;
                                </button>
                                <div className={`h-[100%] ${isShow ? "w-[100%]" : ""}`}>
                                    <GroupDetail
                                        id={params.row.id} />
                                </div>
                            </div>
                        )}
                    </Popup>
                );
            }
        },
    ];

    return (
        <div className='flex justify-center p-6 h-[90%]'>
            <div className='flex flex-col rounded-3xl border-2 border-white shadow-lg w-full'>
                <div className="flex flex-row items-center justify-between p-4 h-[150px]">
                    <div className={`${isShow ? "w-1/5" : "w-1/7"} flex flex-col`}>
                        <p className='text-lg font-bold'>All Groups</p>
                        <p style={{ color: '#16C098' }} className='text-black opacity-70 font-medium text-sm'>Your Groups</p>
                    </div>
                    <div className={`${isShow ? "w-4/5" : "w-6/7"} flex flex-row justify-between h-[40px]`}>
                        <button className={`flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white h-auto ${isShow ? "" : "w-[180px]"}`}>
                            <input
                                type="text"
                                placeholder="Search here..."
                                id="name_Group"
                                name="name_Group"
                                value={filter.search}
                                onChange={handleSearchChange}
                                className={`focus:outline-none focus:border-none ${isShow ? "" : "w-[130px]"}`}
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                size="xl"
                                onClick={handleSearch}
                                className='c-[#387DE4]'
                            />
                        </button>
                        {isShow ? null : <div className="ml-4"></div>}
                        <Button
                            name='bidding'
                            title='Bidding Strategy:'
                            value={filter.bidding}
                            onChange={handleBiddingChange}
                            title1='All Bidding'
                            data={biddingData?.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                            className1={isShow ? "" : "w-[180px]"}
                            className2={isShow ? "" : "w-[80px] ml-2"}
                        />
                        {isShow ? null : <div className="ml-4"></div>}
                        <Button
                            name='status'
                            title='Status:'
                            value={filter.status}
                            onChange={handleStatusChange}
                            title1='All Status'
                            data={statusData?.map((item, index) => (
                                <option key={index} value={index}>{item}</option>
                            ))}
                            className1={isShow ? "" : "w-[150px]"}
                            className2={isShow ? "" : "w-[60px] ml-2"}
                        />
                        {isShow ? null : <div className="ml-4"></div>}
                        <Button
                            name='sort_total'
                            title='Total Ads:'
                            value={filter.budgetSort}
                            onChange={handleTotalSortChange}
                            title1='Default'
                            data={sortData.map((key, index) => (
                                <option key={index} value={SORT[key]}>{key}</option>
                            ))}
                            className1={isShow ? "" : "w-[150px]"}
                            className2={isShow ? "" : "w-[60px] ml-2"}
                        />
                        <button className="mx-4 mr-20" onClick={handleClearFilter}>
                            <FontAwesomeIcon icon={faFilterCircleXmark} color={'#387DE4'} size='xl' />
                        </button>
                    </div>
                </div>
                <div>
                    {dataGroups ? (
                        <Box sx={{ height: '598px', width: '100%', padding: '10px', marginRight: '10px' }}>
                            <DataGrid
                                rows={dataGroups}
                                columns={columns}
                                hideFooter={true}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ height: '100%', width: '100%' }}>
                            <Loading />
                        </Box>
                    )}
                </div>
                <div className='flex flex-row'>
                    <p className='w-4/5 text-lg my-1 text-[#387DE4] ml-6 p-4'>Total: {filter.totalGroup} row</p>
                    <Paginate className='w-1/5' handlePageClick={handlePageClick} pageCount={filter.pageCount} />
                </div>
            </div>
        </div >
    )
}
export default Group
