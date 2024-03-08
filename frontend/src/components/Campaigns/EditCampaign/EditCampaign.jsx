import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../../../assets/ggads.png";
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { DatePicker, Label, Input, LabelError, Component } from "../../Component/Component";
import { HUMAN_OBJECT } from '../../../const/config';
import CampaignService from '../../../services/CampaignService';
import { formatDate } from '../../../utility/formatdate';
import stringProcessing from "../../../utility/string";
import Loading from '../../Loading/Loading';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const EditCampaign = ({ id }) => {
    const currentPage = 0;
    const { schema, campaignDetail, editCampaign } = CampaignService();
    const [campaign, setCampaign] = useState({});
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { fromDate: null },
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });
    const [isFormInitialized, setIsFormInitialized] = useState(false);
    const objectData = HUMAN_OBJECT;
    const handleCancel = () => {
        reset(campaign);
    };
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {
        if (!isFormInitialized) {
            fetchData();
        }

        if (campaign && Object.keys(campaign).length > 0 && !isFormInitialized) {
            reset(campaign);
            setIsFormInitialized(true);
        }

        const handleResize = () => {
            setIsShow(window.innerWidth > 1400);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [id, campaign, reset, isFormInitialized]);
    const fetchData = async () => {
        try {
            const data = await campaignDetail.getCampaignData(id, currentPage);
            if (data && data.campaign) {
                const action = stringProcessing(data.campaign.target_audience);
                const dataCampaign = {
                    campaign_name: data.campaign.campaign_name || '',
                    campaign_goal: data.campaign.campaign_goal || '',
                    budget: data.campaign.budget || '',
                    start_date: data.campaign.start_date || '',
                    end_date: data.campaign.end_date || '',
                    ad_message: data.campaign.ad_message || '',
                    human: action.human || '',
                    start_age: action.start_age || '',
                    end_age: action.end_age || '',
                    activities: action.activities || '',
                    distribution_strategy: data.campaign.distribution_strategy || '',
                }
                setCampaign(dataCampaign);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [value, setValue] = useState([campaign.start_age, campaign.end_age]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const start_age = value[0];
    const end_age = value[1];
    const formSubmit = (data) => {
        const { campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy } = data;
        const startDate = formatDate(start_date);
        const endDate = formatDate(end_date);
        editCampaign(id, campaign_name, campaign_goal, budget, startDate, endDate, ad_message, human, start_age, end_age, activities, distribution_strategy);
    };
    return (
        <div className="container rounded-3xl m-10 shadow-xl bg-white border-2">
            {campaign ? (
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
                            Edit your campaign
                        </p>
                        <div className="flex flex-row">
                            <Component className="w-1/3" name='campaign_name' title='Campaign name:' placeholder='Enter your campaign name'
                                register={register("campaign_name", { value: campaign.campaign_name })}
                                error={errors?.campaign_name} />
                            <Component className="w-2/3 ml-6" name='campaign_goal' title='Campaign goal:' placeholder='Enter your campaign goal'
                                register={register("campaign_goal", { value: campaign.campaign_goal })}
                                error={errors?.campaign_goal} />
                        </div>
                        <div className="flex flex-row justify-between mt-1">
                            <div className="flex flex-col">
                                <Label name='budget' title='Budget:' />
                                <div className="flex flex-row items-center px-4 py-3 shadow-sm rounded-2xl border-2 focus:outline-none focus:border-[#387DE4] bg-white h-auto">
                                    <input
                                        type="budget"
                                        placeholder="Enter your budget"
                                        id="budget"
                                        name="budget"
                                        className="focus:outline-none focus:border-none"
                                        {...register("budget", { value: campaign.budget })}
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
                                <Label name='start_date' title='Campaign start time:' />
                                <DatePicker
                                    name="start_date"
                                    control={control}
                                    format="DD/MM/YYYY"
                                    error={errors?.start_date?.message}
                                    defaultValue={campaign.start_date}
                                />
                                {errors?.start_date && (
                                    <LabelError name='start_date' error={errors.start_date?.message} />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <Label name='end_date' title='Campaign end time:' />
                                <DatePicker
                                    name="end_date"
                                    control={control}
                                    format="DD/MM/YYYY"
                                    error={errors?.end_date?.message}
                                    defaultValue={campaign.end_date}
                                />
                                {errors?.end_date && (
                                    <LabelError name='end_date' error={errors.end_date?.message} />
                                )}
                            </div>
                        </div>
                        <Component name='ad_message' title='Campaign message:' placeholder='Enter your campaign message'
                            register={register("ad_message", { value: campaign.ad_message })}
                            error={errors?.ad_message} />
                        <div className="flex flex-row justify-between mt-4">
                            <div className='flex flex-col w-1/3'>
                                <div className='flex flex-row items-center'>
                                    <Label name='human' title='Target object:' className='p-3' />
                                    <select
                                        className='border bg-white text-center rounded-2xl p-2 border-2 focus:border-[#387DE4] h-[45px] w-[180px] selectpicker'
                                        type="human"
                                        id="human"
                                        name="human"
                                        onChange={(e) => setCampaign(prevFilter => ({ ...prevFilter, human: e.target.value }))}
                                        {...register("human", { value: campaign.human })}
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
                                        {...register("start_age", { value: campaign.start_age })} />
                                    <Label name='end_age' title='to' />
                                    <input className='w-14 outline-none px-3 border border-[#0095FF] rounded-lg ml-3 text-center'
                                        type="text" value={end_age}
                                        onChange={handleChange}
                                        {...register("end_age", { value: campaign.end_age })} />
                                </div>
                                <Slider
                                    defaultValue={[campaign.start_age, campaign.end_age]}
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
                            register={register("activities", { value: campaign.activities })}
                            error={errors?.activities} />
                        <Component name='distribution_strategy' title='Distribution strategy:' placeholder='Enter your distribution strategy'
                            register={register("distribution_strategy", { value: campaign.distribution_strategy })}
                            error={errors?.distribution_strategy} />
                        <div className="flex justify-right mt-5 text-center">
                            <button className="bg-[#F6C666] rounded-3xl px-6 py-3 font-bold text-white p-15 mr-4" type="button" onClick={handleCancel}>
                                CANCEL
                            </button>
                            <button className="bg-[#00E096] rounded-3xl px-6 py-3 font-bold text-white" type="submit">
                                EDIT
                            </button>
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

export default EditCampaign;