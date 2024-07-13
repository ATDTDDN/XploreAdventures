import moment from 'moment/moment'
import Navbar from '@/components/Fragments/Navbar'
import Sidebar from '@/components/Fragments/Sidebar'
import React, { useEffect, useState } from 'react'
import useGetData from '@/Hooks/useGetData'

const Destinations = () => {

    const [destinations, setDestinations] = useState([]);
    const { getData } = useGetData();

    useEffect(() => {
        getData("activities", (res) => setDestinations(res.data.data));
    }, []);

    return (
        <div className='flex w-full h-screen bg-slate-100 font-poppins text-primaryblack'>
            <Navbar />
            <Sidebar />
            <div className='w-5/6 px-10 pt-20'>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex items-center justify-between h-14'>
                        <h1 className='text-2xl font-semibold'>Destinations</h1>
                        <div className='flex items-center text-[13px] my-2'>
                            <h1 className={`mr-4 text-slate-400`}><b>10</b> destinations found</h1>
                            <div className='flex py-2 bg-white rounded-lg text-primaryblack'>
                                <button className='px-4'><i class="fa-solid fa-magnifying-glass"></i></button>
                                <input type="text" placeholder="Search User" className="pr-4 bg-transparent outline-none placeholder:text-slate-300" />
                            </div>
                            <button type="submit" className="px-4 py-2 ml-4 font-medium text-white rounded-lg bg-primaryyellow hover:bg-yellowhover">
                                <i class="fa-solid fa-plus mr-2" />
                                New Destination
                            </button>
                        </div>
                    </div>
                    <div className='h-[2px] bg-opacity-50 rounded-full bg-slate-300'></div>
                    <div className='flex flex-1 flex-wrap w-full gap-[2%] overflow-y-scroll no-scrollbar pt-3'>
                        {destinations.map((destination, index) => (
                            <div key={index} className='w-[32%] overflow-hidden bg-white text-primaryblack rounded-xl h-64 text-[13px] my-1'>
                                <img src={destination.imageUrls} className='object-cover w-full bg-slate-200 h-[65%]'></img>
                                <div className='flex relative w-full flex-col h-[35%] px-4 py-3 gap-2'>
                                    <h1 className='font-semibold'>{destination.name}</h1>
                                    <div className='flex flex-col text-[11px] text-primarygray gap-1'>
                                        <p><i class="fa-regular fa-calendar-plus mr-2 text-primaryyellow"></i>{moment(destination.createdAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                        <p><i class="fa-regular fa-calendar-check mr-2 text-primaryblue"></i>{moment(destination.updatedAt).format("DD MMMM YYYY • HH:mm:ss")}</p>
                                    </div>
                                    <div className='absolute bottom-0 right-0 flex m-2'>
                                        <button className='w-8 h-8 rounded-lg text-primaryblue hover:text-bluehover'><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button className='w-8 h-8 rounded-lg text-primaryred hover:text-redhover'><i class="fa-regular fa-trash-can"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destinations