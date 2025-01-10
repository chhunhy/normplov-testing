

'use client'
import React, { useState, useEffect } from 'react'
import { QuizIntroContainer } from '../QuizIntroContainer';
import generalTestJson from '../../../app/[locale]/(user)/json/testGeneralKh.json';
import personalityJson from '../../../app/[locale]/(user)/json/personalityKh.json';
import skillJson from '../../../app/[locale]/(user)/json/skillKh.json';
import interestJson from '../../../app/[locale]/(user)/json/interestKh.json';
import valueJson from '../../../app/[locale]/(user)/json/valueKh.json';
import learningStyleJson from '../../../app/[locale]/(user)/json/learningStyleKh.json';
import { Progress } from "@/components/ui/progress";
import { QuizQuestionContainer } from '../QuizQuestionContainer';
import { QuizButton } from '../QuizButton';
import {  ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLoadFiveTestQuery, usePredictAssessmentMutation } from '@/redux/feature/assessment/quiz';

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

const quizDataMap: Record<string, QuizData> = {
    'personality': personalityJson,
    'skill': skillJson,
    'interest': interestJson,
    'value': valueJson,
    'learningStyle': learningStyleJson,
};

type QuizResponse = { [question: string]: number };

export const MultipleStepQuizComponent = () => {
    // const router = useRouter();
    // const { testType } = useParams();
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
    const [userResponses, setUserResponses] = useState<QuizResponse>({});
    const [questions, setQuestions] = useState<{ question: string; category: string }[]>([]);
    const [testUuids, setTestUuids] = useState<string[]>([]);
    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false);



    const [, setPreviousCompletedQuestions] = useState<number[]>([]); // Store completed questions from the previous quiz
    const currentQuizType = quizSequence[currentQuizIndex];
    const [, setCurrentLocale] = useState<string>('km');
    const [predictAssessment,] = usePredictAssessmentMutation();


    // Use `useLoadFiveTestQuery` with a condition
    const { data } = useLoadFiveTestQuery(testUuids, {
        skip: !isReadyToFetch, // Only run the query when isReadyToFetch is true
    });

    console.log('data:',data)

    



    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setCurrentLocale(savedLanguage);
        }
    }, []);

    // const pathname = usePathname();

    // Get the current quiz type based on the index

    const { introKh } = quizDataMap[currentQuizType];
    const { instructKh } = generalTestJson;

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

    // console.log('user response:', userResponses)
    // console.log('previous: ', previousCompletedQuestions)

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
        // // Logic to show the results or submit the final assessment
        // console.log('Showing results');
        // // Example: Navigate to a result page
        // router.push('/quiz-result');

        // if (completedQuestions.length < totalQuestions) {
        //     toast.error("Please answer all the questions to see the result.");
        //     return;
        // }

        // if (!quizData || !quizData.questions) {
        //     console.error("Quiz data or questions are missing.");
        //     return;
        // }

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
                }
            }

            toast.success("Responses submitted successfully!");

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
                // isDisable={(completedQuestions.length < totalQuestions) ? true : false}
                />
            </div>
        </div>
    );
};
