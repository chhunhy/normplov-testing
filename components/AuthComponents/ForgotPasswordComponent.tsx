'use client';
import React, { useState,useEffect } from "react";
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { IoCloseSharp } from 'react-icons/io5';
import Label from './LabelComponent';
import DynamicField from './AuthField';
import ErrorDynamic from './ErrorComponent';
import Button from './ButtonComponentForAuth'; // Adjust the import path as needed
import { useForgotPasswordMutation } from '@/redux/service/auth';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useAppDispatch } from '@/redux/hooks';
import { setEmail } from '@/redux/feature/verify/verifySlice';
import Image from 'next/image'
import Link from 'next/link';
type ValueTypes = {
    email: string;
};

const initialValues: ValueTypes = {
    email: '',
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('អ៉ីម៉ែលរបស់អ្នកមិនត្រឹមត្រូវ').required('អ្នកត្រូវបញ្ជូលអ៉ីម៉ែលរបស់អ្នក'),
});

const ForgotPasswordComponent = () => {
  const [currentLocale, setCurrentLocale] = useState<string>('km');
  const [forgotPassword]=useForgotPasswordMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
          setCurrentLocale(savedLanguage);
        }
      }, []);
  const handleForgotPassword = async (values:ValueTypes)=>{
    setIsLoading(true);
    const { email } = values;
    try{
      const response = await forgotPassword({ email }).unwrap();
      toast.success(response.message || "Password reset email sent successfully!");
      dispatch(setEmail(email));
      // Optionally, navigate to a confirmation page
      setTimeout(() => {
        router.push(`/${currentLocale}/verify-code-forgot}`);
        // router.push("/verify-code-forgot"); // Update the path to your actual confirmation page
      });
    }catch(error:unknown){
      console.error("Forgot Password Error:", error);

      if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
        const typedError = error as { status: number; data: { detail?: string; message?: string } };

        if (typedError.data?.detail) {
          // Specific error message like "User with this email does not exist."
          toast.error(typedError.data.detail);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An unknown error occurred.");
      }
    }finally {
      setIsLoading(false);
    }
    
  }
  const handleClose = () => {
    //  href={`/${currentLocale}/login`}
     router.push(`/${currentLocale}/login}`); // Redirect to the referrer
  };

  return (
    
    <section className="w-full  h-screen flex justify-center items-center ">
        <div className='m-auto md:w-1/2 lg:w-1/3 p-8 border-1 border bg-white border-slate-100 rounded-xl'>
        <div className="">
            {/* Close Button - Left Aligned */}
            <div className="mb-5 flex justify-between ">
             <Link href="/">
             <Image
                     src="/auth/logoFile.jpg"
                      width={1000} height={500}
                        alt="Logo Image"
                        className="bg-red-200 w-20"
                      />
             </Link>
                <div className="">
                <button
                    className="text-2xl text-gray-500 hover:text-gray-700"
                    onClick={() => handleClose()}
                >
                    <IoCloseSharp />
                </button>
                </div>
          </div>
        <div className="bg-white">
          <h1 className="text-3xl pb-3 font-bold text-primary">ភ្លេចពាក្យសម្ងាត់</h1>
          <p className=' text-slate-400'>សូមបញ្ចូលអ៉ីម៉ែល ដើម្បីទទួលបានលេខកូដផ្ទៀងផ្ទាត់</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleForgotPassword(values);
              console.log('Form Submitted:', values);
              setSubmitting(false); // Simulate a submission delay
            }}
          >
            {({}) => (
              <Form>
                <div className="space-y-4 mt-8">
                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" text="អ៉ីម៉ែល" required />
                    <DynamicField
                      type="text"
                      name="email"
                      id="email"
                      placeholder="បញ្ចូលអ៉ីម៉ែលរបស់អ្នក"
                    />
                    <ErrorDynamic  name="email" component="div" />
                  </div>

                  
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <Button
                    type="submit"
                    text="ផ្ញើលេខសម្ងាត់"
                    isLoading={isLoading} // Show loading spinner when the form is submitting
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

export default ForgotPasswordComponent;
