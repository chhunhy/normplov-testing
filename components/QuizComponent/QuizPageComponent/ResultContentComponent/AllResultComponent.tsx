'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalityResultComponent } from './PersonalityResultComponent';
import { SkillResultComponent } from './SkillResultComponent';
import { InterestResultComponent } from './InterestResultComponent';
import { ValueResultComponent } from './ValueResultComponent';
import { LearningStyleResultComponent } from './LearningStyleResultComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FinalJobRecommendComponent } from './FinalJobRecommendComponent';
import confetti from 'canvas-confetti';

export const AllResultComponent = () => {

    const [selectedTab, setSelectedTab] = useState('personality');

    const handleSelectChange = (value: string) => {
        setSelectedTab(value);
    };

    const handleClick = () => {
            const end = Date.now() + 3 * 1000; // 3 seconds
            const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    
            const frame = () => {
                if (Date.now() > end) return;
    
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 0, y: 0.5 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    startVelocity: 60,
                    origin: { x: 1, y: 0.5 },
                    colors: colors,
                });
    
                requestAnimationFrame(frame);
            };
    
            frame();
        };
    
        useEffect(() => {
            handleClick();
        }, []);


    return (
        <>
            <div className='bg-white'>
                <div >
                    {/* Tabs for larger screens */}
                    <div className="hidden lg:block pt-4 lg:pt-6">
                        <Tabs defaultValue="personality" className="w-full">
                            <div className=' max-w-7xl mx-auto'> 
                                <TabsList>
                                    <TabsTrigger value="personality">ចរិកលក្ខណៈ</TabsTrigger>
                                    <TabsTrigger value="skill">ភាពខ្លាំងខ្សោយ</TabsTrigger>
                                    <TabsTrigger value="interest">ចំណាប់អារម្មណ៍</TabsTrigger>
                                    <TabsTrigger value="value">គុណតម្លៃ</TabsTrigger>
                                    <TabsTrigger value="learningStyle">របៀបនៃការសិក្សា</TabsTrigger>
                                    <TabsTrigger value="career">អាជីពការងារ</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="personality"><PersonalityResultComponent /></TabsContent>
                            <TabsContent value="skill"><SkillResultComponent /></TabsContent>
                            <TabsContent value="interest"><InterestResultComponent /></TabsContent>
                            <TabsContent value="value"><ValueResultComponent /></TabsContent>
                            <TabsContent value="learningStyle"><LearningStyleResultComponent /></TabsContent>
                            <TabsContent value="career"><FinalJobRecommendComponent /></TabsContent>
                        </Tabs>
                    </div>

                    {/* Dropdown for small screens */}
                    <div className="lg:hidden pt-4 lg:pt-6 mx-4">
                        <Select value={selectedTab} onValueChange={handleSelectChange} >
                            <SelectTrigger className="w-full border-2 border-gray-200 outline-none text-gray-700">
                                <SelectValue placeholder="Select a tab" />
                            </SelectTrigger>
                            <SelectContent className='font-light text-gray-700'>
                                <SelectItem value="personality">ចរិកលក្ខណៈ</SelectItem>
                                <SelectItem value="skill">ភាពខ្លាំងខ្សោយ</SelectItem>
                                <SelectItem value="interest">ចំណាប់អារម្មណ៍</SelectItem>
                                <SelectItem value="value">គុណតម្លៃ</SelectItem>
                                <SelectItem value="learningStyle">របៀបនៃការសិក្សា</SelectItem>
                                <SelectItem value="career">អាជីពការងារ</SelectItem>
                            </SelectContent>
                        </Select>




                        {/* Display selected content based on dropdown */}
                        {selectedTab === 'personality' && <PersonalityResultComponent />}
                        {selectedTab === 'skill' && <SkillResultComponent />}
                        {selectedTab === 'interest' && <InterestResultComponent />}
                        {selectedTab === 'value' && <ValueResultComponent />}
                        {selectedTab === 'learningStyle' && <LearningStyleResultComponent />}
                        {selectedTab === 'career' && <FinalJobRecommendComponent />}


                    </div>
                </div>




              
            </div>

        </>

    )
}
