"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from "@/components/QuizComponent/QuizDraftQuestionContainer";
import { QuizButton } from "@/components/QuizComponent/QuizButton";
import { QuizButtonDisable } from "../QuizButtonDisable";
import { ArrowRight, ArchiveRestore } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "@/components/General/Loading";
import {
  useGetUserDraftDetailsQuery,
  useSaveDraftAgainMutation,
  useSaveDraftSubmittingMutation,
} from "@/redux/service/draft";
import personalityJson from "../../../app/[locale]/(user)/json/personalityKh.json";
import skillJson from "../../../app/[locale]/(user)/json/skillKh.json";
import interestJson from "../../../app/[locale]/(user)/json/interestKh.json";
import valueJson from "../../../app/[locale]/(user)/json/valueKh.json";
import learningStyleJson from "../../../app/[locale]/(user)/json/learningStyleKh.json";
import generalTestJson from '../../../app/[locale]/(user)/json/testGeneralKh.json';
import { useRouter } from "next/navigation";
import { QuizIntroContainer } from '@/components/QuizComponent/QuizIntroContainer';
type QuizData = {
  questions: { question: string; category: string }[];
  introKh: {
    title: string;
    highlight: string;
    description: string;
  };
};


const quizDataMap: Record<string, QuizData> = {
  personality: personalityJson,
  skill: skillJson,
  interest: interestJson,
  value: valueJson,
  learningstyle: learningStyleJson,
};
const normalizeRoute = (input: string): string => {
  const customMappings: Record<string, string> = {
    "Learning Style": "learningStyle",
    Skills: "skill",
    Interests: "interest",
    Values: "value",
    Personality: "personality",
  };

  if (customMappings[input]) {
    return customMappings[input];
  }

  return input
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

export default function QuizDynamicDraftComponent() {
  const router = useRouter();
  const [saveDraftAgain] = useSaveDraftAgainMutation();
  const [saveDraftSubmitting] = useSaveDraftSubmittingMutation();
  const params = useParams();
  const draftTypeRaw =
    typeof params?.draftType === "string" ? params.draftType.toLowerCase() : "";
  const draftType = draftTypeRaw
    .replace(/s$/, "") // Remove plural 's' (e.g., "interests" → "interest")
    .replace(" ", "") // Remove spaces (e.g., "learning style" → "learningstyle")
    .toLowerCase();

  const uuid = typeof params?.uuid === "string" ? params.uuid : "";

  const { data, isLoading, error } = useGetUserDraftDetailsQuery({ uuid });

  const [userResponses, setUserResponses] = useState<{ [key: string]: number }>(
    {}
  );
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const prevResponsesRef = useRef<{ [key: string]: number } | null>(null);
  const quizData = quizDataMap[draftType] as QuizData | null;

  const isQuizComplete =
    quizData !== null && completedQuestions.length === quizData.questions.length;

  useEffect(() => {
    const responses = data?.payload?.response_data;

    if (
      responses &&
      JSON.stringify(responses) !== JSON.stringify(prevResponsesRef.current)
    ) {
      setUserResponses(responses);

      const completed = quizData?.questions
        ?.map((q, index) =>
          responses[q.category] !== undefined ? index : null
        )
        .filter((index) => index !== null) as number[];

      setCompletedQuestions(completed || []);
      setAnsweredQuestions(new Set(completed || []));
      prevResponsesRef.current = responses;
    }
  }, [data, quizData]);

  if (isLoading) return <Loading />;
  if (error || !quizData) return <p>Quiz data not found.</p>;

  const totalQuestions = quizData.questions.length;
  const progress =
    totalQuestions > 0
      ? Math.round((completedQuestions.length / totalQuestions) * 100)
      : 0;

  const handleAnswer = (
    question: string,
    response: number,
    questionIndex: number
  ) => {
    const category = quizData?.questions[questionIndex]?.category;
    if (!category) {
      console.error(`Category not found for questionIndex: ${questionIndex}`);
      return;
    }

    setUserResponses((prev) => {
      const updatedResponses = { ...prev, [category]: response };
      console.log("Updated Responses:", updatedResponses);
      return updatedResponses;
    });

    setAnsweredQuestions((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.add(questionIndex);
      return updatedSet;
    });
  };

  // const handleSubmitQuiz = async () => {
  //   if (completedQuestions.length < totalQuestions) {
  //     toast.error("Please complete all questions before submitting.");
  //     return;
  //   }

  //   try {
  //     if (!uuid) {
  //       toast.error("Draft ID not found!");
  //       return;
  //     }

  //     const orderedResponses = quizData.questions.reduce<Record<string, number>>(
  //       (acc, question) => {
  //         const category = question.category;
  //         acc[category] = userResponses[category] ?? 1;
  //         return acc;
  //       },
  //       {}
  //     );

  //     const body = {
  //       responses: orderedResponses,
  //     };

  //     console.log("Submitting Ordered Quiz Responses:", body.responses);

  //     const response = await saveDraftSubmitting({ uuid, body }).unwrap();

  //     if (response.status === 200) {
  //       toast.success("Quiz submitted successfully!");

  //       const { assessment_type_name: assessmentType, test_uuid: testUuid } =
  //         response.payload;

  //       const normalizedAssessmentType = assessmentType
  //         .toLowerCase()
  //         .replace(/s$/, "")
  //         .replace(/\s+/g, "");

  //       console.log("Normalized Assessment Type:", normalizedAssessmentType);
  //       console.log("Test UUID:", testUuid);

  //       try {
  //         router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
  //       } catch (err) {
  //         console.error("Navigation failed:", err);
  //         toast.error("Failed to navigate to the results page.");
  //       }
  //     } else {
  //       toast.error("Failed to submit quiz. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error while submitting quiz:", error);
  //     toast.error("An error occurred while submitting the quiz.");
  //   }
  // };
  const handleSubmitQuiz = async () => {
    if (completedQuestions.length < totalQuestions) {
      toast.error("Please complete all questions before submitting.");
      return;
    }
  
    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }
  
      const orderedResponses = quizData.questions.reduce<Record<string, number>>(
        (acc, question) => {
          const category = question.category;
          acc[category] = userResponses[category] ?? 1;
          return acc;
        },
        {}
      );
  
      const body = {
        responses: orderedResponses,
      };
  
      console.log("Submitting Ordered Quiz Responses:", body.responses);
  
      const response = await saveDraftSubmitting({ uuid, body }).unwrap();
  
      if (response.status === 200) {
        toast.success("Quiz submitted successfully!");
  
        const { assessment_type_name: assessmentType, test_uuid: testUuid } =
          response.payload;
  
        const normalizedAssessmentType = normalizeRoute(assessmentType);
  
        console.log("Normalized Assessment Type:", normalizedAssessmentType);
        console.log("Test UUID:", testUuid);
  
        try {
          router.push(`/test-result/${normalizedAssessmentType}/${testUuid}`);
        } catch (err) {
          console.error("Navigation failed:", err);
          toast.error("Failed to navigate to the results page.");
        }
      } else {
        toast.error("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error while submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz.");
    }
  };
  
  const handleSaveDraftAgain = async () => {
    try {
      if (!uuid) {
        toast.error("Draft ID not found!");
        return;
      }

      const body = {
        responses: userResponses,
      };

      console.log("Transformed Responses:", body.responses);

      const response = await saveDraftAgain({ uuid, body }).unwrap();

      if (response.status === 200) {
        toast.success("Draft saved successfully!");
      } else {
        toast.error("Failed to save draft. Please try again.");
      }
      router.push(`/test`);
    } catch (error) {
      console.error("Error while saving draft:", error);
      toast.error("An error occurred while saving the draft.");
    }
  };
  const { instructKh } = generalTestJson;
  const { introKh } = quizData;

  return (
    <div className="w-full relative">
      {/* Intro Section */}
            <div className="bg-bgPrimaryLight">
              <QuizIntroContainer
                introTitle={introKh.title}
                introHightlight={introKh.highlight}
                introDesc={introKh.description}
                instructLabel={instructKh.instructionLabel}
                howItWorkTitle={instructKh.howItWorksTitle}
                howItWorkStep={instructKh.howItWorksSteps}
                emojiLabels={instructKh.emojiLabels}
                RepresentedImageTitle={instructKh.representedImageTitle}
              />
      
            </div>
      <div className="sticky top-0 z-10 bg-white pt-4">
        <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
          <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">
            {progress} %
          </span>
          <Progress value={progress} className="h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
        {quizData.questions.map((q, index) => (
          <QuizQuestionContainer
            key={index}
            question={q.question}
            questionIndex={index}
            defaultValue={userResponses[q.category] ?? null}
            isAnswered={answeredQuestions.has(index)}
            updateCompletedQuestions={(idx) => {
              if (!completedQuestions.includes(idx)) {
                setCompletedQuestions((prev) => [...prev, idx]);
              }
            }}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
        <QuizButton
          title="តេស្តពេលក្រោយ"
          rounded="xl"
          icon={<ArchiveRestore />}
          type="leftIcon"
          outline="true"
          onClick={handleSaveDraftAgain}
        />
        <QuizButtonDisable
          title="លទ្ធផល"
          rounded="xl"
          icon={<ArrowRight />}
          type="rightIcon"
          onClick={handleSubmitQuiz}
          disabled={!isQuizComplete}
          className={`${
            !isQuizComplete
              ? 'bg-primary text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-green-500'
          } transition duration-300 ease-in-out px-4 py-2 rounded-xl`}
        />
      </div>
    </div>
  );
}
