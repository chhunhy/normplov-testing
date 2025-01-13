// 'use client'
// import React, { useState,useEffect } from 'react'
// import QuizHeader from './QuizHeader'
// import { QuizButton } from './QuizButton'
// import { Link } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { Button } from '../ui/button'
// import { usePathname } from 'next/navigation'

// type props = {
//     chatTitle: string;
//     chatDesc: string;
//     chatButton: string;
//     linkTitle: string;
//     linkDesc: string;
//     linkValue: string;
// }

// export const QuizLinkAndChatContainer = ({ chatTitle, chatDesc, chatButton, linkTitle, linkDesc, linkValue }: props) => {
//     const [currentLocale, setCurrentLocale] = useState<string>('km');
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isCopied, setIsCopied] = useState(false); // State to track if the link has been copied
//      useEffect(() => {
//         const savedLanguage = localStorage.getItem('language');
//         if (savedLanguage) {
//           setCurrentLocale(savedLanguage);
//         }
//       }, []);
//     // Function to copy the link value to the clipboard
//     const handleCopy = () => {
//         navigator.clipboard.writeText(linkValue) // Write the link to the clipboard
//             .then(() => {
//                 setIsCopied(true); // Set state to true if the link was copied successfully
//                 setTimeout(() => setIsCopied(false), 2000); // Reset "Copied" status after 2 seconds
//             })
//             .catch((err) => {
//                 console.error('Failed to copy: ', err);
//             });
//     }

//     const handleClickChat = () => {
//         const newPath = `/${currentLocale}/chat-with-ai`;

//     // Ensure the new path does not contain the duplicate locale part
//     if (!pathname.startsWith(`/${currentLocale}`)) {
//       // If the pathname doesn't include the current locale, add it
//       router.push(newPath);
//     } else {
//       // If the pathname already includes the locale, navigate to the result directly
//       router.push(newPath);
//     }
//     }

//     return (
//         <div className='bg-white '>
//             <div className='max-w-7xl mx-auto p-4 md:p-10 lg:p-12  grid  grid-cols-1 lg:grid-cols-12 gap-4'>
//                 <div className='col-span-1  lg:col-span-4 p-4 md:p-8 lg:p-16 bg-primary w-full md:rounded-xl  rounded-xl space-y-4 lg:space-y-6 place-content-center '>
//                     <QuizHeader title={chatTitle} description={chatDesc} type='quiz' size='sm' />
//                     {/* <QuizButton title={chatButton} full={true} color='#FFA500' onClick={handleClickChat} /> */}

//                     <Button onClick={handleClickChat} className='w-full rounded-xl bg-secondary text-md font-semibold text-white hover:bg-secondary hover:bg-opacity-90'>{chatButton}</Button>

//                 </div>
//                 <div className='col-span-1 lg:col-span-8 p-4 md:p-8 lg:p-16 bg-bgPrimaryLight rounded-none md:rounded-xl  place-content-center'>
//                     <div className=" w-full space-y-4 lg:space-y-6">
//                         {/* <Input type="email" placeholder="http://example.com/link/to/document" className='pl-2 outline-none rounded-xl py-2 bg-white' /> */}

//                         <QuizHeader title={linkTitle} description={linkDesc} type='result' size='sm' />

//                         <div className='flex gap-2'>
//                             <div className="relative w-full">
//                                 {/* Input field with padding to accommodate the icon */}
//                                 <input
//                                     type="text"
//                                     placeholder="http://example.com/link/to/document"
//                                     value={linkValue}
//                                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-textprimary "
//                                     readOnly
//                                 />
//                                 {/* Custom Icon inside the input field */}
//                                 <Link color='#0BBB8A' size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//                             </div>

//                             <QuizButton
//                                 title={isCopied ? 'Copied!' : 'Copy'}
//                                 full={false}
//                                 onClick={handleCopy}
//                             />
//                             <QuizButton
//                                 title={ 'Share'}
//                                 full={false}

//                             />
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }
"use client";
import React, { useState, useEffect } from "react";
import QuizHeader from "./QuizHeader";
import { QuizButton } from "./QuizButton";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
// import { Button } from '../ui/button';
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";


type props = {
  chatTitle: string;
  chatDesc: string;
  chatButton: string;
  linkTitle: string;
  linkDesc: string;
  linkValue: string;
};

