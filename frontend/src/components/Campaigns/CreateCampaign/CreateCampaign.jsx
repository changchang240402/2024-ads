import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../../assets/ggads.png";
import { faMoneyBill, faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from "../DatePicker/DatePicker";
import { HUMAN_OBJECT } from '../../../const/config';
import CampaignService from '../../../services/CampaignService';
import { formatdatetime } from '../../../utility/formatdate';

const CreateCampaign = () => {
    const { schema, createCampaign } = CampaignService();
    const [status, setStatus] = useState(null);
    // const [start_date, setStartDate] = useState(new Date());
    // const [end_date, setEndDate] = useState(start_date);
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { fromDate: null },
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });

    const objectData = HUMAN_OBJECT;

    // const onError = () => {
    // const { campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy } = data;
    // const startDate = formatdatetime(start_date);
    // const endDate = formatdatetime(end_date);
    // await createCampaign(campaign_name, campaign_goal, budget, startDate, endDate, ad_message, human, start_age, end_age, activities, distribution_strategy);
    //     console.log('trang');
    // };

    const formSubmit = (data) => {
        const { campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy } = data;
        const startDate = formatdatetime(start_date);
        const endDate = formatdatetime(end_date);
        createCampaign(campaign_name, campaign_goal, budget, startDate, endDate, ad_message, human, start_age, end_age, activities, distribution_strategy);
        console.log('data', startDate);
        console.log('data', endDate);
    };

    return (
        <div className="container rounded-3xl m-10 shadow-xl bg-white border-2">
            <div className="m-5">
                <div className="flex justify-start my-5 items-start">
                    <img className="w-6 h-6" loading="lazy" src={logo} alt="logo" />
                    <span className="text-[#387DE4] text-xl font-bold">
                        ds System
                    </span>
                </div>
                <form
                    className="form flex flex-col"
                    onSubmit={handleSubmit(formSubmit)}
                >
                    <p className="text-[#387DE4] text-3xl mb-6 font-semibold">
                        Create your campaign
                    </p>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-1/3">
                            <label className="font-medium text-lg mb-2 fs-[12px]" htmlFor="campaign_name">
                                What is your campaign name?
                            </label>
                            <input
                                className="px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                                type="campaign_name"
                                placeholder="Enter your campaign name"
                                id="campaign_name"
                                name="campaign_name"
                                {...register("campaign_name")}
                            />
                            {errors?.campaign_name && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="campaign_name">{errors.campaign_name?.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col w-2/3 ml-6">
                            <label className="font-medium text-lg mb-2" htmlFor="campaign_goal">
                                What is your campaign goal?
                            </label>
                            <input
                                className="px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                                type="campaign_goal"
                                placeholder="Enter your campaign goal"
                                id="campaign_goal"
                                name="campaign_goal"
                                {...register("campaign_goal")}
                            />
                            {errors?.campaign_goal && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="campaign_goal">{errors.campaign_goal?.message}</label>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                        <div className="flex flex-col">
                            <label className="font-medium text-lg mb-2" htmlFor="budget">
                                What is your desired budget?
                            </label>
                            <div className="flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white h-auto">
                                <input
                                    type="budget"
                                    placeholder="Enter your budget"
                                    id="budget"
                                    name="budget"
                                    className="focus:outline-none focus:border-none"
                                    {...register("budget")}
                                />
                                <FontAwesomeIcon
                                    icon={faMoneyBill}
                                    size="lg"
                                    color='#8DD3BB'
                                />
                            </div>
                            {errors?.budget && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="budget">{errors.budget?.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-lg mb-2" htmlFor="start_date">
                                Campaign start time :
                            </label>
                            <DatePicker
                                name="start_date"
                                control={control}
                                // className="focus:outline-none focus:border-none"
                                placeholderText="24/02/2023"
                                format="DD/MM/YYYY"
                                error={errors?.start_date?.message}
                            />
                            {errors?.start_date && (
                                <label className="ml-2 mt-2 px-2 text-sm text-red-600" htmlFor="start_date">{errors.start_date?.message}</label>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium text-lg mb-2" htmlFor="end_date">
                                Campaign end time :
                            </label>
                            <DatePicker
                                name="end_date"
                                control={control}
                                placeholderText="24/02/2023"
                                format="DD/MM/YYYY"
                                error={errors?.start_date?.message}
                            />
                            {errors?.end_date && (
                                <label className="ml-2 mt-2 px-2 text-sm text-red-600" htmlFor="end_date">{errors.end_date?.message}</label>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-lg mt-4 mb-2" htmlFor="ad_message">
                            What is the message of your campaign?
                        </label>
                        <input
                            className="px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                            type="ad_message"
                            placeholder="Enter your distribution strategy"
                            name="ad_message"
                            {...register("ad_message")}
                        />
                        {errors?.ad_message && (
                            <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="ad_message">{errors.ad_message?.message}</label>
                        )}
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                        <div className='flex flex-col w-2/3'>
                            <div className='flex flex-row items-center'>
                                <label className="justify-center font-medium text-lg mb-2 p-3" htmlFor="human">
                                    Target object:
                                </label>
                                <select className='border bg-white text-center rounded-2xl p-2 border-2 focus:border-[#387DE4] h-[45px] w-[180px] selectpicker'
                                    type="human"
                                    id="human"
                                    name="human"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        // trigger("human");
                                    }}
                                    {...register("human")}
                                >
                                    <option value=''>Select Object</option>
                                    {objectData?.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            {errors?.human && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="human">{errors.human?.message}</label>
                            )}
                        </div>
                        <div className='flex flex-col w-1/3'>
                            <div className="flex flex-row items-center">
                                <label className="font-medium text-lg mb-2 p-3" htmlFor="start_age">
                                    Age : from
                                </label>
                                <input
                                    className="px-4 py-3 shadow-sm text-center rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white h-[45px] w-[180px] p-3"
                                    type="start_age"
                                    placeholder="3"
                                    id="start_age"
                                    name="start_age"
                                    {...register("start_age")}
                                />
                            </div>
                            {errors?.start_age && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="start_age">{errors.start_age?.message}</label>
                            )}
                        </div>
                        <div className='flex flex-col w-1/3'>
                            <div className="flex flex-row items-center">
                                <label className="font-medium text-lg mb-2 p-3 mr-[12px]" htmlFor="end_age">
                                    to
                                </label>
                                <input
                                    className="px-4 py-3 shadow-sm text-center rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white h-[45px] w-[180px] p-15"
                                    type="end_age"
                                    placeholder="100"
                                    id="end_age"
                                    name="end_age"
                                    {...register("end_age")}
                                />
                            </div>
                            {errors?.end_age && (
                                <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="end_age">{errors.end_age?.message}</label>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex flex-row items-center">
                            <label className="font-medium text-lg mb-2 p-3" htmlFor="activities">
                                Activities:
                            </label>
                            <input
                                className="px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white w-[100%]"
                                type="activities"
                                placeholder="Enter your activities"
                                id="activities"
                                name="activities"
                                {...register("activities")}
                            />
                        </div>
                        {errors?.activities && (
                            <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="activities">{errors.activities?.message}</label>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium text-lg mt-4 mb-2" htmlFor="distribution_strategy">
                            What is your distribution strategy ?
                        </label>
                        <input
                            className="px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white"
                            type="distribution_strategy"
                            placeholder="Enter your distribution strategy"
                            id="distribution_strategy"
                            name="distribution_strategy"
                            {...register("distribution_strategy")}
                        />
                        {errors?.distribution_strategy && (
                            <label className="ml-2 mt-1 px-2 text-sm text-red-600" htmlFor="distribution_strategy">{errors.distribution_strategy?.message}</label>
                        )}
                    </div>
                    <div className="flex justify-center mt-6 text-center">
                        <button className="bg-[#F0DE36] rounded-3xl px-6 py-3 font-bold text-white p-15 mr-4">
                            CANCEL
                        </button>
                        <button className="bg-[#387DE4] rounded-3xl px-6 py-3 font-bold text-white" type="submit">
                            CREATE
                        </button>
                    </div>
                </form >
            </div >
        </div >
    );
}

export default CreateCampaign;