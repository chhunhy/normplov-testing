// import ResultShareDynamicComponent from '@/components/QuizComponent/QuizPageComponent/ResultShareDynamicComponent';
// import React from 'react'


// export async function generateMetadata({ params }: { params: { resultType: string; uuid: string } }) {
//   const quizTitles: Record<string, string> = {
//     personality: "Personality Assessment Result",
//     skill: "Skill Assessment Result",
//     interest: "Interest Assessment Result",
//     value: "Value Assessment Result",
//     learningStyle: "Learning Style Assessment Result",
//   };

//   const projectName = "NormPlov";
//   const resultTitle = quizTitles[params.resultType] || "Assessment Result";

//   const keywords = [
//     "NormPlov",
//     "quiz",
//     "assessment",
//     "career path",
//     params.resultType, 
//   ];
//   return {
//     title: `${resultTitle} | ${projectName}`,
//     description: `Explore your detailed ${resultTitle} at ${projectName}. Gain insights and recommendations tailored to you.`,
//     openGraph: {
//       title: `${resultTitle} | ${projectName}`,
//       description: `Discover your personalized ${resultTitle} and unlock your potential with insights from ${projectName}.`,
//       images: [
//         {
//           url: "/Quiz/stepup.png", 
//           width: 1000,
//           height: 1000,
//           alt: `${resultTitle} Thumbnail`,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${resultTitle} | ${projectName}`,
//       description: `Dive into your ${resultTitle} and uncover new insights into your career path.`,
//       images: ["/Quiz/stepup.png"],
//     },
//     meta: [
//       {
//         name: "keywords",
//         content: keywords.join(", "), 
//       },
//     ],
//   };
// }
// export default function page() {

//   return (
//     <div className='bg-bgPrimaryLight'>
//       <ResultShareDynamicComponent />
//     </div>

//   )
// }
// import type { Metadata } from "next"
import ResultShareDynamicComponent from "@/components/QuizComponent/QuizPageComponent/ResultShareDynamicComponent"

// const API_BASE_URL = "https://normplov-api.istad.co/api/v1"
// const DEFAULT_IMAGE = "/Quiz/stepup.png"

// async function fetchShareableLink(uuid: string): Promise<string> {
//   const response = await fetch(`${API_BASE_URL}/test/generate-shareable-link/${uuid}`)
//   if (!response.ok) throw new Error("Failed to fetch shareable link")
//   const data = await response.json()
//   return data.payload?.shareable_link || ""
// }

// async function generateSeoImage(uuid: string): Promise<string> {
//   const response = await fetch(`${API_BASE_URL}/test/${uuid}/save-image`, { method: "POST" })
//   if (!response.ok) throw new Error("Failed to generate SEO image")
//   const data = await response.json()
//   return data.payload?.file_name ? `${API_BASE_URL}/test/image/${data.payload.file_name}` : DEFAULT_IMAGE
// }

// export async function generateMetadata({
//   params,
// }: { params: { resultType: string; uuid: string } }): Promise<Metadata> {
//   const { resultType, uuid } = params
//   const title = "Discover Your Personality Test Result!"
//   const description = "Uncover fascinating insights about yourself with our in-depth personality analysis."

//   try {
//     const [shareableLink, seoImageUrl] = await Promise.all([fetchShareableLink(uuid), generateSeoImage(uuid)])

//     const metadata: Metadata = {
//       title,
//       description,
//       openGraph: {
//         title,
//         description,
//         type: "website",
//         url: shareableLink || `https://normplov.istad.co/share-tests/${resultType}/${uuid}`,
//         images: [
//           {
//             url: seoImageUrl,
//             width: 1200,
//             height: 630,
//             alt: "Your Unique Personality Test Result",
//           },
//         ],
//         siteName: "NormPlov Personality Insights",
//       },
//       twitter: {
//         card: "summary_large_image",
//         title,
//         description,
//         images: [seoImageUrl],
//       },
//     }

//     return metadata
//   } catch (error) {
//     console.error("Error generating metadata:", error)
//     return {
//       title,
//       description,
//     }
//   }
// }
export const metadata = {
  title: "Quiz Page | NormPlov",
  description: "Explore various assessments at NormPlov, including Personality, Interest, Value, Learning Style, and Skill test, to discover your potential and ideal career path!",
  keywords: [
    "NormPlov",
    "test",
    "career",
    "personality test",
    "interest test",
    "value test",
    "learning style test",
    "skills test",
    "Career test",
    "Career Quiz",
    "guide",
    "holland Code",
    "RAISEC",
    "MBTI",
    "16 Personality",
    "នាំផ្លូវ",
    "តេស្តអាជីពការងារ",
    "តេស្តបុគ្គលិកលក្ខណៈ",
    "តេស្តវាយតម្លៃតាម​ចំណាប់អារម្មណ៍",
    "តេស្តវាយតម្លៃតាមភាពខ្លាំងខ្សោយ",
    "តេស្តវាយតម្លៃតាមរបៀបសិក្សា",
    "តេស្តវាយតម្លៃតាមគុណតម្លៃ",
    "តេស្តគ្រប់ការវាយតម្លៃទាំងអស់",
    "ជំនាញ"
  ],
  openGraph: {
    title: "Quiz Page | NormPlov",
    description:
      "Discover your ideal career path through engaging assessments at NormPlov, including Personality, Interest, Value, Learning Style, and Skill test.",
    images: [
      {
        url: "/assets/quiztemplate.png",
        width: 1200,
        height: 630,
        alt: "NormPlov Quiz Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Page | NormPlov",
    description:
      "Explore Personality, Interest, Value, Learning Style, and Skill assessments at NormPlov to uncover your potential!",
    images: ["/assets/quiztemplate.png"],
  },
};
export default function Page() {
  return (
    <div className="bg-bgPrimaryLight min-h-screen">
      <ResultShareDynamicComponent />
    </div>
  )
}

