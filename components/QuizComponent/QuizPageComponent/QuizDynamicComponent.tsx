'use client'
import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { QuizIntroContainer } from '@/components/QuizComponent/QuizIntroContainer';
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from '@/components/QuizComponent/QuizQuestionContainer';
import { QuizButton } from '@/components/QuizComponent/QuizButton';
import { ArrowRight, ArchiveRestore } from "lucide-react";
import { toast } from 'react-toastify';


// Import JSON data
import generalTestJson from '../../../app/[locale]/(user)/json/testGeneralKh.json';

// import allTestJson from '@/app/(user)/json/allTest.json';
import { usePredictAssessmentMutation } from '@/redux/feature/assessment/quiz';
import Loading from '@/components/General/Loading';
import { useDraftAssessmentMutation } from '@/redux/service/draft';
import { useTranslations } from 'next-intl';



type QuizData = {
  questions: { question: string; category: string }[];
  introKh: {
    title: string;
    highlight: string;
    description: string;
  };
};



type QuizResponse = { [question: string]: number };

export default function QuizDynamicComponent() {
  const [predictAssessment] = usePredictAssessmentMutation();
  const [draftAssessment] = useDraftAssessmentMutation();
  const router = useRouter();
  const pathname = usePathname();
  const { testType } = useParams(); // Get the dynamic route parameter
  const [currentLocale, setCurrentLocale] = useState<string>('km');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  console.log("lang: ", currentLocale)

  const t = useTranslations();

  // const quizDataMap: Record<string, QuizData> = {
  //   'personality': personalityJson,
  //   'skill': skillJson,
  //   'interest': interestJson,
  //   'value': valueJson,
  //   'learningStyle': learningStyleJson,
  //   // 'all': allTestJson
  // };

  // Learning Style quiz Data
  const learningStyleTest: QuizData = {
    questions: [
      {
        question: t('LearningStyleTest.question_1'), // You will use the translation key here
        category: "Q1_Visual"
      },
      {
        question: t('LearningStyleTest.question_2'),
        category: "Q2_Visual"
      },
      {
        question: t('LearningStyleTest.question_3'),
        category: "Q3_Auditory"
      },
      {
        question: t('LearningStyleTest.question_4'),
        category: "Q4_Auditory"
      },
      {
        question: t('LearningStyleTest.question_5'),
        category: "Q5_ReadWrite"
      },
      {
        question: t('LearningStyleTest.question_6'),
        category: "Q6_ReadWrite"
      },
      {
        question: t('LearningStyleTest.question_7'),
        category: "Q7_Kinesthetic"
      },
      {
        question: t('LearningStyleTest.question_8'),
        category: "Q8_Kinesthetic"
      }
    ],
    introKh: {
      title: "LearningStyleTest.learningStyle_intro_title", // Translation key
      highlight: "LearningStyleTest.learningStyle_intro_highlight", // Translation key
      description: "LearningStyleTest.learningStyle_intro_description" // Translation key
    }
  };

  //  Personality quiz Data
  const PersonalityTest: QuizData = {
    questions: [
      {
        question: t('PersonalityTest.question_1'), // You will use the translation key here
        category: "Q1"
      },
      {
        question: t('PersonalityTest.question_2'),
        category: "Q2"
      },
      {
        question: t('PersonalityTest.question_3'),
        category: "Q3"
      },
      {
        question: t('PersonalityTest.question_4'),
        category: "Q4"
      },
      {
        question: t('PersonalityTest.question_5'),
        category: "Q5"
      },
      {
        question: t('PersonalityTest.question_6'),
        category: "Q6"
      },
      {
        question: t('PersonalityTest.question_7'),
        category: "Q7"
      },
      {
        question: t('PersonalityTest.question_8'),
        category: "Q8"
      },
      {
        question: t('PersonalityTest.question_9'),
        category: "Q9"
      },
      {
        question: t('PersonalityTest.question_10'),
        category: "Q10"
      },
      {
        question: t('PersonalityTest.question_11'),
        category: "Q11"
      },
      {
        question: t('PersonalityTest.question_12'),
        category: "Q12"
      },
      {
        question: t('PersonalityTest.question_13'),
        category: "Q13"
      },
      {
        question: t('PersonalityTest.question_14'),
        category: "Q14"
      },
      {
        question: t('PersonalityTest.question_15'),
        category: "Q15"
      },
      {
        question: t('PersonalityTest.question_16'),
        category: "Q16"
      }
    ],
    introKh: {
      title: "PersonalityTest.Personality_intro_title", // Translation key
      highlight: "PersonalityTest.Personality_intro_highlight", // Translation key
      description: "PersonalityTest.Personality_intro_description" // Translation key
    }
  };

  // interest quiz data
  const InterestTest: QuizData = {
    questions: [
      {
        question: t('InterestTest.question_1'), // You will use the translation key here
        category: "q1"
      },
      {
        question: t('InterestTest.question_2'),
        category: "q2"
      },
      {
        question: t('InterestTest.question_3'),
        category: "q3"
      },
      {
        question: t('InterestTest.question_4'),
        category: "q4"
      },
      {
        question: t('InterestTest.question_5'),
        category: "q5"
      },
      {
        question: t('InterestTest.question_6'),
        category: "q6"
      },
      {
        question: t('InterestTest.question_7'),
        category: "q7"
      },
      {
        question: t('InterestTest.question_8'),
        category: "q8"
      },
      {
        question: t('InterestTest.question_9'),
        category: "q9"
      },
      {
        question: t('InterestTest.question_10'),
        category: "q10"
      },
      {
        question: t('InterestTest.question_11'),
        category: "q11"
      },
      {
        question: t('InterestTest.question_12'),
        category: "q12"
      }
    ],
    introKh: {
      title: "InterestTest.interest_intro_title", // Translation key
      highlight: "InterestTest.interest_intro_highlight", // Translation key
      description: "InterestTest.interest_intro_description" // Translation key
    }
  };

  // skill quiz data
  const SkillTest: QuizData = {
    questions: [
      {
        question: t('SkillTest.question_1'), // You will use the translation key here
        category: "Complex Problem Solving"
      },
      {
        question: t('SkillTest.question_2'),
        category: "Critical Thinking Score"
      },
      {
        question: t('SkillTest.question_3'),
        category: "Mathematics Score"
      },
      {
        question: t('SkillTest.question_4'),
        category: "Science Score"
      },
      {
        question: t('SkillTest.question_5'),
        category: "Learning Strategy Score"
      },
      {
        question: t('SkillTest.question_6'),
        category: "Monitoring Score"
      },
      {
        question: t('SkillTest.question_7'),
        category: "Active Listening Score"
      },
      {
        question: t('SkillTest.question_8'),
        category: "Social Perceptiveness Score"
      },
      {
        question: t('SkillTest.question_9'),
        category: "Judgment and Decision Making Score"
      },
      {
        question: t('SkillTest.question_10'),
        category: "Instructing Score"
      },
      {
        question: t('SkillTest.question_11'),
        category: "Active Learning Score"
      },
      {
        question: t('SkillTest.question_12'),
        category: "Time Management Score"
      },
      {
        question: t('SkillTest.question_13'),
        category: "Writing Score"
      },
      {
        question: t('SkillTest.question_14'),
        category: "Speaking Score"
      },
      {
        question: t('SkillTest.question_15'),
        category: "Reading Comprehension Score"
      }

    ],
    introKh: {
      title: "SkillTest.skill_intro_title", // Translation key
      highlight: "SkillTest.skill_intro_highlight", // Translation key
      description: "SkillTest.skill_intro_description" // Translation key
    }
  };

  // value quiz data
  const ValueTest: QuizData = {
    questions: [
      {
        question: t('ValueTest.question_1'), // You will use the translation key here
        category: "Q1"
      },
      {
        question: t('ValueTest.question_2'),
        category: "Q2"
      },
      {
        question: t('ValueTest.question_3'),
        category: "Q3"
      },
      {
        question: t('ValueTest.question_4'),
        category: "Q4"
      },
      {
        question: t('ValueTest.question_5'),
        category: "Q5"
      },
      {
        question: t('ValueTest.question_6'),
        category: "Q6"
      },
      {
        question: t('ValueTest.question_7'),
        category: "Q7"
      },
      {
        question: t('ValueTest.question_8'),
        category: "Q8"
      },
      {
        question: t('ValueTest.question_9'),
        category: "Q9"
      },
      {
        question: t('ValueTest.question_10'),
        category: "Q10"
      },
      {
        question: t('ValueTest.question_11'),
        category: "Q11"
      },
      {
        question: t('ValueTest.question_12'),
        category: "Q12"
      },
      {
        question: t('ValueTest.question_13'),
        category: "Q13"
      },
      {
        question: t('ValueTest.question_14'),
        category: "Q14"
      },
      {
        question: t('ValueTest.question_15'),
        category: "Q15"
      },
      {
        question: t('ValueTest.question_16'),
        category: "Q16"
      },
      {
        question: t('ValueTest.question_17'),
        category: "Q17"
      },
      {
        question: t('ValueTest.question_18'),
        category: "Q18"
      },
      {
        question: t('ValueTest.question_19'),
        category: "Q19"
      },
      {
        question: t('ValueTest.question_20'),
        category: "Q20"
      },
      {
        question: t('ValueTest.question_21'),
        category: "Q21"
      },
      {
        question: t('ValueTest.question_22'),
        category: "Q22"
      },


    ],
    introKh: {
      title: "ValueTest.value_intro_title", // Translation key
      highlight: "ValueTest.value_intro_highlight", // Translation key
      description: "ValueTest.value_intro_description" // Translation key
    }
  };



  const howItWorksSteps = [
    t('TestMainPage.instructKh.howItWorksSteps.step1'),
    t('TestMainPage.instructKh.howItWorksSteps.step2'),
  ];

  const emojiLabels = [
    t('TestMainPage.instructKh.emojiLabels.stronglyDisagree'),
    t('TestMainPage.instructKh.emojiLabels.disagree'),
    t('TestMainPage.instructKh.emojiLabels.neutral'),
    t('TestMainPage.instructKh.emojiLabels.agree'),
    t('TestMainPage.instructKh.emojiLabels.stronglyAgree'),
  ];


  const quizDataMap: Record<string, QuizData> = {
    personality: PersonalityTest,
    learningStyle: learningStyleTest,
    interest: InterestTest,
    skill: SkillTest,
    value: ValueTest
    

    // Add more tests here if necessary
  };




  // Always call hooks
  const [userResponses, setUserResponses] = useState<QuizResponse>({});
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the quiz data and total questions
  const quizData = Array.isArray(testType) ? null : quizDataMap[testType];
  const totalQuestions = quizData?.questions?.length || 0;

  // Calculate progress
  const progress = totalQuestions > 0 ? Math.round((completedQuestions.length / totalQuestions) * 100) : 0;


  const processResponsesFromModifiedJSON = (
    userResponses: { [key: string]: number },
    questions: { question: string; category: string }[]
  ) => {
    const responses: { [key: string]: number } = {};

    questions.forEach(({ question, category }) => {
      if (userResponses[question] !== undefined) {
        responses[category] = userResponses[question];
      }
    });

    return { responses };
  };
  const processResponsesForDraft = (
    userResponses: { [key: string]: number },
    questions: { question: string; category: string }[]
  ) => {
    const responses: { [key: string]: number } = {};

    // Map user responses to their respective categories
    questions.forEach(({ question, category }) => {
      if (userResponses[question] !== undefined) {
        responses[category] = userResponses[question];
      }
    });

    return responses; // Return partial responses for draft
  };



  if (!quizData) {
    console.error("Quiz data is null");
    return;
  }

  const assessmentType = Array.isArray(testType) ? testType[0] : testType;
  // const draftType = Array.isArray(testType) ? testType[1] : testType;
  console.log("Assessment type: " + assessmentType)
  const showLoading = () => {
    setTimeout(() => setIsLoading(true), 200); // Only show spinner after 200ms
  };
  const hideLoading = () => {
    setIsLoading(false); // Hide immediately
  };

  const handleResultClick = async () => {
    showLoading();
    if (completedQuestions.length < totalQuestions) {
      toast.error("Please answer all the questions to see the result.");
      return;
    }

    if (!quizData || !quizData.questions) {
      console.error("Quiz data or questions are missing.");
      return;
    }


    const processedResponses = processResponsesFromModifiedJSON(userResponses, quizData.questions);
    console.log("Process", processedResponses)

    try {

      const result = await predictAssessment({
        assessmentType: assessmentType, // Use the normalized `assessmentType` here
        body: processedResponses,
      }).unwrap();

      const testUuid = result.payload.test_uuid

      toast.success("Responses submitted successfully!");

      // const newPath = `${currentLocale}/test-result/${assessmentType}/${testUuid}`;

      // // Check if the pathname already contains the locale to avoid duplication
      // if (!pathname.startsWith(`/${currentLocale}`)) {
      //   router.push(newPath);
      // } else {
      //   // If the pathname already includes the locale, navigate normally without changing the locale
      //   router.push(`${currentLocale}/test-result/${assessmentType}/${testUuid}`);
      // }

      const newPath = `/${currentLocale}/test-result/${assessmentType}/${testUuid}`;

      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${currentLocale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }

    } catch (err) {
      toast.error("Failed to submit responses. Please try again.");
      console.log(err)
    } finally {
      hideLoading(); // Stop loading spinner
    }
  };


  // const handleDraftClick = async () => {
  //   showLoading();
  //   const processedResponses = processResponsesFromModifiedJSON(userResponses, quizData.questions);
  //   try{
  //       await draftAssessment({
  //       draftType: assessmentType, // Use the normalized `assessmentType` here
  //       body: { responses: processedResponses, userResponses },
  //       }).unwrap();
  //       toast.success("Your progress has been saved. You can continue later from your profile.", {
  //         icon: <span>📂</span>,
  //         className: "Toastify__toast",
  //       });
  //       router.push(`/test`);
  //   }catch(err){
  //     toast.error("Failed to submit responses. Please try again.");
  //     console.log(err)
  //   }finally{
  //     hideLoading(); // Stop loading spinner
  //   }
  // };

  const handleDraftClick = async () => {
    showLoading();

    // Filter only the answered questions
    const processedResponses = processResponsesForDraft(userResponses, quizData.questions);

    try {
      // Send the filtered responses to the draft API
      await draftAssessment({
        draftType: assessmentType, // Use normalized `assessmentType`
        body: { responses: processedResponses }, // Only include relevant responses
      }).unwrap();

      // Notify the user of success
      toast.success("Your progress has been saved. You can continue later from your profile.");
      router.push(`/${currentLocale}/test`);
    } catch (err) {
      // Log and notify the user of errors
      toast.error("Failed to save progress. Please try again.");
      console.error("Error saving draft:", err);
    } finally {
      // Hide the loading spinner
      hideLoading();
    }
  };

  const { quizButtonKh } = generalTestJson;
  const { questions } = quizData;


  const handleAnswer = (question: string, response: number) => {
    setUserResponses((prev) => ({ ...prev, [question]: response })); // Update responses
  };
  // const handleAnswer = (question: string, response: number) => {
  //   // Update user responses
  //   setUserResponses((prev) => ({ ...prev, [question]: response }));

  //   // Dynamically track completed questions
  //   const questionIndex = questions.findIndex((q) => q.question === question);
  //   if (questionIndex !== -1 && !completedQuestions.includes(questionIndex)) {
  //     setCompletedQuestions((prev) => [...prev, questionIndex]);
  //   }
  // };



  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
          <Loading />
        </div>
      )}

      {/* Intro Section */}
      <div className="bg-bgPrimaryLight">
        {/* <QuizIntroContainer
          introTitle={introKh.title}
          introHightlight={introKh.highlight}
          introDesc={introKh.description}
          instructLabel={instructKh.instructionLabel}
          howItWorkTitle={instructKh.howItWorksTitle}
          howItWorkStep={instructKh.howItWorksSteps}
          emojiLabels={instructKh.emojiLabels}
          RepresentedImageTitle={instructKh.representedImageTitle}
        /> */}


        <QuizIntroContainer
          introTitle={t(quizData.introKh.title)} // Translated title
          introHightlight={t(quizData.introKh.highlight)} // Translated highlight
          introDesc={t(quizData.introKh.description)} // Translated description
          instructLabel={t('TestMainPage.instructKh.instructionLabel')}
          howItWorkTitle={t('TestMainPage.instructKh.howItWorksTitle')}
          howItWorkStep={howItWorksSteps} // Map over questions and fetch their translations
          emojiLabels={emojiLabels}
          RepresentedImageTitle={t('TestMainPage.instructKh.representedImageTitle')}
        />

      </div>

      <div className="sticky top-0 z-10 bg-white pt-4 ">
        <div className="max-w-7xl mx-auto py-4 px-4 flex gap-4 items-baseline">
          <span className="flex items-center flex-shrink-0 font-semibold mb-2 text-based md:text-lg">{progress} %</span>
          <Progress value={progress} className="h-4" />
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-7xl mx-auto my-4 md:my-6 px-4">
        {questions.map((questionData, index) => (
          <QuizQuestionContainer
            key={index}
            question={questionData.question}
            questionIndex={index} // Dynamically add index as questionIndex
            updateCompletedQuestions={(index: number) => {
              if (!completedQuestions.includes(index)) {
                setCompletedQuestions((prev) => [...prev, index]);
              }
            }}
            handleAnswer={handleAnswer}
            lang='kh'
          />
        ))}


      </div>

      {/* Footer Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
        <QuizButton
          title={quizButtonKh.draft}
          rounded="xl"
          icon={<ArchiveRestore />}
          type="leftIcon"
          outline="true"
          onClick={handleDraftClick}

        />
        <QuizButton
          title={quizButtonKh.result}
          rounded="xl"
          icon={<ArrowRight />}
          type="rightIcon"
          onClick={handleResultClick}
          isDisable={(completedQuestions.length < totalQuestions) ? true : false}
          outline='false'
        />
      </div>
    </div>
  );
}
