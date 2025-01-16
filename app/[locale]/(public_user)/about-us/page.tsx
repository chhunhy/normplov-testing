"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardTeam from "@/components/About-us/CardTeam";
import { useParams } from "next/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';  // Make sure you import the CSS for animations
import { useEffect } from 'react';



export default function AboutUs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true
      // Animation duration (in ms)
        // Whether animation should happen only once
    });
  }, []);
  const { locale } = useParams();
  return (
    <div className=" bg-slate-50">

      <section className="grid grid-cols-1 bg-green-50 lg:grid-cols-2 md:grid-cols-1 gap-2 lg:px-[100px]  md:px-20 px-10 lg:h-[650px]  md:h-auto h-[1050px]">
        <div className="max-w-7xl mx-auto my-4 md:my-6 space-y-6 py-10 ">
          

          <h1 data-aos="zooom-in-left" className="text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">
            <span className="text-secondary">ការណែនាំអំពី</span>
            នាំផ្លូវ
          </h1>
          <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
            ជួយសិស្សថ្នាក់មធ្យមសិក្សាទុតិយភូមិ
            ក្នុងការជ្រើសរើសមុខវិជ្ជាសិក្សានៅសាកលវិទ្យាល័យដោយផ្តល់ឱ្យពួកគេនូវ
            ឱកាសសិក្សាស្វែងយល់អំពីសមត្ថភាព ការចាប់អារម្មណ៍ និងគោលដៅអនាគត។
            យើងបំពេញបេសកកម្មនេះតាមរយៈការធ្វើតេស្តលើ បុគ្គលិកលក្ខណៈ
            តាមចំណាប់អារម្មណ៍ តាមគុណតម្លៃ ភាពខ្លាំងខ្សោយ តាមរបៀបសិក្សា
            និងការចែករំលែកចំណេះដឹងពីវិស័យនានា។
          </p>
          <div className="py-4">
            <Link
              href={`/${locale}/test`}
              className="bg-emerald-500  text-white px-6 py-2 md:px-8 md:py-2 lg:px-8 lg:py-3 rounded-xl text-md md:text-lg lg:text-lg hover:bg-emerald-600 transition-colors"
            >
              ចាប់ផ្តើម
            </Link>
          </div>
        </div>
        <div className="flex  justify-center items-start w-full h-[700px]  py-10">
          <div>
            <div className=" absolute  lg:ml-14 md:ml-4 bg-green-100 lg:w-[600px] md:w-[550px] animate-pulse h-[400px] lg:mt-20 md:mt-24 rounded-xl"></div>
            <Image
              src="/assets/cover-about.jpg"
              width={1000}
              height={1000}
              className="relative w-[570px] lg:h-64 md:h-auto h-40 lg:ml-40 md:ml-[50px] rounded-xl mt-8 object-fill "
              alt=""
              data-aos="flip-left"
            />
            
            
              <Image
              src="/assets/cover-about.jpg"
              width={1000}
              height={1000}
              className=" relative lg:ml-0 md:-ml-0 w-[450px] h-50 mr-10 rounded-xl mt-8 object-fill"
              alt=""
              data-aos="flip-left"
            />
          
            
          </div>
        </div>
      </section>
      <section>
        <section className="flex bg-pr lg:px-20  md:px-0 px-0 mt-10  max-w-full justify-center  " data-aos="slide-up">
          <div className="flex max-w-[92%] mx-auto  my-4 md:my-6 bg-white bg-opacity-90 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[60%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">
                គោលបំណង
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
                ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[300px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="lg:px-20 md:px-0 px-0 max-w-full justify-center  hidden md:flex lg:flex " data-aos="slide-up">
          <div className="flex max-w-[92%] mx-auto my-4 md:my-6 bg-primary bg-opacity-5 p-10 rounded-2xl ">
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className=" flex justify-start">
                <Image
                  src="/assets/Create-bro.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[340px]  rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
            <div className="mt-10 space-y-4 lg:w-[65%] md:w-[70%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl  font-semibold text-end">
                ចក្ខុវិស័យ
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed text-end">
                ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
            
          </div>
        </section>
        <section className="flex bg-pr lg:px-20  md:px-0 px-0   max-w-full justify-center md:hidden lg:hidden " data-aos="slide-up">
          <div className="flex max-w-[92%] mx-auto  my-4 md:my-6 bg-primary bg-opacity-5 lg:p-10 md:p-10 p-4 rounded-2xl ">
            <div className=" space-y-4 lg:w-[65%] md:w-[60%] h-auto">
              <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold">
              ចក្ខុវិស័យ
              </div>
              <p className="text-textprimary lg:text-2xl md:text-2xl text-xl leading-relaxed">
              ក្រុមរបស់យើងប្តេជ្ញាចិត្តក្នុងការផ្តល់ជូននូវធនធាន ការណែនាំ
                និងការគាំទ្រដែលអ្នកត្រូវការដើម្បីធ្វើការសម្រេចចិត្តដោយមានព័ត៌មានគ្រប់គ្រាន់អំពីអនាគតរបស់អ្នក។
                ជាមួយនឹងឧបករណ៍ និងការណែនាំរបស់យើង
                អ្នកនឹងមានទំនុកចិត្តក្នុងការជ្រើសរើសផ្លូវការសិក្សាដែលត្រូវនឹងគោលដៅ
                និងក្តីស្រមៃរបស់អ្នក។
              </p>
            </div>
            <div className=" lg:block md:block hidden lg:w-[35%] md:w-[40%]    ">
              <div className="flex lg:justify-end md:justify-end  lg:items-start md:items-center">
                <Image
                  src="/assets/Next steps-pana.png"
                  width={1000}
                  height={1000}
                  className=" relative lg:w-[400px] lg:h-[400px] md:w-[420px] md:h-[300px] rounded-xl object-fill lg:-mt-8 md:mt-8"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="max-w-7xl mt-4  mx-auto my-4 md:my-6 flex justify-center ">
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">
          អ្នកណែនាំ
        </div>
      </section>
      <section className="flex px-20   max-w-full lg:h-[650px] md:h-[500px] h-[700px] py-20  justify-center  ">
        <div className="lg:flex md:flex lg:space-x-[200px] md:space-x-[100px]   max-w-7xl mx-auto my-4 md:my-6  ">
          <div className=" mb-10" data-aos="slide-up">
            <Image
              src="/assets/cher_mey.png"
              width={1000}
              height={1000}
              className=" lg:w-[390px] lg:h-[320px]  md:w-[260px] md:h-[220px] w-[240px] h-[200px]  "
              alt=""
            />
            <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[10px]">
              អ្នកគ្រូ មុំ រស្មី
            </div>
            <div className="flex mr-6  justify-center text-textprimary text-2xl mt-4">
              <ul className="wrapper">
                <li className="icon facebook">
                  <span className="tooltip">Facebook</span>
                  <a
                    href="https://www.facebook.com/mom.reksmey.12?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="1.2em"
                      viewBox="0 0 320 512"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </a>
                </li>
                <li className="icon twitter">
                  <span className="tooltip">Telegram</span>
                  <a
                    href="https://t.me/reksmey_mom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="telegram"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      height="1.8em"
                    >
                      <path d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z M34.217,14.77l-3.671,17.32 c-0.275,1.286-1.042,1.601-2.104,0.999l-5.8-4.281l-2.8,2.687c-0.309,0.309-0.566,0.566-1.161,0.566l0.414-5.882L30.74,17.54 c0.466-0.414-0.1-0.64-0.724-0.227l-13.2,8.301l-5.67-1.773c-1.231-0.389-1.26-1.231,0.257-1.832l22.207-8.56 C33.486,13.507,34.767,13.993,34.217,14.77z"></path>
                    </svg>
                  </a>
                </li>
                <li className="icon instagram">
                  <span className="tooltip">GitHub</span>
                  <a
                    href="https://github.com/Reksmeys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      height="1.2em"
                      className="bi bi-github"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.98c.68.003 1.37.092 2.01.27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" " data-aos="slide-up">
            <Image
              src="/assets/cher_leang copy 2.png"
              width={1000}
              height={1000}
              className="lg:w-[390px] lg:h-[320px]  md:w-[260px] md:h-[220px] w-[240px] h-[200px]"
              alt=""
            />
            <div className="flex mr-6 justify-center text-textprimary text-2xl mt-[10px]">
              លោកគ្រូ​ អ៉ឹង មួយលាង
            </div>
            <div className="flex mr-6 justify-center text-textprimary text-2xl mt-4">
              <ul className="wrapper">
                <li className="icon facebook">
                  <span className="tooltip">Facebook</span>
                  <a
                    href="https://www.facebook.com/mom.reksmey.12?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="1.2em"
                      viewBox="0 0 320 512"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </a>
                </li>
                <li className="icon twitter">
                  <span className="tooltip">Telegram</span>
                  <a
                    href="https://t.me/reksmey_mom"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      className="telegram"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      height="1.8em"
                    >
                      <path d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z M34.217,14.77l-3.671,17.32 c-0.275,1.286-1.042,1.601-2.104,0.999l-5.8-4.281l-2.8,2.687c-0.309,0.309-0.566,0.566-1.161,0.566l0.414-5.882L30.74,17.54 c0.466-0.414-0.1-0.64-0.724-0.227l-13.2,8.301l-5.67-1.773c-1.231-0.389-1.26-1.231,0.257-1.832l22.207-8.56 C33.486,13.507,34.767,13.993,34.217,14.77z"></path>
                    </svg>
                  </a>
                </li>
                <li className="icon instagram">
                  <span className="tooltip">GitHub</span>
                  <a
                    href="https://github.com/Reksmeys"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      height="1.2em"
                      className="bi bi-github"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.98c.68.003 1.37.092 2.01.27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-full h-[200px] lg:mt-0 md:-mt-[20px] mt-[190px]  items-center  bg-white mx-auto   flex justify-center ">
        <div className=" text-primary lg:text-4xl md:text-4xl text-3xl font-semibold ">
          សមាជិកក្រុម
        </div>
      </section>
      <section className=" bg-white flex  justify-center">
        <CardTeam />
      </section>
    </div>
  );
}
