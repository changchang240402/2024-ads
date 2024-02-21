import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Route, Routes } from 'react-router-dom'
import Home from "../Home/Home";
import Campaign from "../Camaigns/Campaign";
import Groups from "../Groups/Groups";
import Ads from "../Ads/Ads";
import Reports from "../Reports/Reports";
import { MenuItems } from "../../models/MenuItems";

const Navigation = () => {
    return (
        <div className="flex w-full h-screen">
            <Sidebar MenuItems={MenuItems}></Sidebar>
            <div className="flex flex-col flex-1 w-full">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="campaigns" element={<Campaign />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="ads" element={<Ads />} />
                    <Route path="reports" element={<Reports />} />
                </Routes>
            </div>
        </div>
    );
}

export default Navigation;