export const QuizLinkAndChatContainer = ({
  chatTitle,
  chatDesc,
  chatButton,
  linkTitle,
  linkDesc,
  linkValue,
}: props) => {
  const [currentLocale, setCurrentLocale] = useState<string>("km");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkValue)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleClickChat = () => {
    const newPath = `/${currentLocale}/chat-with-ai`;
    if (!pathname.startsWith(`/${currentLocale}`)) {
      router.push(newPath);
    } else {
      router.push(newPath);
    }
  };

  const handleShare = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const shareToPlatform = (platform: string) => {
    const shareUrl = encodeURIComponent(linkValue);
    const message = encodeURIComponent("Check this out!");
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        "_blank"
      );
    } else if (platform === "instagram") {
      alert(
        "Instagram sharing is not natively supported through a direct link."
      );
    } else if (platform === "telegram") {
      window.open(
        `https://t.me/share/url?url=${shareUrl}&text=${message}`,
        "_blank"
      );
    }
  };

  return (
    <div className="bg-white ">
      <div className="max-w-7xl mx-auto p-4 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 lg:col-span-4 p-4 md:p-8 lg:p-16 bg-primary w-full md:rounded-xl rounded-xl space-y-4 lg:space-y-6 place-content-center">
          <QuizHeader
            title={chatTitle}
            description={chatDesc}
            type="quiz"
            size="sm"
          />
          <Button
            onClick={handleClickChat}
            className="w-full rounded-xl bg-secondary text-md font-semibold text-white hover:bg-secondary hover:bg-opacity-90"
          >
            {chatButton}
          </Button>
        </div>
        <div className="col-span-1 lg:col-span-8 p-4 md:p-8 lg:p-16 bg-bgPrimaryLight rounded-none md:rounded-xl place-content-center">
          <div className="w-full space-y-4 lg:space-y-6">
            <QuizHeader
              title={linkTitle}
              description={linkDesc}
              type="result"
              size="sm"
            />
            <div className="flex gap-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="http://example.com/link/to/document"
                  value={linkValue}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none text-textprimary"
                  readOnly
                />
                <Link
                  color="#0BBB8A"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              <QuizButton
                title={isCopied ? "Copied!" : "Copy"}
                full={false}
                onClick={handleCopy}
              />
              <QuizButton title={"Share"} full={false} onClick={handleShare} />
            </div>
          </div>
        </div>
      </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white rounded-[8px] p-6 max-w-sm mx-3 sm:max-w-xl lg:w-2/5 relative">
            <button onClick={closeModal} className="absolute top-3 right-3">
              <X className="w-5 h-5  text-gray-600" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-600">
              Share this Result
            </h2>
            <p className="text-gray-500">
              អនុញ្ញាតឱ្យគ្រួសារនិងមិត្តភក្តិរបស់អ្នកអាចមើលឃើញពីលទ្ធផលរបស់អ្នកដោយការចែករំលែកតំណភ្ជាប់នេះ
            </p>
            {/* <div className='bg-red-300 max-w-md mx-auto '> */}
            <div className="flex justify-between mt-3 sm:mt-0 mx-auto sm:mx-0">
              <div className="flex  items-center gap-7 mx-auto sm:mx-0">
              <div className="">
                  <button
                    onClick={handleCopy}
                    className="flex flex-col mx-auto items-center border border-slate-200 p-2.5 rounded-full"
                  >
                    <Image
                      src="/auth/link1.png"
                      alt="copy link"
                      width={1000}
                      height={1000}
                      className="h-7 w-7"
                    />
                  </button>
                  <span className="text-gray-500 text-sm">Copy Link</span>
                </div>
                <div className=" ">
                  <button
                    onClick={() => shareToPlatform("facebook")}
                    className="flex flex-col h-14 w-14 mx-auto items-center  border border-slate-200 p-2 rounded-full"
                  >
                    <Image
                      src="/auth/facebook.png"
                      alt="facebook"
                      width={1000}
                      height={1000}
                      className="text-center"
                    />
                  </button>
                  <span className="text-gray-500 text-sm">Facebook</span>
                </div>
                
                <div className="mx-auto">
                  <button
                    onClick={() => shareToPlatform("telegram")}
                    className="flex flex-col mx-auto items-center border border-slate-200 p-2 rounded-full"
                  >
                    <Image
                      src="/auth/telegram.png"
                      alt="telegram"
                      width={1000}
                      height={1000}
                      className="h-8 w-8"
                    />
                  </button>
                  <span className="text-gray-500 text-sm">Telegram</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="h-40 w-40 ">
                  <Image
                    src="/Quiz/optQuiz/Skills.png"
                    width={1000}
                    height={1000}
                    alt="skills"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
            {/* </div> */}

           
          </div>
        </div>
      )}
    </div>
  );
};
