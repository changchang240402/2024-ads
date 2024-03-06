import React, { useState, useEffect } from 'react';
import logo from "../../../assets/ggads.png";
import { Detail, Paginate } from "../../Component/Component";
import CampaignService from '../../../services/CampaignService';
import { formatDate } from '../../../utility/formatdate';
import Loading from '../../Loading/Loading';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const CampaignDetail = ({ id }) => {
    const { campaignDetail } = CampaignService();
    const [isSearchClicked, setIsSearchClicked] = useState(true);
    const [campaign, setCampaign] = useState({
        detail: {},
        total_group: 0,
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
            if (window.innerWidth <= 1400) {
                setIsShow(false);
            } else {
                setIsShow(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [id, campaign, isSearchClicked]);
    const fetchData = async () => {
        try {
            const data = await campaignDetail.getCampaignData(id, campaign.currentPage);
            if (data && data.campaign) {
                setCampaign(prevFilter => ({ ...prevFilter, detail: data.campaign, total_group: data.total_group, total_ads: data.total_ads, pageCount: data.total_pages }));
                if (data.total_ads > 0) {
                    const dataAds = data.ads.map(item => ({
                        id: item.id,
                        ad_name: item.ad_name,
                        adgroup_id: item.adgroup_id,
                        ad_type_id: item.ad_type_id,
                        kpi: item.kpi,
                        platforms_count: item.platforms_count,
                        ad_type_name: item.advertisement_type.ad_type_name,
                        adgroup_name: item.group.adgroup_name,
                        status: item.status
                    }));
                    setCampaign(prevFilter => ({ ...prevFilter, ads: dataAds }));
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageClick = (selectedPage) => {
        setCampaign(prevFilter => ({ ...prevFilter, currentPage: selectedPage.selected }));
        setIsSearchClicked(true);
    };

    const columns = [
        {
            field: 'ad_name',
            headerName: 'Advertisement Name',
            width: isShow ? 200 : 120,
            sortable: true,
        },
        {
            field: 'adgroup_name',
            headerName: 'Group Name',
            width: isShow ? 300 : 160,
            sortable: true,
        },
        {
            field: 'ad_type_name',
            headerName: 'Type',
            width: isShow ? 120 : 80,
            sortable: true,
        },
        {
            field: 'kpi',
            headerName: 'KPI',
            width: isShow ? 300 : 200,
            type: 'number',
            headerAlign: 'center',
            align: 'center',
            sortable: true,
            renderCell: (params) => {
                return (
                    <div className={`progress-bar text-base flex items-center justify-start 
                    ${params.value > 50 ? "bg-[#CDE7FF]" : "bg-red-200"}  mr-4 my-2 rounded-2xl w-[100%]`}>
                        <div className={`progress rounded-2xl flex justify-center 
                        ${params.value > 50 ? "bg-[#0095FF]" : "bg-red-600"} `}
                            style={{ width: `${params.value}%` }}>
                            <p className={`px-2 ${isShow ? 'text-white' : 'text-black'}`}>{params.value}%</p>
                        </div>
                    </div>
                );
            }
        },
        {
            field: 'platforms_count',
            headerName: 'Platforms',
            type: 'number',
            width: isShow ? 100 : 60,
            align: 'center',
            headerAlign: 'center',
            sortable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: isShow ? 120 : 100,
            align: 'left',
            headerAlign: 'center',
            renderCell: (params) => {
                const isPaused = params.value === 0;
                return (
                    <Box display="flex" justifyContent="center" borderRadius="2px" >
                        {isPaused ? (
                            <p className="flex items-center justify-around font-bold shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#00E096] bg-[#DCFCE7] mr-10 h-[17px] w-[80px]">
                                Active
                            </p>
                        ) : (
                            <p className="flex items-center justify-around font-bold shadow-sm px-6 py-3 rounded-2xl border-2 focus:outline-none border-[#FFA800] bg-[#FFF4DE] mr-10 h-[17px] w-[80px]">
                                Paused
                            </p>
                        )}
                    </Box>
                );
            }
        },
    ];
    return (
        <div className="container rounded-3xl m-10 shadow-xl bg-white border-2">
            {campaign ? (
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
                            Campaign Detail
                        </p>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <Detail title='Campaign name:' value={campaign.detail.campaign_name} className1={`${isShow ? "w-1/2" : "w-2/3"}`} className2='mr-10' />
                                <Detail title='Budget:' value={Number(campaign.detail.budget).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    className1={`${isShow ? "w-1/2" : "w-2/5"}`} className2='mr-10' />
                            </div>
                            <Detail title='Campaign goal:' value={campaign.detail.campaign_goal}
                                className1={`${isShow ? "flex-row mt-3" : "flex-col mt-1"}`} className2='mr-12' />
                            <div className={`flex flex-row ${isShow ? "mt-3" : "mt-1"}`}>
                                <Detail title='Campaign start:' value={formatDate(new Date(campaign.detail.start_date))}
                                    className1={`flex-row ${isShow ? "w-1/2" : "w-2/3"}`} className2='mr-12' />
                                <Detail title='Campaign end:' value={formatDate(new Date(campaign.detail.end_date))}
                                    className1={`flex-row ${isShow ? "w-1/2" : "w-2/5"}`} className2='mr-6' />
                            </div>
                            <Detail title='Campaign message:' value={campaign.detail.ad_message}
                                className1={`${isShow ? "flex-row mt-3" : "flex-col mt-1"}`} className2='mr-3' />
                            <Detail title='Target audience:' value={campaign.detail.target_audience}
                                className1={`${isShow ? "flex-row mt-3" : "flex-col mt-1"}`} className2='mr-11' />
                            <Detail title='Distribution strategy:' value={campaign.detail.distribution_strategy}
                                className1={`${isShow ? "flex-row mt-3" : "flex-col mt-1"}`} className2='mr-1' />
                            <div className={`flex flex-row ${isShow ? "mt-3" : "mt-1"}`}>
                                <Detail title='Total groups:' value={campaign.total_group}
                                    className1={`flex-row ${isShow ? "w-1/2" : "w-2/3"}`} className2='mr-6' />
                                <Detail title='Total advertisements:' value={campaign.total_ads}
                                    className1={`flex-row ${isShow ? "w-1/2" : "w-2/5"}`} className2='mr-6' />
                            </div>
                            <div className={`flex flex-col ${isShow ? "mt-5" : "mt-3"}`}>
                                <p className={`text-[#387DE4] text-[20px] ${isShow ? "mb-6" : "mb-3"} font-semibold`}>
                                    All campaign ads:
                                </p>
                                {campaign?.ads ? (
                                    <Box sx={{ height: 318, width: '100%' }}>
                                        <DataGrid
                                            rows={campaign.ads}
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
                                <Paginate handlePageClick={handlePageClick} pageCount={campaign.pageCount} />
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
export default CampaignDetail
