import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { MenuItems } from "../../models/MenuItems";

const Home = React.lazy(() => import("../Home/Home"));
const Campaign = React.lazy(() => import("../Campaigns/Campaign"));
const Groups = React.lazy(() => import("../Groups/Groups"));
const Ads = React.lazy(() => import("../Ads/Ads"));
const Reports = React.lazy(() => import("../Reports/Reports"));
const CampaignDetail = React.lazy(() => import("../Campaigns/ShowCampaign/CampaignDetail"))

const UserNavigation = () => {
    return (
        <div className="flex w-full h-screen">
            <Sidebar MenuItems={MenuItems} />
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <Navbar />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="campaigns" element={<Campaign />} />
                        <Route path="groups" element={<Groups />} />
                        <Route path="ads" element={<Ads />} />
                        <Route path="reports" element={<CampaignDetail />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default UserNavigation;
