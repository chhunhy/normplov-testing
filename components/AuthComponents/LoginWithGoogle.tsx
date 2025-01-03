import React from "react";
import { useGetGoogleQuery } from "@/redux/service/auth";
import Button from "./ButtonComponentForAuth";
import Image from "next/image";
const LoginWithGoogle: React.FC = () => {
  const { data, error, isLoading } = useGetGoogleQuery(undefined); // Pass undefined as the argument

  const handleLogin = () => {
    if (!isLoading && data) {
      window.location.href = data.redirect_url; // Replace with the URL returned by your backend
    } else if (error) {
      console.error("Error fetching Google login URL:", error);
    }
  };

  return (
    <Button
      type="button"
      text="Login with Google"
      onClick={handleLogin}
      icon={
        <Image
          src="/assets/google.png"
          width={24}
          height={24}
          alt="Google icon"
        />
      }
      className="w-full border-2 border-primary text-textprimary"
    />
    // <button onClick={handleLogin} disabled={isLoading}>
    //   Login with Google
    // </button>
  );
};

export default LoginWithGoogle;
