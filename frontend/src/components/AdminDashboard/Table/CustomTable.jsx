import React, { useEffect, useState } from 'react';
import { faArrowUp, faArrowDown, faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import Loading from '../../Loading/Loading';
import adminDashboardServvice from '../../../services/adminDashboardServvice';
import { USER_PER_PAGE, DEFAULT_USER_PER_PAGE } from '../../../const/config';
import NotFound from '../../Loading/NotFound';

const CustomTable = ({ filter }) => {
    const dispathch = useDispatch();

    const titles = ['No', 'Email', 'Name', 'Created At', 'Updated At', 'Status', 'Action'];

    const initialSortState = titles.map(title => ({ title, direction: null }));

    const [sortState, setSortState] = useState(initialSortState);

    const [data, setData] = useState({ users: [] });
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(DEFAULT_USER_PER_PAGE);

    const sortLabel = ['id', 'email', 'name', 'created_at', 'updated_at', 'status'];
    const [sort, setSort] = useState({
        sort: 'id',
        direction: 'asc',
    });

    const { getAllUsers, updateUserStatus } = adminDashboardServvice();

    useEffect(() => {
        async function fetchData() {
            const response = await getAllUsers(page, perPage, sort, filter);
            setData(response);
        }
        fetchData();
    }, [page, perPage, sort, filter]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    const handleUpdate = async (id, status) => {
        const response = await updateUserStatus(id, status);
        if (response) {
            const updatedData = await getAllUsers(page, perPage, sort, filter);
            setData(updatedData);
        }
    };

    const handleChangeRowsPerPage = (e) => {
        setPage(1);
        setPerPage(e.target.value);
        dispathch()
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

    return (
        <div className='flex flex-1 flex-col p-4 justify-center items-center w-full'>
            {data?.users?.length > 0 ? (
                <table className='border-b rounded-xl w-full text-base'>
                    <thead>
                        <tr>
                            {titles.map((item, index) => (
                                <th className='border-b text-left py-2 text-[#758191]' key={index}>
                                    {item}
                                    {item !== 'Action' && item !== "No" && (
                                        <button className='mx-2' onClick={() => toggleSortDirection(index)}>
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
                    </thead>
                    <tbody>
                        {data.users.map((item, index) => (
                            <tr className='border-b items-start' key={index}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.created_at}</td>
                                <td>{item.updated_at}</td>
                                <td>{item.status === 0 ? 'Active' : 'Baned'}</td>
                                <td className='pl-3'>
                                    <div className={`progress-bar text-xl flex items-center justify-start mr-4 my-2 rounded-2xl`}>
                                        <div className={`progress rounded-2xl flex justify-center
                                                        ${item.status === 1 ? "bg-[#0095FF]" : "bg-red-600"} `}>
                                            <button className='px-2 text-white' onClick={() => handleUpdate(item.id, item.status === 0 ? 1 : 0)}>
                                                {item.status === 1 ? (
                                                    <FontAwesomeIcon icon={faUnlock} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faLock} />
                                                )}
                                            </button>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <NotFound />
            )}

            <div className="flex justify-between items-center mt-4 w-full">
                <div className='flex items-center justify-end w-full'>
                    <p className='mr-20 opacity-70'>Total result: {data?.pagination?.total_result}</p>
                    <div className="flex justify-center items-center mx-10">
                        <label className='opacity-80'>Rows per page</label>
                        <select
                            className='border rounded-xl p-2 px-4 mx-2 bg-slate-100'
                            onChange={handleChangeRowsPerPage}
                        >
                            {
                                USER_PER_PAGE.map((item, index) => (
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
            </div>
        </div >
    );
};

export default CustomTable;
