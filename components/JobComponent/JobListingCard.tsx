"use client";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmark } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { FiEye } from "react-icons/fi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePostBookmarkMutation } from "@/redux/service/user";
import { RootState } from "@/redux/store";
import { BsBookmarkCheckFill } from "react-icons/bs";
import {
  setBookmark,
  initializeBookmarks,
} from "@/redux/feature/jobs/bookmarkSlice";

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
  bookmarked: boolean;
  visitor_count:number;
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
  bookmarked,
  visitor_count,
  is_scraped,
  onClick,
}: props) => {
  const [currentImgSrc, setImgSrc] = useState<string | StaticImageData>(
    `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}`
  );

  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  // Using the postBookmarkMutation hook for handling the bookmark functionality
  const [postBookmark] = usePostBookmarkMutation();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (!token) {
      alert("You must log in to bookmark a job.");
      return;
    }

    try {
      const response = await postBookmark({ uuid }).unwrap();
      console.log("Bookmark result:", response);

      // Update state and Redux
      setIsBookmarked((prev) => !prev);
      dispatch(setBookmark({ uuid, isBookmarked: !isBookmarked }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
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
        className="col-span-1 place-content-start place-items-start cursor-pointer"
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
      <div className="col-span-3  space-y-2 cursor-pointer" onClick={onClick}>
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
            {visitor_count } views
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
        {/*bookmark*/}
        <div className="flex justify-end text-lime-300">
          {isBookmarked ? (
            <BsBookmarkCheckFill
              className="text-primary text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          ) : (
            <BsBookmark
              className="text-gray-500 text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          )}
        </div>
        <div className="flex justify-end">
          <div>
            <div className=" flex justify-start items-start space-x-2">
              <HiOutlineCalendarDateRange className="lg:w-5   lg:h-5 md:w-5 md:h-5 w-4 h-4 text-textprimary lg:mt-1 md:mt-1 -mt-0" />
              <div className=" flex text-textprimary mt-1 text-sm lg:text-base lg:mb-1 md:mb-2">
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
