'use client';
import React, { useState,useEffect } from "react";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { IoCloseSharp } from 'react-icons/io5';
import Label from './LabelComponent';
import ErrorDynamic from './ErrorComponent';
import PasswordField from './PasswordField';
import Button from './ButtonComponentForAuth'; // Adjust the import path as needed
import { useResetPasswordMutation } from '@/redux/service/auth';
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';

type ValueTypes = {
    new_password: string;
    confirm_password:string;
};

const initialValues: ValueTypes = {
    new_password: '',
    confirm_password: '',
};
const strongPasswordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*]).{8,}$");
const validationSchema = Yup.object().shape({
    new_password: Yup.string()
     .min(8, "ពាក្យសម្ងាត់ថ្មីគឺខ្លីពេក, សូមបញ្ជូលអោយបាន 8 តួរ")
    .matches(strongPasswordRegex, "ពាក្យសម្ងាត់របស់អ្នកត្រូវតែមានអក្សរធំ អក្សរតូច និង​និមិត្តសញ្ញាពិសេស")
    .required("ពាក្យសម្ងាត់ថ្មីត្រូវតែបញ្ជូល"),
    confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "ពាក្យសម្ងាត់ថ្មីត្រូវតែដូចជាមួយការបញ្ជាក់ពាក្យសម្ងាត់")
    .required("អ្នកត្រូវបញ្ជូលបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក"),
});

const ResetPasswordComponent = () => {
    const email = useAppSelector((state) => state.verify.email); // Get email from Redux
    const reset_code = useAppSelector((state) => state.verify.reset_code); // Get reset code from Redux
    const [isLoading, setIsLoading] = useState(false);
    const [resetPassword] = useResetPasswordMutation(); // API call for resetting the password
    const router = useRouter();
    console.log("Email from Redux: ", email)
    console.log("Reset code from Redux: ", reset_code)
    useEffect(() => {
        if (!email || !reset_code) {
          console.error("Email or reset code is missing:", { email, reset_code });
          toast.error("Missing email or reset code. Redirecting to Forgot Password.");
          setTimeout(() => {
            router.push("/forgot-password");
          }, 3000);
        }
      }, [email, reset_code, router]);
      
    const hanldeResetPassword = async(values:ValueTypes)=>{
        if (!email || !reset_code) {
            toast.error("Missing email or reset code. Redirecting to Forgot Password.");
            router.push("/forgot-password");
            return;
          }

        setIsLoading(true);
        try{
            const { new_password, confirm_password } = values;
            // Call the reset password API
            const response = await resetPassword({ email, reset_code, new_password, confirm_password }).unwrap();
            toast.success(response.message || "Password reset successfully!");
            console.log("Password Reset Response:", response);
            // Redirect to login page
            setTimeout(() => {
            router.push("/login");
            });

        }catch(error){
            console.error("Reset Password Error:", error);
           
            if (error && typeof error === "object" && "status" in error && "data" in error) {
            const typedError = error as { status: number; data: { detail?: string; message?: string } };
            toast.error(typedError.data?.detail || "Failed to reset password. Please try again.");
            } else {
                toast.error("An unknown error occurred.");
            }
        }finally {
            setIsLoading(false);
          }
    }
    const handleClose = () => {
        router.push("/forgot-password"); // Redirect to the referrer
      };

  return (
    <section className="w-full h-screen flex justify-center items-center ">
        <div className='w-full mx-3 md:w-1/2 lg:w-1/3 p-6 m-auto border-1 border border-slate-100 rounded-xl'>
            <div className="">
                {/* <div className='flex justify-end mt-3'> */}
                <div className="flex justify-between items-center pb-5">
            <Link href="/">
              <Image src="/auth/logoFile.jpg" width={1000} height={1000} alt="Logo Image"
              className="w-20 md:w-24" />
            </Link>
            <div>
              <button
                className="text-2xl text-gray-500 hover:text-gray-700"
                onClick={() => handleClose()}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
                <div className="">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary">បង្កើតពាក្យសម្ងាត់ថ្មី</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                        hanldeResetPassword(values);
                        console.log('Form Submitted:', values);
                        setSubmitting(false); // Simulate a submission delay
                    }}
                    >
                    {({}) => (
                        <Form>
                            {/* Form For Register */}
                            <div className="space-y-6 mt-4 lg:mt-6">
                                {/* Password Field */}
                                <div>
                                    <Label htmlFor="new_password" text="ពាក្យសម្ងាត់ថ្មី" required />
                                    <PasswordField
                                        name="new_password"
                                        id="new_password"
                                        placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                                        className="custom-class mt-1"
                                    />
                                    <ErrorDynamic  name="new_password" component="div" />
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <Label htmlFor="confirm_password" text="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" required />
                                    <PasswordField
                                        name="confirm_password"
                                        id="confirm_password"
                                        placeholder="បញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                                        className="custom-class mt-1"
                                    />
                                    <ErrorDynamic  name="confirm_password" component="div" />
                                </div>

                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <Button
                                    type="submit"
                                    text="រួចរាល់"
                                    isLoading={isLoading}
                                    className="w-full bg-primary hover:bg-primary text-white font-medium border-collapse"
                                />
                            </div>
                        </Form>
              
                    )}
           
                    </Formik>
                    <ToastContainer />
                </div>
            </div>
        </div>
      
    </section>
  );
};

export default ResetPasswordComponent;