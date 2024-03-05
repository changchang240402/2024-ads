import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png';
import AuthService from '../../services/AuthService';
import Notification from '../Notification/Notification';
import NotificationList from '../Notification/NotificationList';

const Navbar = () => {

    const count = 10;

    const { getUserProfile } = AuthService();

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        }
        fetchUserProfile();
    }, []);

    const { logout } = AuthService();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        const isNotificationButtonClicked = event.target.closest('.Notification');
        const isNotificationListClicked = event.target.closest('.NotificationList');
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            event.target.className !== "Notification" &&
            event.target.className !== "NotificationList"
        ) {
            setIsDropdownOpen(false);
        }

        if (isNotificationButtonClicked || isNotificationListClicked) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        logout();
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        { id: 1, time: '10:00 AM', content: 'Notification 1 content' },
        { id: 2, time: '11:30 AM', content: 'Notification 2 content' },
        { id: 3, time: '11:30 AM', content: 'Notification 3 content' },
        { id: 4, time: '11:30 AM', content: 'Notification 4 content' },
        { id: 5, time: '11:30 AM', content: 'Notification 5 content' },
        { id: 6, time: '11:30 AM', content: 'Notification 6 content' },
    ];

    const toggleNoti = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex justify-between items-center h-20 bg-white'>
            <div className='mx-10 font-semibold text-xl'>Dashboard</div>
            <div className="flex justify-center items-center">
                <div className="flex flex-row relative mx-10" >
                    <div className="flex Notification" onClick={toggleNoti}>
                        <Notification count={count} />
                    </div>
                    {isOpen && (
                        <div className='NotificationList'>
                            <NotificationList className='NotificationList' notifications={notifications} />
                        </div>
                    )}
                </div>
                <div className="profile flex flex-row relative" onClick={toggleDropdown} ref={dropdownRef}>
                    <img className='object-cover w-12 h-12 cursor-pointer' loading='lazy' src={avatar} alt="" />
                    <div className='flex justify-between flex-1 flex-col mx-5 font-semibold cursor-pointer'>
                        <p className='font-semibold'>{user.name}</p>
                        <p className='text-sm font-thin'>{user.email}</p>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-full right-4 mt-3 w-48 bg-white rounded-md rounded-t-none shadow-lg z-50">
                            <div className="py-1">
                                <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"profile"}>Profile</Link>
                                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleSubmit}>
                                    <button type="button">Logout</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
