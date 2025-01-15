"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BsBookmark } from "react-icons/bs";
import { MapPin } from "lucide-react";
import { FiEye } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePostBookmarkMutation } from "@/redux/service/user";
import { RootState } from "@/redux/store";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { setBookmark } from "@/redux/feature/jobs/bookmarkSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

type props = {
  uuid: string;
  title: string;
  desc: string;
  image?: string;
  time?: string;
  location?: string;
  isActive?: boolean; // Optional

  created_at_days_ago?: string;
  posted_at_days_ago?: string;
  is_scraped?: boolean;
  bookmarked: boolean;
  visitor_count: number;
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
  //const { locale } = useParams(); // Extract the current locale

  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  //const router = useRouter();

  // Using the postBookmarkMutation hook for handling the bookmark functionality
  const [postBookmark] = usePostBookmarkMutation();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (!token) {
      // If no token, redirect to login
      toast.error("You need to log in before you can bookmark jobs.");
      //router.push(`/${locale}/login`);
      return;
    }

    try {
      // Attempt to bookmark
      await postBookmark({ uuid }).unwrap();

      // Toggle bookmark state
      const newIsBookmarked = !isBookmarked;
      setIsBookmarked(newIsBookmarked);
      dispatch(setBookmark({ uuid, isBookmarked: newIsBookmarked }));

      // Show success toast
      toast.success(
        newIsBookmarked
          ? "Job successfully bookmarked!"
          : "Job removed from bookmarks.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } catch (error: unknown) {
      // Handle backend-specific error
      const errorMessage =
      (error as { data?: { detail?: string } })?.data?.detail ||
      "Failed to update bookmark. Please try again.";

      if (errorMessage.includes("Job is already bookmarked")) {
        toast.info("This job is already bookmarked.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // Generic error message
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }

      //console.error("Error toggling bookmark:", error);
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
          src={
            currentImgSrc || // Use the selected image if available
            (image && image.startsWith("http") // Check if job.logo exists and starts with "http"
              ? image
              : image
              ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${image}` // Prepend the base URL if job.logo exists
              : "/assets/placeholder.jpg") // Fallback to placeholder image
          }
          alt={title || "Job Logo"}
          className="object-fill  lg:w-[150px] md:w-[150px] w-[150px]  h-auto rounded-xl"
          width={1000}
          height={1000}
          onError={() => setImgSrc("/assets/placeholder.png")}
        />
      </div>

      {/* Text Section */}
      <div
        className="lg:col-span-3  md:col-span-3 col-span-4 space-y-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between">
          <h2 className="text-lg lg:text-2xl font-semibold text-slate-600 truncate ">
            {title}
          </h2>
          <div className="flex justify-end text-lime-300 lg:hidden md:hidden">
            {isBookmarked ? (
              <BsBookmarkCheckFill
                className="text-primary text-lg cursor-pointer"
                onClick={handleBookmarkClick}
              />
            ) : (
              <BsBookmark
                className="text-gray-400 text-lg cursor-pointer"
                onClick={handleBookmarkClick}
              />
            )}
          </div>
        </div>
        <p className="text-sm lg:text-lg text-textprimary">{desc}</p>
        {/* create at */}
        <div className="flex flex-wrap gap-2  ">
          <div className="rounded-[5px] text-primary bg-bgPrimaryLight text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-3">
            {is_scraped ? `${created_at_days_ago}` : `${posted_at_days_ago}`}
          </div>
          <div className="rounded-[5px] text-secondary bg-secondary bg-opacity-10 text-opacity-80 text-xs lg:text-sm max-w-fit px-1 lg:px-3">
            {time || "Job Opportunity"}
          </div>
          <div className="lg:hidden md:hidden flex justify-end items-center space-x-2 ">
            <FiEye className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4 text-primary lg:mt-1 md:mt-1 -mt-0" />
            <div className=" text-textprimary text-sm lg:text-base">
              {visitor_count} views
            </div>
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="flex justify-start items-center space-x-2">
            <MapPin className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4  text-slate-500 lg:mt-1 md:mt-1 -mt-0" />
            <div className="mt-1 text-slate-500 text-sm lg:text-base">
              {location ?? "Location not available"}
            </div>
          </div>
          <div className=" lg:flex md:flex hidden justify-end items-center space-x-2 ">
            <FiEye className="lg:w-5 lg:h-5 md:w-5 md:h-5 w-4 h-4 text-slate-500 lg:mt-1 md:mt-1 -mt-0" />
            <div className="mt-1 text-slate-500 text-sm lg:text-base">
              {visitor_count} views
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1  space-y-[65px] lg:block md:block hidden ">
        {/*bookmark*/}
        <div className="flex justify-end text-lime-300">
          {isBookmarked ? (
            <BsBookmarkCheckFill
              className="text-primary text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          ) : (
            <BsBookmark
              className="text-gray-400 text-xl cursor-pointer"
              onClick={handleBookmarkClick}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
