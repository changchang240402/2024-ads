import React, { useState, useEffect } from 'react';
import logo from "../../../assets/ggads.png";
import { Detail, Paginate, Status, Kpi } from "../../Component/Component";
import GroupService from '../../../services/GroupService';
import { formatDate } from '../../../utility/formatdate';
import Loading from '../../Loading/Loading';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const GroupDetail = ({ id }) => {
    const { groupDetail } = GroupService();
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    const [group, setGroup] = useState({
        detail: {},
        total_ads: 0,
        ads: [],
        currentPage: 0,
        pageCount: 0,
    });
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
    }, [id, group, isSearchClicked]);
    const fetchData = async () => {
        try {
            const data = await groupDetail.getGroupData(id, group.currentPage);
            if (data && data.group) {
                const dataGroup = {
                    id: data.group.id,
                    adgroup_name: data.group.adgroup_name,
                    campaign_id: data.group.campaign_id,
                    bidding_strategy: data.group.bidding_strategy,
                    ad_schedule: data.group.ad_schedule,
                    target_keywords: data.group.target_keywords,
                    status: data.group.status,
                    total_advertisement: data.group.total_advertisement,
                    campaign_name: data.group.campaign.campaign_name,
                    start_date: data.group.campaign.start_date,
                    end_date: data.group.campaign.end_date,
                    target_audience: data.group.campaign.target_audience
                };
                setGroup(prevFilter => ({ ...prevFilter, detail: dataGroup, total_ads: data.total_ads, pageCount: data.total_pages }));
                if (data.total_ads > 0) {
                    const dataAds = data.ads.map(item => ({
                        id: item.id,
                        ad_name: item.ad_name,
                        ad_type_id: item.ad_type_id,
                        kpi: item.kpi,
                        platforms_count: item.platforms_count,
                        ad_type_name: item.advertisement_type.ad_type_name,
                        status: item.status
                    }));
                    setGroup(prevFilter => ({ ...prevFilter, ads: dataAds }));
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageClick = (selectedPage) => {
        setGroup(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };

    const columns = [
        {
            field: 'ad_name',
            headerName: 'Advertisement Name',
            width: isShow ? 350 : 220,
            sortable: true,
        },
        {
            field: 'ad_type_name',
            headerName: 'Type',
            width: isShow ? 150 : 90,
            sortable: true,
        },
        {
            field: 'kpi',
            headerName: 'KPI',
            width: isShow ? 380 : 230,
            type: 'number',
            headerAlign: 'center',
            align: 'center',
            sortable: true,
            renderCell: (params) => {
                return (
                    <Kpi value={params.value} className={`${isShow ? 'text-white' : 'text-black'}`} />
                );
            }
        },
        {
            field: 'platforms_count',
            headerName: 'Platforms',
            type: 'number',
            width: isShow ? 150 : 80,
            align: 'center',
            headerAlign: 'center',
            sortable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: isShow ? 150 : 100,
            align: 'left',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Status value={params.value} className="justify-center" />
                );
            }
        },
    ];
    return (
        <div className="container rounded-3xl m-10 shadow-xl bg-white border-2">
            {group ? (
                <div className="m-5">
                    <div className={`flex justify-start my-5 items-start ${isShow ? "mb-2" : "mb-1"}`}>
                        <img className="w-6 h-6" loading="lazy" src={logo} alt="logo" />
                        <span className="text-[#387DE4] text-xl font-bold">
                            ds System
                        </span>
                    </div>
                    <form
                        className="form flex flex-col"
                    >
                        <p className={`text-[#387DE4] text-3xl ${isShow ? "mb-6" : "mb-4"} font-semibold`}>
                            Group Detail
                        </p>
                        <div className="flex flex-col">
                            <Detail title='Group name:' value={group.detail.adgroup_name} className1="flex-col" className3='ml-10' />
                            <Detail title='Campaign name:' value={group.detail.campaign_name}
                                className1={`flex-col ${isShow ? "mt-2" : "mt-1"}`} className3='ml-10' />
                            <Detail title='Target audience:' value={group.detail.target_audience}
                                className1={`flex-col ${isShow ? "mt-2" : "mt-1"}`} className3='ml-10' />
                            <Detail title='Advertisement schedule:' value={group.detail.ad_schedule}
                                className1={`flex-row ${isShow ? "mt-2" : "mt-1"}`} className2='mr-3' />
                            <div className={`flex flex-row ${isShow ? "mt-2" : "mt-1"}`}>
                                <Detail title='Keywords:' value={group.detail.target_keywords}
                                    className1={`w-2/3 ${isShow ? " flex-row items-center" : "flex-col"}`} className2='mr-3'
                                    className3={`${isShow ? "" : "ml-10"}`} />
                                <Detail title=' Bidding strategy:' value={group.detail.bidding_strategy}
                                    className1={`w-1/2 ${isShow ? " flex-row items-center" : "flex-col"}`} className2='mr-3'
                                    className3={`${isShow ? "" : "ml-10"}`} />
                                <div className={`w-1/3 flex ${isShow ? "flex-row items-center" : "flex-col"}`}>
                                    <p className={`font-bold text-[17px] text-[#6E9CE0] mr-3`}>Status: </p>
                                    <Status value={group.detail.status} />
                                </div>
                            </div>
                            <div className={`flex flex-row ${isShow ? "mt-2" : "mt-1"}`}>
                                <Detail title='Total advertisements:' value={group.total_ads}
                                    className1={`w-2/3 ${isShow ? " flex-row" : "flex-col"}`} className2='mr-4' className3={`${isShow ? "" : "ml-20"}`} />
                                <Detail title='Group start:' value={formatDate(new Date(group.detail.start_date))}
                                    className1={`w-1/2 ${isShow ? " flex-row items-center" : "flex-col"}`} className2='mr-4' />
                                <Detail title='Group end:' value={formatDate(new Date(group.detail.end_date))}
                                    className1={`w-1/3 flex ${isShow ? "flex-row items-center" : "flex-col"}`} className2='mr-4' />
                            </div>
                            <div className={`flex flex-col ${isShow ? "mt-5" : "mt-3"}`}>
                                <p className={`text-[#387DE4] text-[20px] ${isShow ? "mb-6" : "mb-3"} font-semibold`}>
                                    All group ads:
                                </p>
                                {group?.ads ? (
                                    <Box sx={{ height: 318, width: '100%' }}>
                                        <DataGrid
                                            rows={group.ads}
                                            columns={columns}
                                            hideFooter={true}
                                        />
                                    </Box>
                                ) : (
                                    <Box style={{ height: '100%', width: '100%' }}>
                                        <Loading />
                                    </Box>
                                )}
                            </div>
                            <div>
                                <Paginate handlePageClick={handlePageClick} pageCount={group.pageCount} />
                            </div>
                        </div>
                    </form >
                </div >
            ) : (
                <div>
                    <Loading />
                </div>
            )}
        </div >
    );
};
export default GroupDetail
