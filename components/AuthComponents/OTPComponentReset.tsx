// 'use client';
// import React, { useState, useEffect } from "react";
// import OTPValidation from "@/components/AuthComponents/OTPValidation";
// import { IoCloseSharp } from "react-icons/io5";
// import Button from "./ButtonComponentForAuth";
// import { useAppDispatch,useAppSelector } from '@/redux/hooks';
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Image from 'next/image'
// import Link from 'next/link';
// import { useVerifyCodeResetPasswordMutation } from "@/redux/service/auth";
// import { useResendCodeResetPasswordMutation } from "@/redux/service/auth";
// import { setResetCode } from "@/redux/feature/verify/verifySlice";

// function OTPComponentReset() {
//    const [currentLocale, setCurrentLocale] = useState<string>('km');
//   const email = useAppSelector((state) => state.verify.email);
//   const [otp, setOtp] = useState(""); // Store OTP
//   const [resending, setResending] = useState(false); // Track resend state
//   const [verifyCodeResetPassword] = useVerifyCodeResetPasswordMutation()
//   const [resendCodeResetPassword] = useResendCodeResetPasswordMutation();
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const [timer, setTimer] = useState(90); // Countdown timer
//   useEffect(() => {
//             const savedLanguage = localStorage.getItem('language');
//             if (savedLanguage) {
//               setCurrentLocale(savedLanguage);
//             }
//       }, []);
//   useEffect(() => {
//     let countdown: NodeJS.Timeout;
//     if (timer > 0) {
//       countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
//     }
//     return () => clearTimeout(countdown);
//   }, [timer]);

