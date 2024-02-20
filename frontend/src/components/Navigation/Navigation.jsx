import React, { Suspense } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Route, Routes } from 'react-router-dom';
import { MenuItems } from "../../models/MenuItems";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Home = React.lazy(() => import("../Home/Home"));
const Campaign = React.lazy(() => import("../Camaigns/Campaign"));
const Groups = React.lazy(() => import("../Groups/Groups"));
const Ads = React.lazy(() => import("../Ads/Ads"));
const Reports = React.lazy(() => import("../Reports/Reports"));

const Navigation = () => {
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
                        <Route path="reports" element={<Reports />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default Navigation;
