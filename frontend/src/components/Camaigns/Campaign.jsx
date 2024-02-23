import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { faMagnifyingGlass, faPlus, faEye, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Campaign = () => {
    const [showEditDelete, setShowEditDelete] =  React.useState(true);
    const handleShowSreach = () => {
    //    
    };
    const handleEdit = (params) => {
    // 
      };
    const handle = (params) => {
    // 
        };
    const columns = [
        {
            field: 'campaignName',
            headerName: 'Campaign Name',
            width: 300,
            // editable: true,
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            width: 200,
            type: 'datetime',
            // editable: true,
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            type: 'datetime',
            width: 200,
            // editable: true,
        },
        {
            field: 'budget',
            headerName: 'Budget',
            type: 'number',
            width: 150,
            // cellClassName: "name-column--cell",
        },
        {
            field: 'group',
            headerName: 'Group',
            type: 'number',
            width: 200,
            // editable: true,
        },
        {
            field: 'advertisements',
            headerName: 'Advertisements',
            type: 'number',
            width: 250,
            // editable: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => {
                return (
                    <Box display="flex" borderRadius="2px" className='items-center'>
                        <button className="flex items-center flex-row bg-[#ffffff] rounded-2xl px-6 py-3 font-bold text-[#00B087] mr-10">
                            <FontAwesomeIcon
                                icon={faEye}
                                size="xl"
                                onClick={() => handleShowSearch(params.row.id)}
                                className='c-[#00B087] p-2'
                            />
                            View
                        </button>
                        <button className="flex flex-row shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white mr-10 h-[15px]">
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                size="xl"
                                onClick={() => handleShowSearch(params.row.id)}
                                className='c-[#B9DD51] p-2'
                            />
                            Edit
                        </button>
                  </Box>
                );
            }

        },
      ];
      
      const rows = [
        { id: 1, campaignName: 'Snow', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 2, campaignName: 'Lannister', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 3, campaignName: 'Lannister', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 4, campaignName: 'Stark', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 5, campaignName: 'Targaryen', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 6, campaignName: 'Melisandre', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 7, campaignName: 'Clifford', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 8, campaignName: 'Frances', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 9, campaignName: 'Roxie', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 1, campaignName: 'Snow', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 2, campaignName: 'Lannister', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 3, campaignName: 'Lannister', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 4, campaignName: 'Stark', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 5, campaignName: 'Targaryen', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 6, campaignName: 'Melisandre', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 7, campaignName: 'Clifford', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14},
        { id: 8, campaignName: 'Frances', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
        { id: 9, campaignName: 'Roxie', startDate: '02/23/2024', endDate: '02/23/2024', budget:5000,group:14, advertisements: 14 },
      ];
    const [startDate, setStartDate] =  React.useState(new Date());
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
                            />
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                size="xl"
                                onClick={handleShowSreach}
                                className='c-[#387DE4]'
                            />
                        </button>
                        <button className="flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] bg-white h-25">
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showIcon
                                toggleCalendarOnIconClick
                                className="ml-3 py-3 w-[120px]"
                            />
                        </button>
                        <button className="flex items-center flex-row px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none border-[#9FC4FC] h-auto ml-3">
                            <p className="justify-center font-bold p-3" >Budget: </p>
                            <select className="selectpicker" data-width="2px" aria-label="None" id="milestoneSelect" name="milestone">
                                <option value="asc">Ascending</option>
                                <option value="desc">Decrease</option>
                            </select>
                        </button>
                        <button className="flex items-center flex-row bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white">
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="xl"
                                onClick={handleShowSreach}
                                className="p-1 c-[#ffffff]"
                            />
                            Create
                        </button>
                    </div>
                </div>
                <div>
                    <Box sx={{ height: 700, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                  paginationModel: {
                                    pageSize: 10,
                                  },
                                },
                              }}
                              pageSizeOptions={[10]}
                        />
                    </Box>
                </div>
            </div>
        </div>
    )
}
export default Campaign
