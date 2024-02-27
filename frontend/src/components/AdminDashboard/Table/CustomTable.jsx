import React, { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown, faBan, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import adminDashboardServvice from '../../../services/adminDashboardServvice';


const CustomTable = () => {
    const titles = ['No', 'Email', 'Name', 'Created At', 'Updated At', 'Status'];

    const initialSortState = titles.map(title => ({ title, direction: null }));

    const [sortState, setSortState] = useState(initialSortState);
    const [data, setData] = useState({ users: [] });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    const { getAllUsers, updateUserStatus } = adminDashboardServvice();

    useEffect(() => {
        async function fetchData() {
            const response = await getAllUsers(page, perPage);
            setData(response);
        }

        fetchData();
    }, [page, perPage]);

    const handleUpdate = async (id, status) => {
        const response = await updateUserStatus(id, status);
        if (response) {
            const updatedData = await getAllUsers(page, perPage);
            setData(updatedData);
        }
    };

    const handleChangeRowsPerPage = (e) => {
        setPage(1);
        setPerPage(e.target.value);
    };


    const toggleSortDirection = (index) => {
        setSortState(prevState =>
            prevState.map((state, i) =>
                i === index
                    ? { ...state, direction: state.direction === 'asc' ? 'desc' : 'asc' }
                    : { ...state, direction: null }
            )
        );
    };

    const sortedData = () => {
        const sortedUsers = [...data.users];
        const sortIndex = sortState.findIndex(state => state.direction !== null);

        if (sortIndex !== -1) {
            const { title, direction } = sortState[sortIndex];
            sortedUsers.sort((a, b) => {
                if (a[title] < b[title]) return direction === 'asc' ? -1 : 1;
                if (a[title] > b[title]) return direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return sortedUsers;
    };

    return (
        <div className='flex flex-1 flex-col p-4 justify-center items-end w-full'>
            <table className='border-b rounded-xl w-full text-base'>
                <thead>
                    <tr>
                        {titles.map((item, index) => (
                            <th className='border-b text-left py-2 text-[#96A5B8]' key={index}>
                                {item}
                                <button className='mx-2' onClick={() => toggleSortDirection(index)}>
                                    {sortState[index]?.direction === 'asc' ? (
                                        <FontAwesomeIcon icon={faArrowUp} />
                                    ) : (
                                        <FontAwesomeIcon icon={faArrowDown} />
                                    )}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData().map((item, index) => (
                        <tr className='border-b items-start' key={index}>
                            <td>{index + 1}</td>
                            <td>{item.email}</td>
                            <td>{item.name}</td>
                            <td>{item.created_at}</td>
                            <td>{item.updated_at}</td>
                            <td>
                                <div className={`progress-bar text-xl flex items-center justify-start mr-4 my-2 rounded-2xl`}>
                                    <div className={`progress rounded-2xl flex justify-center 
                                                        ${item.status === 0 ? "bg-[#0095FF]" : "bg-red-600"} `}>
                                        <button className='px-2 text-white' onClick={() => handleUpdate(item.id, item.status === 0 ? 1 : 0)}>
                                            {item.status === 0 ? (
                                                <FontAwesomeIcon icon={faBan} />
                                            ) : (
                                                <FontAwesomeIcon icon={faUnlock} />
                                            )}
                                        </button>

                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <p className='mr-20 opacity-70'>Total result: {data?.pagination?.total_result}</p>
                <div className="flex justify-center items-center mx-10">
                    <label className='opacity-80'>Rows per page</label>
                    <select
                        className='border rounded-xl p-2 px-4 mx-2 bg-slate-100'
                        onChange={handleChangeRowsPerPage}
                    >
                        <option value={5}>5</option>
                        <option value={7}>7</option>
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
                        {page} of {data?.pagination?.total_pages}
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
        </div >
    );
};

export default CustomTable;
