import { useForm, useController } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../../assets/ggads.png";
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { DatePicker, Label, Input, LabelError, Component } from "../../Component/Component";
import { HUMAN_OBJECT } from '../../../const/config';
import CampaignService from '../../../services/CampaignService';
import { formatDate } from '../../../utility/formatdate';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const CreateCampaign = () => {

    const { schema, createCampaign } = CampaignService();
    const [status, setStatus] = useState(null);
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { fromDate: null },
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });
    const objectData = HUMAN_OBJECT;
    const [isShow, setIsShow] = useState(true);

    const handleCancel = () => {
        reset();
    };
    const [value, setValue] = useState([3, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const start_age = value[0];
    const end_age = value[1];
    const formSubmit = (data) => {
        const { campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy } = data;
        const startDate = formatDate(start_date);
        const endDate = formatDate(end_date);
        createCampaign(campaign_name, campaign_goal, budget, startDate, endDate, ad_message, human, start_age, end_age, activities, distribution_strategy);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsShow(window.innerWidth > 1400);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <p className="text-[#387DE4] text-3xl mb-4 font-semibold">
                        Create your campaign
                    </p>
                    <div className="flex flex-row">
                        <Component className={`${isShow ? "w-1/3" : "w-2/5"}`} name='campaign_name' title='What is your campaign name?' placeholder='Enter your campaign name'
                            register={register("campaign_name")}
                            error={errors?.campaign_name} />
                        <Component className={`${isShow ? "w-2/3" : "w-3/5"} ml-6`} name='campaign_goal' title='What is your campaign goal?' placeholder='Enter your campaign goal'
                            register={register("campaign_goal")}
                            error={errors?.campaign_goal} />
                    </div>
                    <div className="flex flex-row justify-between mt-1">
                        <div className="flex flex-col">
                            <Label name='campaign_goal' title='What is your budget?' />
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
                                <LabelError name='budget' error={errors.budget?.message} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <Label name='start_date' title='Campaign start time :' />
                            <DatePicker
                                name="start_date"
                                control={control}
                                format="DD/MM/YYYY"
                                error={errors?.start_date?.message}
                            />
                            {errors?.start_date && (
                                <LabelError name='start_date' error={errors.start_date?.message} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <Label name='end_date' title='Campaign end time :' />
                            <DatePicker
                                name="end_date"
                                control={control}
                                format="DD/MM/YYYY"
                                error={errors?.end_date?.message}
                            />
                            {errors?.end_date && (
                                <LabelError name='end_date' error={errors.end_date?.message} />
                            )}
                        </div>
                    </div>
                    <Component name='ad_message' title='What is the message of your campaign?' placeholder='Enter your campaign message'
                        register={register("ad_message")}
                        error={errors?.ad_message} />
                    <div className="flex flex-row justify-between mt-1">
                        <div className='flex flex-col w-1/3'>
                            <div className='flex flex-col'>
                                <Label name='human' title='Target object:' />
                                <select className='border bg-white text-center rounded-2xl border-2 focus:border-[#387DE4] h-[45px] w-[180px] selectpicker'
                                    type="human"
                                    id="human"
                                    name="human"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
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
                                <LabelError name='human' error={errors.human?.message} />
                            )}
                        </div>
                        <Box className='w-1/2'>
                            <div className="mb-2">
                                <Label name='start_age' title='Age from' />
                                <input className='w-14 outline-none px-3 border border-[#0095FF] rounded-lg ml-3 mr-3 text-center'
                                    type="text" value={start_age}
                                    onChange={handleChange}
                                    {...register("start_age")} />
                                <Label name='end_age' title='to' />
                                <input className='w-14 outline-none px-3 border border-[#0095FF] rounded-lg ml-3 text-center'
                                    type="text" value={end_age}
                                    onChange={handleChange}
                                    {...register("end_age")} />
                            </div>
                            <Slider
                                getAriaLabel={() => 'Age range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={3}
                                max={100}
                            />
                        </Box>
                    </div>
                    <Component name='activities' title='What activities is your campaign aimed at?' placeholder='Enter your activities'
                        register={register("activities")}
                        error={errors?.activities} />
                    <Component name='distribution_strategy' title='What is your distribution strategy?' placeholder='Enter your distribution strategy'
                        register={register("distribution_strategy")}
                        error={errors?.distribution_strategy} />
                    <div className="flex justify-right mt-5 text-center">
                        <button className="bg-[#F6C666] rounded-3xl px-6 py-3 font-bold text-white p-15 mr-4" type="button" onClick={handleCancel}>
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
