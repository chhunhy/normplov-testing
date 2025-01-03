'use client'
import React, { useEffect } from "react";
import { useGetGoogleCallbackQuery } from "@/redux/service/auth";

const GoogleCallbackHandler: React.FC = () => {
  const { data, error, isLoading } = useGetGoogleCallbackQuery(undefined);

  useEffect(() => {
    if (data) {
      // Process tokens and user data
      console.log("Google login successful:", data);
    } else if (error) {
      console.error("Error during Google callback:", error);
    }
  }, [data, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Processing Google login...</div>;
};

export default GoogleCallbackHandler;
