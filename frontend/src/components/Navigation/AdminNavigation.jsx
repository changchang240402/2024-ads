import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { AdminMenuItems } from "../../models/AdminMenuItems";

const User = React.lazy(() => import("../AdminDashboard/User/User"));

const AdminNavigation = () => {
    return (
        <div className="flex w-full h-screen">
            <Sidebar MenuItems={AdminMenuItems} />
            <div className="flex bg-[#F9FAFB] flex-col flex-1">
                <Navbar />
                <Suspense fallback={<FontAwesomeIcon icon={faSpinner} />}>
                    <Routes>
                        <Route path="" element={<User />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default AdminNavigation;
