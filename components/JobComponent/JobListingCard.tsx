"use client";
import React, { useState,useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmark } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { FiEye } from "react-icons/fi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { useAppSelector } from "@/redux/hooks";
import { usePostBookmarkMutation } from "@/redux/service/user";
import { RootState } from "@/redux/store";
import { BsBookmarkCheckFill } from "react-icons/bs";

type props = {
  uuid: string;
  title: string;
  desc: string;
  image?: string;
  time?: string;
  location?: string;
  isActive?: boolean; // Optional
  closing_date: string;
  created_at_days_ago?: string;
  posted_at_days_ago?: string;
  is_scraped?: boolean;
  onClick?: () => void;
};



export const JobListingCard = ({
  uuid,
  title,
  desc,
  image,
  time,
  location,
  isActive,
  closing_date,
  created_at_days_ago,
  posted_at_days_ago,
  is_scraped,
  onClick,
}: props) => {
  const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
    `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}`
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Use Redux to get the token from the store
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [postBookmark] = usePostBookmarkMutation();


  // Check localStorage for bookmark status on load
  useEffect(() => {
    const storedBookmarkStatus = localStorage.getItem(`bookmark-${uuid}`);
    if (storedBookmarkStatus) {
      setIsBookmarked(JSON.parse(storedBookmarkStatus));
    } else {
      // Fetch from API if no stored value exists
      const checkBookmarkStatus = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}api/v1/bookmarks/${uuid}`
          );
          if (response.ok) {
            const data = await response.json();
            setIsBookmarked(data.isBookmarked);
            localStorage.setItem(`bookmark-${uuid}`, JSON.stringify(data.isBookmarked)); // Persist status in localStorage
          }
        } catch (error) {
          console.error("Error fetching bookmark status:", error);
        }
      };

      checkBookmarkStatus();
    }
  }, [uuid]);

  const handleBookmarkClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!token) {
      alert("Please log in to bookmark this job.");
      return;
    }

    try {
      const response = await postBookmark({ uuid }).unwrap();
      console.log("Bookmark Response:", response);
      setIsBookmarked(true);  // Set the job as bookmarked and update the icon
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to bookmark the job.");
    }
  };

  return (
    <div
      className={`grid grid-cols-5 w-full border  border-gray-100 bg-white p-4 gap-4 rounded-xl justify-start items-start  hover:bg-slate-100 focus:bg-gray-100 transition-colors ${
        isActive ? "bg-gray-200" : ""
      } `}
    >
      {/* Image Section */}
      <div
        className="col-span-1 place-content-start place-items-start"
        onClick={onClick}
      >
        <Image
          src={currentImgSrc}
          alt="Technique Illustration"
          width={100}
          height={100}
          className="object-fill  w-[150px]  h-auto rounded-xl"
          onError={() => setImgSrc("/assets/placeholder.png")}
        />
      </div>

      {/* Text Section */}
      <div className="col-span-3  space-y-2 " onClick={onClick}>
        <h2 className="text-lg lg:text-2xl font-semibold text-primary truncate ">
          {title}
        </h2>
        <p className="text-sm lg:text-lg text-textprimary">{desc}</p>
        <div className="flex space-x-6">
          <div className="flex justify-start items-center space-x-2">
            <MapPin className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4  text-secondary lg:mt-1 md:mt-1 -mt-0" />
            <div className="mt-1 text-textprimary text-sm lg:text-base">
              {location}
            </div>
          </div>
          <div className="flex justify-start items-center space-x-2">
            <FiEye className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4 text-primary lg:mt-1 md:mt-1 -mt-0" />
            <div className="mt-1 text-textprimary text-sm lg:text-base">
              240 views
            </div>
          </div>
        </div>
        {/* create at */}
        <div className="flex flex-wrap gap-2">
          <div className="rounded-[8px] text-primary bg-bgPrimaryLight text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-2">
            {is_scraped ? `${created_at_days_ago}` : `${posted_at_days_ago}`}
          </div>
          <div className="rounded-[8px] text-secondary bg-secondary bg-opacity-10 text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-2">
            {time}
          </div>
        </div>
      </div>
      <div className="col-span-1  space-y-[65px] ">
        <div className="flex justify-end">
          {
            // Conditionally render the icon based on the `isBookmarked` state
            isBookmarked ? (
              <BsBookmarkCheckFill
                className="text-xl cursor-pointer text-primary"
                onClick={handleBookmarkClick}
              />
            ) : (
              <BsBookmark
                className="text-xl cursor-pointer text-textprimary"
                onClick={handleBookmarkClick}
              />
            )
          }
        </div>
        <div className="flex justify-end">
          <div>
            <div className=" flex justify-start items-start space-x-2">
              <HiOutlineCalendarDateRange className="lg:w-5   lg:h-5 md:w-5 md:h-5 w-4 h-4 text-textprimary lg:mt-1 md:mt-1 -mt-0" />
              <div className=" flex text-textprimary mt-1 text-sm lg:text-base mb-1">
                Closing Date
              </div>
            </div>
            <div className="flex justify-center  rounded-[8px] text-accent bg-accent bg-opacity-10 text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-2">
              {closing_date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 