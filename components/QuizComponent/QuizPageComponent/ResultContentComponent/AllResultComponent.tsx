import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuizHeader from '../../QuizHeader';
import Image from 'next/image';
import AllJson from "@/app/(user)/json/allTest.json"
import { PersonalityResultComponent } from './PersonalityResultComponent';
import { SkillResultComponent } from './SkillResultComponent';
import { InterestResultComponent } from './InterestResultComponent';
import { ValueResultComponent } from './ValueResultComponent';
import { LearningStyleResultComponent } from './LearningStyleResultComponent';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock } from 'lucide-react';

export const AllResultComponent = () => {
    const params = useParams();

    const [selectedTab, setSelectedTab] = useState('personality');

    const handleSelectChange = (value: string) => {
        setSelectedTab(value);
    };


    return (
        <>
            <div className='bg-white'>
                <div className='max-w-7xl mx-auto  px-4 md:px-10 lg:px-12'>
                    {/* Tabs for larger screens */}
                    <div className="hidden lg:block pt-4 lg:pt-6">
                        <Tabs defaultValue="personality" className="w-full">
                            <TabsList>
                                <TabsTrigger value="personality">ចរិកលក្ខណៈ</TabsTrigger>
                                <TabsTrigger value="skill">ភាពខ្លាំងខ្សោយ</TabsTrigger>
                                <TabsTrigger value="interest">ចំណាប់អារម្មណ៍</TabsTrigger>
                                <TabsTrigger value="value">គុណតម្លៃ</TabsTrigger>
                                <TabsTrigger value="learningStyle">របៀបនៃការសិក្សា</TabsTrigger>
                                <TabsTrigger value="career">អាជីពការងារ</TabsTrigger>
                            </TabsList>
                            <TabsContent value="personality"><PersonalityResultComponent /></TabsContent>
                            <TabsContent value="skill"><SkillResultComponent /></TabsContent>
                            <TabsContent value="interest"><InterestResultComponent /></TabsContent>
                            <TabsContent value="value"><ValueResultComponent /></TabsContent>
                            <TabsContent value="learningStyle"><LearningStyleResultComponent /></TabsContent>
                            <TabsContent value="career">career Result</TabsContent>
                        </Tabs>
                    </div>

                    {/* Dropdown for small screens */}
                    <div className="lg:hidden pt-4 lg:pt-6">
                        <Select value={selectedTab} onValueChange={handleSelectChange} >
                            <SelectTrigger className="w-full border-2 border-gray-200 outline-none text-gray-700">
                                <SelectValue placeholder="Select a tab" />
                            </SelectTrigger>
                            <SelectContent className='font-light text-gray-700'> 
                                <SelectItem  value="personality">ចរិកលក្ខណៈ</SelectItem>
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
                        {selectedTab === 'career' && <div>career Result</div>}


                    </div>
                </div>




                <div className='space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12' >

                    {/* <Select>
                        <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>North America</SelectLabel>
                                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                                <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
                                <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
                                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                                <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
                                <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Europe & Africa</SelectLabel>
                                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                                <SelectItem value="cet">Central European Time (CET)</SelectItem>
                                <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
                                <SelectItem value="west">
                                    Western European Summer Time (WEST)
                                </SelectItem>
                                <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
                                <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Asia</SelectLabel>
                                <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                                <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
                                <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                                <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
                                <SelectItem value="ist_indonesia">
                                    Indonesia Central Standard Time (WITA)
                                </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Australia & Pacific</SelectLabel>
                                <SelectItem value="awst">
                                    Australian Western Standard Time (AWST)
                                </SelectItem>
                                <SelectItem value="acst">
                                    Australian Central Standard Time (ACST)
                                </SelectItem>
                                <SelectItem value="aest">
                                    Australian Eastern Standard Time (AEST)
                                </SelectItem>
                                <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                                <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>South America</SelectLabel>
                                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}

                </div>
            </div>

        </>

    )
}
