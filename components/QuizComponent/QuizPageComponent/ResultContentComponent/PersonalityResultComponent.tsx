import React from "react";
import checkIcon from "@/public/Quiz/skill-icon/check.png";
import xIcon from "@/public/Quiz/skill-icon/x.png";
import QuizHeader from "../../QuizHeader";
import { QuizResultListing } from "../../QuizResultListing";
import { useFetchAssessmentDetailsQuery } from "@/redux/feature/assessment/result";
import { useParams } from "next/navigation";
import CardPersonality from "../../CardPersonality";
import ScoreBar from "../ScoreBarPersonality";
import { RecommendationCard } from "../../RecommendationCard";
// Define types for API response
type PersonalityDimension = {
  dimension_name: string;
  score: number;
};
// type PersonalityTraits = {
//   positive: string[];
//   negative: string[];
// };

// type Personality = {
//   name: string;
//   title: string;
//   description: string;
// };

// type CareerRecommendation = {
//   career_name: string;
//   description: string;
//   majors: {
//     major_name: string;
//     schools: string[];
//   }[];
// };

// type ApiResponse = {
//   personalityType: Personality;
//   dimensions: PersonalityDimension[];
//   traits: PersonalityTraits;
//   strengths: string[];
//   weaknesses: string[];
//   careerRecommendations: CareerRecommendation[];
// }[];

// type Major = {
//   major_name: string;
//   schools: string[];
// };

// type RecommendedCareer = {
//   career_name: string;
//   description: string;
//   majors: Major[];
// };

