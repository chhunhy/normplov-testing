

'use client'
import React, { useState, useEffect } from 'react'
import { QuizIntroContainer } from '../QuizIntroContainer';
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from '../QuizQuestionContainer';
import { QuizButton } from '../QuizButton';
import { ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLoadCareerPredictionMutation, useLoadFiveTestQuery, usePredictAssessmentMutation } from '@/redux/feature/assessment/quiz';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Define quiz data types
type QuizData = {
    questions: { question: string; category: string }[];
    introKh: {
        title: string;
        highlight: string;
        description: string;
    };
};

// Define the order of quizzes
const quizSequence = ['personality', 'interest', 'skill', 'value', 'learningStyle'];


type QuizResponse = { [question: string]: number };

export const MultipleStepQuizComponent = () => {
    const router = useRouter();
    const t = useTranslations();
    // const { testType } = useParams();
    const pathname = usePathname();
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [userResponses, setUserResponses] = useState<QuizResponse>({});
    const [questions, setQuestions] = useState<{ question: string; category: string }[]>([]);
    const [testUuids, setTestUuids] = useState<string[]>([]);
    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);

    const [, setPreviousCompletedQuestions] = useState<number[]>([]); // Store completed questions from the previous quiz
    const currentQuizType = quizSequence[currentQuizIndex];
    const [currentLocale, setCurrentLocale] = useState<string>('km');
    const [predictAssessment,] = usePredictAssessmentMutation();
    const [predictFinalCareer] = useLoadCareerPredictionMutation();


    // Use `useLoadFiveTestQuery` with a condition
    const { data } = useLoadFiveTestQuery(testUuids, {
        skip: !isReadyToFetch, // Only run the query when isReadyToFetch is true
    });

    
   console.log("data: ", data)



    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }
    }, []);


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
  };

    // const { introKh } = quizDataMap[currentQuizType];
    // const { instructKh } = generalTestJson;

    // Set new questions based on the current quiz
    useEffect(() => {
        if (currentQuizType) {
            // Update the questions when the quiz type changes
            setQuestions(quizDataMap[currentQuizType].questions);
            setCompletedQuestions([]); // Reset completed questions
            setUserResponses({}); // Reset user responses

            // Log which test we are on and how many questions
            console.log(`Currently on quiz: ${currentQuizType}`);
            console.log(`Total questions for this quiz: ${quizDataMap[currentQuizType].questions.length}`);
            console.log('Questions:', quizDataMap[currentQuizType].questions);
        }
    }, [currentQuizIndex]); // Depend on currentQuizIndex to load new quiz questions


    // Calculate the total number of questions across all quizzes
    const totalQuestionsAcrossAllQuizzes = Object.values(quizDataMap).reduce(
        (total, quizData) => total + quizData.questions.length, 0
    );


    // since the completeQuestions length is set to 0 when go to new quiz type, so add the previous number of questions to ensure that it is not set to 0
    const totalAnsweredQuestions = (
        currentQuizType === 'interest' ? 16 :
            currentQuizType === 'skill' ? 28 :
                currentQuizType === 'value' ? 43 :
                    currentQuizType === 'learningStyle' ? 65 : 0
    ) + completedQuestions.length;


    // Calculate the progress as a percentage
    const progress = totalQuestionsAcrossAllQuizzes > 0 ? Math.round((totalAnsweredQuestions / totalQuestionsAcrossAllQuizzes) * 100) : 0;

    // const handleAnswer = (question: string, response: number, questionIndex: number) => {
    //     setUserResponses((prev) => ({ ...prev, [question]: response }));
    //     // Mark the question as completed
    //     setCompletedQuestions((prev) => {
    //         if (!prev.includes(questionIndex)) {
    //             return [...prev, questionIndex]; // Add the question to the completed list
    //         }
    //         return prev; // Return existing list if the question is already completed
    //     });
    // };

    const handleAnswer = (question: string, response: number) => {
        setUserResponses((prev) => ({ ...prev, [question]: response })); // Update responses
    };


    // const handleDraftClick = () => {
    //     toast.success("Your progress has been saved. You can continue later from your profile.", {
    //         icon: <span>📂</span>,
    //         className: "Toastify__toast",
    //     });
    //     router.push(`/test`);
    // };


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

    const handleResultClick = async () => {
   
        const assessmentType = currentQuizType;


        const processedResponses = processResponsesFromModifiedJSON(userResponses, quizDataMap[currentQuizType].questions);
        console.log("Process", processedResponses)

        try {

            const result = await predictAssessment({
                assessmentType: assessmentType,
                body: processedResponses,
            }).unwrap();

            const testUuid = result.payload.test_uuid

            localStorage.setItem(`${currentQuizType}`, testUuid)

            if (assessmentType === 'learningStyle') {
                // Get the UUIDs from localStorage
                const personality = localStorage.getItem('personality');
                const interest = localStorage.getItem('interest');
                const value = localStorage.getItem('value');
                const skill = localStorage.getItem('skill');
                const learningStyle = localStorage.getItem('learningStyle');

                // Filter out null values
                const uuids = [
                    personality,
                    interest,
                    value,
                    skill,
                    learningStyle,
                ].filter((item) => item !== null) as string[];

                // Update the state with valid UUIDs
                setTestUuids(uuids);

                // Check if all 5 UUIDs are now available
                if (uuids.length === 5) {
                    setIsReadyToFetch(true); // All UUIDs are available, ready to fetch the tests
                    try {
                        const finalResult = await predictFinalCareer({
                            testUuids: uuids,
                            topN: 5
                        }).unwrap();

                        const allTestUuid = finalResult?.payload?.test_uuid

                        const newPath = `/${currentLocale}/test-result/all/${allTestUuid}`;

                        // Ensure the new path does not contain the duplicate locale part
                        if (!pathname.startsWith(`/${currentLocale}`)) {
                            // If the pathname doesn't include the current locale, add it
                            router.push(newPath);
                        } else {
                            // If the pathname already includes the locale, navigate to the result directly
                            router.push(newPath);
                        }

                    } catch (err) {
                        toast.error("Failed to submit final responses. Please try again.");
                        console.log("error: ",err)
                    }

                }


            }

            // toast.success("Responses submitted successfully!");

            handleNextClick();

        } catch (err) {
            toast.error("Failed to submit responses. Please try again.");
            console.log(err)
        }

    };



    const handleNextClick = () => {
        // Save the completed questions from the current quiz
        setPreviousCompletedQuestions(completedQuestions);

        // Ensure all questions are answered before transitioning
        if (completedQuestions.length < questions.length) {
            toast.error("Please answer all the questions before proceeding.");
            return;
        }

        // Reset completed questions for the new quiz
        setCompletedQuestions([]); // Reset for the new quiz


        // Move to the next quiz type
        if (currentQuizIndex < quizSequence.length - 1) {
            setCurrentQuizIndex((prevIndex) => prevIndex + 1); // Transition to next quiz
        } else {
            toast.success("You've completed all quizzes!"); // Final quiz
        }
    };

    return (
        <div className="w-full relative">
            {/* Intro Section */}
            <div className="bg-bgPrimaryLight">
                <QuizIntroContainer
                    introTitle={t(quizDataMap[currentQuizType]?.introKh.title)}
                    introHightlight={t(quizDataMap[currentQuizType]?.introKh.highlight)}
                    introDesc={t(quizDataMap[currentQuizType]?.introKh.description)}
                    instructLabel={t('TestMainPage.instructKh.instructionLabel')}
                    howItWorkTitle={t('TestMainPage.instructKh.howItWorksTitle')}
                    howItWorkStep={howItWorksSteps}
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

                {quizDataMap[currentQuizType].questions.length > 0 ? (
                    quizDataMap[currentQuizType].questions.map((questionData, index) => (
                        <QuizQuestionContainer
                            key={`${currentQuizIndex}-${index}`}
                            question={questionData.question}
                            questionIndex={index}
                            updateCompletedQuestions={() => {
                                if (!completedQuestions.includes(index)) {
                                    setCompletedQuestions((prev) => [...prev, index]);
                                }
                            }}
                            // handleAnswer={(response: string) => handleAnswer(questionData.question, parseInt(response, 10), index)}
                            handleAnswer={handleAnswer}

                        />
                    ))
                ) : (
                    <div>Loading questions...</div> // This message will appear if questions are empty or loading
                )}
            </div>


            {/* Footer Buttons */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex gap-2 justify-end">
                {/* <QuizButton
                    title={quizButtonKh.draft}
                    rounded="xl"
                    icon={<ArchiveRestore />}
                    type="leftIcon"
                    outline="true"
                    onClick={handleDraftClick}
                /> */}
                <QuizButton
                    title={currentQuizIndex === quizSequence.length - 1 ? 'លទ្ធផល' : 'បន្ត'}  // Conditionally render title
                    rounded="xl"
                    icon={<ArrowRight />}
                    type="rightIcon"
                    onClick={handleResultClick}
                    isDisable={(completedQuestions.length < quizDataMap[currentQuizType].questions.length) ? true : false}
                />
            </div>
        </div>
    );
};
