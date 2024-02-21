import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import avatar from '../../assets/avatar.png';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex justify-between items-center h-20 bg-white'>
            <div className='mx-10 font-semibold text-xl'>Dashboard</div>
            <div className="flex justify-center items-center">
                <FontAwesomeIcon
                    className='mx-4'
                    icon={faBell}
                    color='#329ea8'
                    size="xl"
                />
                <div className="profile flex flex-row relative" onClick={toggleDropdown} ref={dropdownRef}>
                    <img className='object-cover w-12 h-12 cursor-pointer' loading='lazy' src={avatar} alt="" />
                    <div className='flex justify-between flex-1 flex-col mx-5 font-semibold cursor-pointer'>
                        <p className='font-semibold'>vantanhly</p>
                        <p className='text-sm font-thin'>lyvantanh@gmail.com</p>
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-full right-4 mt-3 w-48 bg-white rounded-md rounded-t-none shadow-lg">
                            <div className="py-1">
                                <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to={"profile"}>Profile</Link>
                                <form className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