//   console.log("Email from Redux: ", email)
//   // Debugging: Check the email value from Redux
//     useEffect(() => {
//     console.log("Email from Redux:", email);
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       setTimeout(() => {
//         router.push(`/${currentLocale}/forgot-password`);
//         // router.push("/forgot-password");
//       }, 3000); // Redirect after 3 seconds
//     }
//   }, [email, router]);


//   const handleOTPComplete = (otpValue: string) => {
//     setOtp(otpValue); // Store OTP when fully entered
//     console.log("OTP Entered:", otpValue);
//   };

//   const handleSubmit = async () => {
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       router.push(`/${currentLocale}/forgot-password}`);
//       return;
//     }
  
//     console.log("Payload sent to API:", { email, reset_code: otp });
  
//     setIsLoading(true);
//     try {
//       console.log("Payload sent to API:", { email, reset_code: otp });
//       const response = await verifyCodeResetPassword({ email, reset_code: otp }).unwrap();
//       console.log("API Response:", response);
//        // Assuming the API sends the reset_code in the response payload
//        dispatch(setResetCode(otp));
//       toast.success("OTP Verified Successfully!");
//       console.log("Verification Response:", response);
//       setTimeout(() => {
//         router.push(`/${currentLocale}/reset-password`);
//         // router.push("/reset-password"); // Redirect to login page
//       }, 3000);
//     } catch (error) {
//       console.error("Verification Error:", error);
//       toast.error("Failed to verify OTP. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   const handleResendCode = async () => {
//     if (!email) {
//       toast.error("Email is missing. Redirecting to registration.");
//       router.push(`/${currentLocale}/forgot-password}`);
//       return;
//     }
//     console.log("Resend Code Request:", { email });
//     setResending(true); // Set resend state to true
//     try {
//       const response = await resendCodeResetPassword({ email }).unwrap();
//       // Dispatch the OTP (entered by user) as the reset_code
//       dispatch(setResetCode(otp));
//       toast.success("Verification code resent successfully!");
//       console.log("Resend Code Response:", response);
//     } catch (error) {
//       console.error("Resend Code Error:", error);
//       toast.error("Failed to resend verification code. Please try again.");
//     } finally {
//       setResending(false); // Stop loading
//     }
//   };
//   const handleClose = () => {
//     router.push(`/${currentLocale}/forgot-password}`);
//   };
  

//   return (
//     <section className="w-full h-screen flex justify-center items-center ">
//     <div className=" md:m-auto md:border-1 md:border md:border-slate-100 rounded-xl py-7">
//       <div className="px-6 sm:px-8 md:px-6 xl:px-10">
//         <div className="flex justify-between items-center">
//           <Link href="/">
//            <Image src="/auth/logoFile.jpg" width={1000} height={1000} alt="Logo Image"
//                        className="w-20 md:w-24" />
//           </Link>
//           <button
//             className="text-2xl text-gray-500 hover:text-gray-700"
//             onClick={() => handleClose()}
//           >
//             <IoCloseSharp />
//           </button>
//         </div>
//         <div className="h-fit w-fit pt-9 pb-5">
//           <h1 className="text-2xl md:text-3xl font-bold text-primary">ផ្ទៀងផ្ទាត់លេខកូដសម្ងាត់</h1>
//           <p className="pt-4 text-slate-500">
//           យើងបានផ្ញើលេខកូដ 6 ខ្ទង់ទៅកាន់អ៊ីមែលរបស់អ្នក។​ អ្នកមានពេល <span className="font-bold text-primary">{` ${timer}s`}</span> វិនាទី
           
//           </p>
//           <div className="mt-6">
//             <OTPValidation length={6} onComplete={handleOTPComplete} />
//             <div className="text-right mt-3 ">
           
//              <button
//                 className="text-sm text-primary hover:underline font-bold"
//                 onClick={handleResendCode}
//                 disabled={resending}
//               >
//                 {resending ? "កំពុងផ្ញើរលេខសម្ងាត់ទៅអ្នក..." : "ផ្ញើរលេខកូដសម្ងាត់ម្តងទៀត"}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6">
//             <Button
//               type="submit"
//               text="ផ្ទៀងផ្ទាត់"
//               onClick={handleSubmit}
//               isLoading={isLoading}
//               className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <ToastContainer />
//   </section>
//   );
// }

// export default OTPComponentReset;


'use client';
import React, { useState, useEffect } from "react";
import OTPValidation from "@/components/AuthComponents/OTPValidation";
import { IoCloseSharp } from "react-icons/io5";
import Button from "./ButtonComponentForAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { useVerifyCodeResetPasswordMutation, useResendCodeResetPasswordMutation } from "@/redux/service/auth";
import { setResetCode } from "@/redux/feature/verify/verifySlice";
import { useTranslations } from "next-intl";
function OTPComponentReset() {
  const t = useTranslations()
  const [currentLocale, setCurrentLocale] = useState<string>("km");
  const emailFromRedux = useAppSelector((state) => state.verify.email);
  const [email, setEmail] = useState<string | null>(null); // Store email
  const [otp, setOtp] = useState(""); // Store OTP
  const [resending, setResending] = useState(false); // Track resend state
  const [verifyCodeResetPassword] = useVerifyCodeResetPasswordMutation();
  const [resendCodeResetPassword] = useResendCodeResetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(90); // Countdown timer
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Load the language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  // Retrieve email from Redux or localStorage
  useEffect(() => {
    if (emailFromRedux) {
      setEmail(emailFromRedux);
      localStorage.setItem("verificationEmail", emailFromRedux);
    } else {
      const savedEmail = localStorage.getItem("verificationEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      } else {
        toast.error("Email is missing. Redirecting to forgot-password.");
        setTimeout(() => {
          router.push(`/${currentLocale}/forgot-password`);
        }, 3000);
      }
    }
  }, [emailFromRedux, router, currentLocale]);

  // Countdown timer logic
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleOTPComplete = (otpValue: string) => {
    setOtp(otpValue); // Store OTP when fully entered
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Email is missing. Redirecting to forgot-password.");
      router.push(`/${currentLocale}/forgot-password`);
      return;
    }

    setIsLoading(true);
    try {
     verifyCodeResetPassword({ email, reset_code: otp }).unwrap();
      dispatch(setResetCode(otp)); // Save the reset code in Redux
      toast.success("OTP Verified Successfully!");

      // Remove email from localStorage after successful verification
      localStorage.removeItem("verificationEmail");

      // Redirect to reset-password page
      setTimeout(() => {
        router.push(`/${currentLocale}/reset-password`);
      }, 3000);
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email is missing. Redirecting to forgot-password.");
      router.push(`/${currentLocale}/forgot-password`);
      return;
    }

    setResending(true);
    try {
      resendCodeResetPassword({ email }).unwrap();
      toast.success("Verification code resent successfully!");

      // Reset the timer for the next OTP attempt
      setTimer(90);
    } catch (error) {
      console.error("Resend Code Error:", error);
      toast.error("Failed to resend verification code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleClose = () => {
    router.push(`/${currentLocale}/forgot-password`);
  };

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="md:m-auto md:border-1 md:border md:border-slate-100 rounded-xl py-7">
        <div className="px-6 sm:px-8 md:px-6 xl:px-10">
          <div className="flex justify-between items-center">
            <Link href={`/${currentLocale}/`}>
              <Image
                src="/assets/logo-text.jpg"
                width={1000}
                height={1000}
                alt="Logo Image"
                className="w-20 md:w-48"
              />
            </Link>
            <button
              className="text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div className="h-fit w-fit pt-9 pb-5">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {t("VerifyCodeForgot.title")}
            </h1>
            <p className="pt-4 text-slate-500">
              {t("VerifyCodeForgot.description")}{" "}
              <span className="font-bold text-primary">{` ${timer}s`}</span>{" "}
              {t("VerifyCodeForgot.time")}
            </p>
            <div className="mt-6">
              <OTPValidation length={6} onComplete={handleOTPComplete} />
              <div className="text-right mt-3 ">
                <button
                  className="text-sm text-primary hover:underline font-bold"
                  onClick={handleResendCode}
                  disabled={resending}
                >
                  {resending
                    ? "កំពុងផ្ញើរលេខសម្ងាត់ទៅអ្នក..."
                    : t("VerifyCodeForgot.buttonVerifyAgain")}
                </button>
              </div>
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                text={t("VerifyCodeForgot.buttons")}
                onClick={handleSubmit}
                isLoading={isLoading}
                className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default OTPComponentReset;
