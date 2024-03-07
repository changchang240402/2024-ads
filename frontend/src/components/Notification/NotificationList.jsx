import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Virtuoso } from 'react-virtuoso'
import { useDispatch, useSelector } from "react-redux";

import slack from '../../assets/slack.png';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import AdsDetailsPopup from "../AdsDetails/AdsDetailsPopup";
import { ADS_ITEM_ACTION, SLACK_TEST_NOTI_URL } from "../../const/config";
import { openEditPopup } from "../../redux/actions/showPopup";

const NotificationDropdown = ({ notifications }) => {
    const dispatch = useDispatch();
    const [activeMenu, setActiveMenu] = useState('All');

    const isEditPopupOpen = useSelector(state => state.popup.isShowEditPopup);

    const handleShowPopup = () => {
        dispatch(openEditPopup(true));
    }

    const Menu = [
        'All',
        'Unread'
    ];

    const handleNavigateToSlack = () => {
        window.open(SLACK_TEST_NOTI_URL, '_blank');
    }

    return (
        <div className="absolute top-full z-[999] right-[-160px] rounded-2xl p-3 px-1 shadow-lg border bg-slate-50 w-96 h-auto">
            <div className="flex flex-col w-full p-2">
                <div className="flex justify-center items-center">
                    <p className="text-xl font-poppins font-bold">Notifications</p>
                </div>
                <div className="flex">
                    {Menu.map((item, index) => (
                        <button
                            key={index}
                            className={`${activeMenu === item ? 'bg-blue-100 text-blue-500' : 'bg-slate-50'} p-2 rounded-2xl px-4 mx-4 my-2 text-black`}
                            onClick={() => { setActiveMenu(item) }}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <Virtuoso className="flex flex-col w-full"
                    data={notifications}
                    style={{ height: '300px' }}
                    itemContent={(index, item) => {
                        return (
                            <div
                                className="flex flex-row my-1 cursor-pointer p-2 hover:bg-slate-300 justify-start items-center rounded-xl"
                                key={item.id}
                                value={item.id}
                                onClick={handleShowPopup}
                            >
                                <div className="flex p-2">
                                    <img className="object-cover w-12 h-12 rounded-full" src={slack} alt="" />
                                </div>
                                <div className="flex flex-col mx-4">
                                    <p className="max-w-52">{item.content}</p>
                                    <p className="mt-2 text-xs font-bold text-blue-500">{item.time}</p>
                                </div>
                                <div className="flex flex-1 justify-end items-end">
                                    <FontAwesomeIcon icon={faCircle} className="text-blue-500" />
                                </div>
                                {
                                    isShowPopup && (
                                        <AdsDetailsPopup />
                                    )
                                }
                            </div>
                        )
                    }}
                />
                <div className="flex mt-5 justify-center">
                    <button className="cursor-pointer hover:text-blue-600"
                        onClick={handleNavigateToSlack}>
                        View all on slack
                    </button>
                </div>
            </div>
            {
                isEditPopupOpen && (
                    <AdsDetailsPopup selectedItem={1} action={ADS_ITEM_ACTION.edit} />
                )
            }
        </div>
    );
};

export default NotificationDropdown;
