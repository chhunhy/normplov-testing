
'use client';
import { BriefcaseBusiness, ChevronRight, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { JobIntroComponent } from "./JobIntroComponent";

type Job = {
    title: string;
    uuid: string;
};

export default function RecommendJobPageComponent() {
    // State to track the active section (careers or majors)
    const [currentLocale, setCurrentLocale] = useState<string>('km');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }
    }, []);


    const [activeSection, setActiveSection] = useState<'Careers' | 'Majors' | 'job'>('Careers');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Selected job

    const handleSectionChange = (section: 'Careers' | 'Majors' | 'job') => {
        setActiveSection(section); // Update active section
    };

    console.log('activeSection: ', activeSection)
    console.log('selectedJob: ', selectedJob)

    // Sample jobs with UUID
    const jobs = [
        { title: 'Software Engineer', uuid: '1a2b3c4d' },
        { title: 'Product Manager', uuid: '2b3c4d5e' },
        { title: 'Data Scientist', uuid: '3c4d5e6f' },
        { title: 'HR Specialist', uuid: '4d5e6f7g' },
        { title: 'Teacher', uuid: '5e6f7g8h' },
        { title: 'Cybersecurity Analyst', uuid: '6f7g8h9i' },
        { title: 'Barista', uuid: '7g8h9i0j' },
        { title: 'Nurse', uuid: '8h9i0j1k' },
        { title: 'Tour Guide', uuid: '9i0j1k2l' },
        { title: 'Mechanical Engineer', uuid: '0j1k2l3m' },
    ];

    // Function to handle job click
    const handleJobClick = (job: { title: string, uuid: string }) => {
        setSelectedJob(job); // Set selected job to state
        setActiveSection('job'); // Ensure we're in the careers section
    };

    return (
        <div className="bg-green-50 pb-4 lg:pb-6">
            <JobIntroComponent
                title={currentLocale === 'km' ? 'ជម្រើស' :'Recommended'}
                highlight={currentLocale === 'km' ? 'អាជីពការងារ' :' Career'}
                description={currentLocale === 'km' ? 'ស្វែងយល់អំពីជំនាញ និងគុណវុឌ្ឍិសំខាន់ៗដែលត្រូវការសម្រាប់ភាពជោគជ័យក្នុងតួនាទីនេះ។ លើសពីនេះ អ្នកនឹងទទួលបានមុខជំនាញសំខាន់ៗ និងសាកលវិទ្យាល័យដែលពាក់ព័ន្ធផងដែរ ដើម្បីជួយអ្នកឱ្យឈានទៅរកការអប់រំដែលត្រឹមត្រូវ។ ' :'Learn about the essential skills and qualifications needed for success in this role. You will also find recommended majors and related universities to help you pursue the right educational path. '}
                size="md"
                type="result"
                selectedJobTitle={selectedJob?.title}
                activeSection={activeSection}

            />

            {/* Breadcrumb */}
            {/* <div className="mb-4">
                <span className="text-gray-500">Home / </span>
                <span className="text-primary">Recommended Career</span>
                
            </div> */}

            <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6  px-4 lg:px-0 ">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 w-full ">
                    <div className="col-span-1 lg:col-span-2 h-[110px] bg-white rounded-xl p-2 inline-block">
                        <div>
                            <div
                                className='flex justify-between px-4 py-2 rounded-xl hover:cursor-pointer mb-2'
                                onClick={() => handleSectionChange('Careers')}
                            >
                                <div className='flex gap-2'>
                                    <BriefcaseBusiness className={`mr-1 ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`} />
                                    <p className={`font-semibold ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`}>Careers</p>
                                </div>
                                <ChevronRight className={` ${activeSection === 'Careers' ? 'text-primary' : 'text-gray-500'}`} />
                            </div>
                            <hr />
                            <div
                                className='flex justify-between px-4 py-2 rounded-xl hover:cursor-pointer'
                                onClick={() => handleSectionChange('Majors')}
                            >
                                <div className='flex gap-2'>
                                    <GraduationCap className={`mr-1 ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`} />
                                    <p className={`font-semibold ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`}>Majors</p>
                                </div>
                                <ChevronRight className={`font-semibold ${activeSection === 'Majors' ? 'text-primary' : 'text-gray-500'}`} />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-5 bg-white p-6 rounded-xl">
                        {/* Career Section Content */}
                        {activeSection === 'Careers' && (
                            <div>
                                <p className="text-md text-secondary">{currentLocale === 'km' ? 'វិស័យការងារ' : ' Field Of Work:'}</p>
                                <p className="text-lg md:text-xl font-bold text-primary">Child Care and Education</p>
                                <hr className="my-2" />
                                <p className="text-md lg:text-md overflow-hidden text-gray-400 pt-2">
                                    {currentLocale === 'km' ? 'នៅក្នុងវិស័យការងារនេះមានការងារជាច្រើនដូចជា៖' : ' In this field, There are jobs such as:'}

                                </p>
                                <ul className="mt-2 space-y-4 text-slate-500 list-inside list-disc">
                                    {jobs.map((job, index) => (
                                        <div key={index} className="flex justify-between items-center gap-2 ml-2">
                                            <div className="flex items-center ">

                                                <li
                                                    className={`hover:cursor-pointer text-md hover:underline text-gray-600`}
                                                    onClick={() => handleJobClick(job)} // Set the clicked job
                                                >
                                                    {job.title}
                                                </li>
                                            </div>

                                            {/* <Plus className="w-4 h-4" /> */}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeSection === 'Majors' && (
                            // <p className="text-md text-secondary">Majors and related universities...</p>
                            <div>
                                <p className="text-md text-secondary">{currentLocale === 'km' ? 'ជំនាញ' : 'Major:'}</p>
                                <p className="text-lg md:text-xl font-bold text-primary">Child Care and Education</p>
                                <hr className="my-2" />
                                <p className="text-md lg:text-md overflow-hidden text-gray-400 pt-2">
                                    {currentLocale === 'km' ? 'សាកលវិទ្យាល័យដែលអ្នកអាចជ្រើសរើសមានដូចជា៖' : 'There are universities you can choose:'}
                                </p>
                                <ul className="mt-4 space-y-4 text-slate-500 list-inside list-disc">
                                    {jobs.map((job, index) => (
                                        <div key={index} className="flex justify-between items-center gap-2 ml-2">
                                            <div className="flex items-center ">

                                                <li
                                                    className={`hover:cursor-pointer text-md hover:underline ${selectedJob?.uuid === job.uuid ? 'text-primary font-bold' : 'text-gray-600'}`}
                                                    onClick={() => handleJobClick(job)} // Set the clicked job
                                                >
                                                    {job.title}
                                                </li>
                                            </div>

                                            {/* <Plus className="w-4 h-4" /> */}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeSection === 'job' && selectedJob && (
                            <>
                                <div className="flex gap-4">
                                    {/* <div className='bg-slate-100 w-8 h-8 flex justify-center items-center text-gray-500  rounded-full hover:cursor-pointer '><ArrowLeft className='w-5 h-5' /></div> */}
                                    <div>
                                        <p className="text-md text-secondary">{currentLocale === 'km' ? 'ការងារ' : 'Career:'}</p>
                                        <h3 className="text-xl font-semibold text-primary">{selectedJob.title}</h3>

                                    </div>

                                </div>

                                <div>
                                    <p className="text-md lg:text-md overflow-hidden text-gray-400 mt-4">
                                    {currentLocale === 'km' ? 'តម្រូវការក្នុងការងារនេះ' : 'Job Requirements:'}
                                    </p>
                                    <p className="text-md text-slate-500 ">Details and responsibilities for {selectedJob.title}...</p>

                                </div>

                                <div>
                                    <p className="text-md lg:text-md overflow-hidden text-gray-400 mt-4">
                                    {currentLocale === 'km' ? 'ទំនួលខុសត្រូវក្នុងការងារនេះ' : 'Job Responsibilities:'}
                                    </p>
                                    <p className="text-md text-slate-500 ">Details and responsibilities for {selectedJob.title}...</p>

                                </div>


                            </>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