export const PersonalityResultComponent = () => {
  const params = useParams();

  // Normalize the values from params
  // const resultType = Array.isArray(params.resultType) ? params.resultType[0] : params.resultType;
  // const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

  const resultTypeString =
    typeof params.resultType === "string" ? params.resultType : "";
  const uuidString = typeof params.uuid === "string" ? params.uuid : "";

  const { data: response, error } = useFetchAssessmentDetailsQuery({
    testUUID: uuidString,
    resultType: resultTypeString,
  });

  console.log(`result: ${resultTypeString} id: ${uuidString}`);

  if (!resultTypeString || !uuidString) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error loading data</p>;
  }
  //   const skillCategory = response?.[0]?.categoryPercentages;
  const personalities = response?.[0]?.personalityType;
  const personalitiesDimension = response?.[0]?.dimensions;
  console.log("Personalities dimension", personalitiesDimension);
  // Function to dynamically get matching dimensions
  const getDimensionPair = (name1: string, name2: string) => {
    const dim1 =
      personalitiesDimension?.find(
        (d: PersonalityDimension) => d.dimension_name === name1
      )?.score || 0;
    const dim2 =
      personalitiesDimension?.find(
        (d: PersonalityDimension) => d.dimension_name === name2
      )?.score || 0;
    return { dim1, dim2 };
  };

  const personailitiesTrait = response?.[0]?.traits;
  console.log("PersonailitiesTrait", personailitiesTrait);
  console.log("PersonailitiesTrait Positive", personailitiesTrait?.positive);
  console.log("PersonailitiesTrait Negative", personailitiesTrait?.negative);
  console.log("Personailities Strength", response?.[0]?.strengths);
  console.log("Personailities Weakness", response?.[0]?.weaknesses);

  //   if (!skillCategory) {
  //     return <p>Loading...</p>;
  //   }

  //   const personailitiesTrait = response?.[0]?.traits["positive"]
  //   console.log("PersonailitiesTrait", personailitiesTrait)
  //   const averageSkill = response?.[0]?.skillsGrouped["Average"];
  //   const weakSkill = response?.[0]?.skillsGrouped["Weak"];

  const recommendedCareer = response?.[0]?.careerRecommendations;
  console.log("Recommended Career: ", recommendedCareer);
  // Example data for the RecommendationCard
  const recommendations = [
    {
      jobTitle: "Software Engineer",
      jobDesc:
        "Design, develop, and maintain software applications. Collaborate with cross-functional teams to deliver high-quality products.",
      majors: [
        {
          major_name: "Computer Science",
          schools: ["MIT", "Stanford University", "Carnegie Mellon University"],
        },
        {
          major_name: "Software Engineering",
          schools: ["Harvard University", "UC Berkeley"],
        },
      ],
    },
    {
      jobTitle: "Data Analyst",
      jobDesc:
        "Analyze data to uncover trends and insights. Prepare data reports to assist in decision-making.",
      majors: [
        {
          major_name: "Data Science",
          schools: ["NYU", "Columbia University"],
        },
        {
          major_name: "Statistics",
          schools: ["Princeton University", "University of Chicago"],
        },
      ],
    },
  ];
  return (
    <div className="bg-white">
      {/* Personalities Name and Description */}
      <div className=" max-w-7xl mx-auto">
        <div className="">
          <CardPersonality
            titleForCard="បុគ្គលិកលក្ខណៈរបស់អ្នកគឺជា"
            name={personalities?.name}
            title={personalities?.title}
            description={personalities?.description}
          />
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px] ">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            ក្រាហ្វបង្ហាញពីបុគ្គលិកលក្ខណៈ
          </h2>
          <div className="space-y-6 md:p-8">
            {/* Introvert vs Extrovert */}
            <ScoreBar
              labelLeft="Introvert"
              labelRight="Extrovert"
              valueLeft={getDimensionPair("I_Score", "E_Score").dim1}
              valueRight={getDimensionPair("I_Score", "E_Score").dim2}
              colorLeft="bg-red-400"
              colorRight="bg-orange-400"
              customStyles={{
                container: "rounded-xl",
                labelText: "text-red-600 text-md md:text-xl font-bold",
                valueText: "text-gray-700  text-md md:text-xl font-semibold",
              }}
            />

            {/* Sensing vs Intuition */}
            <ScoreBar
              labelLeft="Sensing"
              labelRight="Intuition"
              valueLeft={getDimensionPair("S_Score", "N_Score").dim1}
              valueRight={getDimensionPair("S_Score", "N_Score").dim2}
              colorLeft="bg-yellow-400"
              colorRight="bg-teal-400"
              customStyles={{
                container: "",
                labelText: "text-red-600 text-md md:text-xl font-bold",
                valueText: "text-gray-700  text-md md:text-xl font-semibold",
              }}
            />

            {/* Thinking vs Feeling */}
            <ScoreBar
              labelLeft="Thinking"
              labelRight="Feeling"
              valueLeft={getDimensionPair("T_Score", "F_Score").dim1}
              valueRight={getDimensionPair("T_Score", "F_Score").dim2}
              colorLeft="bg-green-400"
              colorRight="bg-blue-700"
              customStyles={{
                container: "",
                labelText: "text-red-600 text-md md:text-xl font-bold",
                valueText: "text-gray-700  text-md md:text-xl font-semibold",
              }}
            />

            {/* Judging vs Perceiving */}
            <ScoreBar
              labelLeft="Judging"
              labelRight="Perceiving"
              valueLeft={getDimensionPair("J_Score", "P_Score").dim1}
              valueRight={getDimensionPair("J_Score", "P_Score").dim2}
              colorLeft="bg-blue-500"
              colorRight="bg-yellow-400"
              customStyles={{
                container: "",
                labelText: "text-red-600 text-md md:text-xl font-bold",
                valueText: "text-gray-700  text-md md:text-xl font-semibold",
              }}
            />
          </div>
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            លក្ខណៈសំខាន់ៗរបស់ {personalities?.name}
          </h2>
          {/* Positive Traits */}
          <div className="">
            <div className="text-primary space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចវិជ្ជមានរបស់អ្នក"
                description="Positive Traits"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.positive.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={checkIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Negative Traits */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចអវិជ្ជមានរបស់អ្នក"
                description="Negative Traits"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {personailitiesTrait?.negative.map(
                  (trait: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title=""
                      desc={trait}
                      image={xIcon}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 md:mx-0 border border-slate-50 mt-5 md:mt-14 p-6 rounded-[8px]">
          <h2 className="bg-secondary inline-block text-white text-lg md:text-2xl px-4 py-2 rounded-[8px] mb-6">
            លក្ខណៈសំខាន់ៗរបស់ {personalities?.name}
          </h2>
          {/* Strength */}
          <div className="">
            <div className="space-y-8 text-primary max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្លាំងរបស់អ្នក"
                description="Strength"
                size="sm"
                type="result"
                titleColor="text-success"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.[0]?.strengths.map(
                  (strength: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={strength} // Display strength description
                      image={checkIcon} // Positive icon
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Weakness */}
          <div className="">
            <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12">
              <QuizHeader
                title="ចំណុចខ្សោយរបស់អ្នក"
                description="Weakness"
                size="sm"
                type="result"
                titleColor="text-danger"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {response?.[0]?.weaknesses.map(
                  (weakness: string, index: number) => (
                    <QuizResultListing
                      key={index}
                      title="" // No title
                      desc={weakness} // Display weakness description
                      image={xIcon} // Negative icon
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:space-y-8 max-w-7xl mx-auto p-4 md:p-10 lg:p-12 ">
          <QuizHeader
            title="ការងារទាំងនេះអាចនឹងសាកសមជាមួយអ្នក"
            description="These career may suitable for you"
            size="sm"
            type="result"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                jobTitle={recommendation.jobTitle}
                jobDesc={recommendation.jobDesc}
                majors={recommendation.majors}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
