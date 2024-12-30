import React from 'react'
import cover from '@/public/job/jobBannerv1.png'
import { Search } from 'lucide-react'

type props = {
    highlight: string;
    title: string;
    desc: string;
}

export const JobMainContainer = ({ highlight, title, desc }: props) => {
    return (
        
        <div className="relative w-ful h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${cover.src})` }}>
            <div className='max-w-7xl mx-auto py-4 md:py-6 px-2 md:px-4 relative z-10'>
                {/* Content section */}
                <div className='text-center'>
                    <p className="text-sm md:text-base lg:text-lg text-primary -mb-2 md:mb-1 lg:mb-2">{highlight}</p>
                    <h1 className="text-lg md:text-2xl lg:text-4xl font-bold m-2 md:mb-3 lg:mb-5 text-textprimary ">{title}</h1>
                    <p className="text-xs md:text-[14px] lg:text-lg text-gray-500 m-2 md:mb-3 lg:mb-5">
                        {desc}
                    </p>
                </div>

                {/* Search Bar Section */}
                <div className='flex gap-2 w-full items-center'>
                    <div className="w-full md:flex md:justify-center">
                        <div className='relative'>
                            <input
                                type="text"
                                placeholder="Search job title..."
                                className="w-full md:w-[600px] lg:w-[700px] pl-4 py-2 lg:py-3 border border-gray-300 rounded-full focus:outline-none text-textprimary text-[12px] lg:text-base"
                            />
                            <div className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary py-1 px-1 lg:py-3 lg:px-3 rounded-full'>
                                <Search color='#ffffff' size={18} className="text-gray-500" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )
}
