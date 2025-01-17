import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampaignService from '../../services/CampaignService';
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { faMagnifyingGlass, faPlus, faEye, faPenToSquare, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from 'react-paginate';
import '../../../src/pagination.css';
import { formatDateString } from '../../utility/formatdate';
import Popup from 'reactjs-popup';
import CreateCampaign from '../Campaigns/CreateCampaign/CreateCampaign'
import EditCampaign from '../Campaigns/EditCampaign/EditCampaign'
import Loading from '../Loading/Loading'

const Campaign = () => {
    const { campaigns } = CampaignService();
    const [filter, setFilter] = useState({
        startDate: null,
        pageCount: 0,
        currentPage: 0,
        totalCampaign: 0,
        searchTerm: '',
        budgetSort: ''
    });
    const [dataCampaigns, setDataCampaigns] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(true);

    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [filter, isSearchClicked]);

    const fetchData = async () => {
        try {
            const data = await campaigns.getCampaignData(filter.currentPage, filter.searchTerm, filter.startDate, filter.budgetSort);
            if (data.total > 0) {
                setDataCampaigns(data.data);
                setFilter(prevFilter => ({ ...prevFilter, pageCount: data.total_pages, totalCampaign: data.total }));
            } else {
                setDataCampaigns([]);
                setFilter(prevFilter => ({ ...prevFilter, pageCount: 0, totalCampaign: 0 }));
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
        setFilter(prevFilter => ({ ...prevFilter, searchTerm: event.target.value }));
    };

    const handleStartDateChange = (date) => {
        setFilter(prevFilter => ({ ...prevFilter, startDate: date, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleBudgetSortChange = (event) => {
        setFilter(prevFilter => ({ ...prevFilter, budgetSort: event.target.value, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleSearch = () => {
        setFilter(prevFilter => ({ ...prevFilter, currentPage: 0 }));
        setIsSearchClicked(true);
    };

    const handleShowSreach = () => {
        fetchData();
    };
    const [showEditDelete, setShowEditDelete] = React.useState(true);

    const handleEdit = (params) => {
        // 
    };
    const handle = (params) => {
        // 
    };
    const columns = [
        {
            field: 'campaign_name',
            headerName: 'Campaign Name',
            width: 380,
            sortable: true,
            // editable: true,
        },
        {
            field: 'start_date',
            headerName: 'Start Date',
            width: 160,
            type: 'datetime',
            // editable: true,
            renderCell: (params) => {
                const formattedDate = formatDateString(params.row.start_date);
                return formattedDate;
            },
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            type: 'datetime',
            width: 160,
            renderCell: (params) => {
                const formattedDate = formatDateString(params.row.end_date);
                return formattedDate;
            },
            sortable: true,
            // editable: true,
        },
        {
            field: 'budget',
            headerName: 'Budget',
            type: 'number',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            // cellClassName: "name-column--cell",
            valueFormatter: (params) => {
                return Number(params.value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
            sortable: true,
        },
        {
            field: 'total_group',
            headerName: 'Group',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            sortable: true,
        },
        {
            field: 'total_ads',
            headerName: 'Advertisements',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            // editable: true,
            sortable: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            align: 'right',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Box display="flex" borderRadius="2px" className='items-center'>
                        <button className="flex items-center flex-row justify-around font-bold shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#00E096] bg-[#DCFCE7] mr-10 h-[18px] w-[82px]">
                            <FontAwesomeIcon
                                icon={faEye}
                                size="xl"
                                // onClick={() => handleShowSearch(params.row.id)}
                                className='p-2'
                            />
                            View
                        </button>
                        <Popup
                            trigger={<button className="flex items-center flex-row justify-around font-bold shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#FFA800] bg-[#FFF4DE] mr-10 h-[18px] w-[80px]">
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    size="xl"
                                    className='p-2'
                                />
                                <p>Edit</p>
                            </button>}
                            modal
                            nested
                            style='height: 80%, width: 85%'
                            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            {close => (
                                <div className="modal flex flex-row  ml-[120px] p-[20px]">
                                    <button className="modal__close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className='h-[85%] w-[1200px]'>
                                        <EditCampaign
                                            id={params.row.id} />
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </Box>
                );
            }
        },
    ];

    return (
        <div className='flex justify-center p-6 h-[90%]'>
            <div className='flex flex-col rounded-3xl border-2 border-gray-300 shadow-lg w-full'>
                <div className="flex flex-row items-center justify-between p-4 h-[150px]">
                    <div className="w-1/5 flex flex-col">
                        <p className='text-lg font-bold'>All Campaigns</p>
                        <p style={{ color: '#16C098' }} className='text-black opacity-70 font-medium text-sm'>Your Campaigns</p>
                    </div>
                    <div className="w-4/5 flex flex-row justify-between h-[40px]">
                        <button className="flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white h-auto">
                            <input
                                type="text"
                                placeholder="Search here..."
                                id="name_campaign"
                                name="name_campaign"
                                onChange={handleSearchChange}
                                className="focus:outline-none focus:border-none"
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                size="xl"
                                onClick={handleSearch}
                                className='c-[#387DE4]'
                            />
                        </button>
                        <div className="flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white h-auto">
                            <DatePicker
                                selected={filter.startDate}
                                onChange={handleStartDateChange}
                                className="focus:outline-none focus:border-none"
                                placeholderText="24/02/2023"
                            />
                            <FontAwesomeIcon
                                icon={faCalendar}
                                size="xl"
                                className='c-[#387DE4]'
                            />
                        </div>
                        <button className="flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] h-auto ml-3">
                            <p className="justify-center font-bold p-3">Budget: </p>
                            <select
                                className="selectpicker focus:outline-none focus:border-none bg-white"
                                data-width="2px"
                                aria-label="None"
                                id="sort"
                                name="sort-budget"
                                value={filter.budgetSort}
                                onChange={handleBudgetSortChange}
                            >
                                <option value="">Default</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Decrease</option>
                            </select>
                        </button>
                        <Popup
                            trigger={<button className="flex items-center flex-row bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    size="xl"
                                    // onClick={handleShowSreach}
                                    className="p-1 c-[#ffffff]"
                                />
                                Create
                            </button>}
                            modal
                            nested
                            style='height: 80%, width: 85%'
                            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                        >
                            {close => (
                                <div className="modal flex flex-row  ml-[120px] p-[20px]">
                                    <button className="modal__close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className='h-[85%] w-[1200px]'>
                                        <CreateCampaign />
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>

                <div style={{ height: '100vh', width: '100%' }}>
                    {dataCampaigns ? (
                        <Box style={{ height: '100%', width: '100%' }}>
                            <DataGrid
                                rows={dataCampaigns}
                                columns={columns}
                                hideFooter={true}
                                className='flex items-center flex-row'
                            />
                        </Box>
                    ) : (
                        <Box style={{ height: '100%', width: '100%' }}>
                            <Loading />
                        </Box>
                    )}
                </div>
                <div className='flex flex-row'>
                    <p className='w-4/5 text-lg my-1 text-[#387DE4] ml-6 p-4'>Total: {filter.totalCampaign} row</p>
                    <div className='w-1/5 flex items-center justify-end'>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=" >> "
                            onPageChange={handlePageClick}
                            Displayed Page Range={5}
                            pageCount={filter.pageCount}
                            previousLabel=" << "
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageClassName="page-item"
                            activeClassName="active"
                            previousClassName="page-item"
                            nextClassName="page-item"
                            breakClassName="page-item"
                            className='flex items-center flex-row h-[50px]'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Campaign
