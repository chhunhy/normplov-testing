"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from 'aos';
import 'aos/dist/aos.css';  // Make sure you import the CSS for animations



export default function CardTeam() {
  const [ , setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 120,
      once: true
      // Animation duration (in ms)
        // Whether animation should happen only once
    });
  }, []);
  return (
    <div className=" h-auto   grid w-auto auto-rows-fr grid-cols-1 lg:gap-[120px] md:gap-[100px] gap-3  lg:grid-cols-3 md:grid-cols-2 mb-10">
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/lyminh copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Phy Lymann</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
            BACK-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/roza copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Yeng Sokroza</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/sovanarith copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Hout Sovannarith</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/seavmey.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Channtha Seamey</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/Chhunhy copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Chhem Chhunhy</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
      <div className="text-center" data-aos="slide-up">
        <div className="flex justify-center">
          <Image
            src="/assets/kimla copy.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[250px] "
          />
        </div>
        <div className=" space-y-2">
          <div className="text-2xl text-textprimary -mt-3">Chhoeurn Kimla</div>
          <div className="text-lg text-primary   flex justify-center ">
            <h1 className="bg-primary  px-4 rounded-xl bg-opacity-5  ">
              FRONT-END DEVELOPER
            </h1>
          </div>
          <div className="flex items-start   justify-center text-textprimary text-2xl ">
            <ul className="wrapper ">
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
    </div>
  );
}
