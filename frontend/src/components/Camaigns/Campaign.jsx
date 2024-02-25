import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampaignService from '../../services/CampaignService';
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { faMagnifyingGlass, faPlus, faEye, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from 'react-paginate';
import '../../../src/pagination.css';

const Campaign = () => {
    const { campaigns } = CampaignService();
    const [startDate, setStartDate] = React.useState(null);
    const [dataCampaigns, setDataCampaigns] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCampaign, setTotalCampaign] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [budgetSort, setBudgetSort] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(true);

    useEffect(() => {
        if (isSearchClicked) {
            fetchData();
            setIsSearchClicked(false);
        }
    }, [currentPage, searchTerm, startDate, budgetSort, isSearchClicked]);
    
    const fetchData = async () => {
    try {
        const data = await campaigns.getCampaignData(currentPage, searchTerm, startDate, budgetSort);
        if (data.total > 0) {
            setDataCampaigns(data.data);
            setPageCount(data.total_pages);
            setTotalCampaign(data.total);
        } else {
            console.log("Campaign not found");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setIsSearchClicked(true);
    };

    const handleBudgetSortChange = (event) => {
        setBudgetSort(event.target.value);
        setIsSearchClicked(true);
    };

    const handleSearch = () => {
        setIsSearchClicked(true);
    };

    const handleShowSreach = () => {
        fetchData();
    };
    const [showEditDelete, setShowEditDelete] =  React.useState(true);

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
            // editable: true,
        },
        {
            field: 'start_date',
            headerName: 'Start Date',
            width: 160,
            type: 'datetime',
            // editable: true,
            renderCell: (params) => {
                const startDate = new Date(params.row.start_date);
                const parts = startDate.toISOString().split('T')[0].split('-'); 
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return formattedDate;
            },
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            type: 'datetime',
            width: 160,
            renderCell: (params) => {
                const startDate = new Date(params.row.start_date);
                const parts = startDate.toISOString().split('T')[0].split('-'); 
                const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                return formattedDate;
            },
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
        },
        {
            field: 'total_group',
            headerName: 'Group',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            // editable: true,
        },
        {
            field: 'total_ads',
            headerName: 'Advertisements',
            type: 'number',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            // editable: true,
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
                    <button className="flex items-center flex-row justify-around shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#00B087] bg-[#98EEDA] mr-10 h-[18px] w-[85px]">
                    <FontAwesomeIcon
                        icon={faEye}
                        size="xl"
                        // onClick={() => handleShowSearch(params.row.id)}
                        className='c-[#00B087] p-2'
                    />
                    View
                    </button>
                    <button className="flex items-center flex-row justify-around shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#B9DD51] bg-[#EAF79A] mr-10 h-[18px] w-[80px]">
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="xl"
                        // onClick={() => handleShowSearch(params.row.id)}
                        className='c-[#B9DD51] p-2'
                    />
                    <p>Edit</p>
                    </button>
                </Box>
                );
            }
        },
      ];
      
    return (
        <div className='flex justify-center'>
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
                    <button className="flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white h-25">
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            showIcon
                            toggleCalendarOnIconClick
                            className="ml-3 py-3 w-[120px] focus:outline-none focus:border-none"
                            placeholderText="24/02/2023"
                        />
                    </button>
                    <button className="flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] h-auto ml-3">
                        <p className="justify-center font-bold p-3">Budget: </p>
                        <select
                            className="selectpicker focus:outline-none focus:border-none bg-white"
                            data-width="2px"
                            aria-label="None"
                            id="sort"
                            name="sort-budget"
                            value={budgetSort}
                            onChange={handleBudgetSortChange}
                        >
                            <option value="">Default</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Decrease</option>
                        </select>
                    </button>
                        <button className="flex items-center flex-row bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white">
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="xl"
                                // onClick={handleShowSreach}
                                className="p-1 c-[#ffffff]"
                            />
                            Create
                        </button>
                    </div>
                </div>
                <div>
                    <Box sx={{ height: 620, width: '100%' }}>
                    <DataGrid
                        rows={dataCampaigns}
                        columns={columns}
                        hideFooter= {true}
                        className = 'flex items-center flex-row'
                        />
                    </Box>
                </div>
                <p className='text-lg my-1 text-[#387DE4]'>Total: {totalCampaign} row</p>
                <div className='flex items-center justify-center'>
                    <ReactPaginate
                        breakLabel="..."  
                        nextLabel=" >> "  
                        onPageChange={handlePageClick}  
                        Displayed Page Range = {5}  
                        pageCount={pageCount}  
                        previousLabel=" << "  
                        renderOnZeroPageCount={null} 
                        containerClassName="pagination"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        previousLinkClassName="page-link"
                        className='flex items-center flex-row h-[50px]'  
                    />
                </div>
            </div>
        </div>
    )
}
export default Campaign
