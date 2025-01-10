import React from 'react'
import QuizHeader from './QuizHeader'
import { QuizInstructContainer } from './QuizInstructContainer'

type props = {
  introTitle: string;
  introHightlight: string;
  introDesc: string;
  instructLabel: string;
  howItWorkTitle: string;
  howItWorkStep?: string[];
  RepresentedImageTitle: string;
  emojiLabels?: string[];
}

export const QuizIntroContainer = ({introTitle, introHightlight, introDesc, instructLabel, howItWorkTitle, howItWorkStep, RepresentedImageTitle, emojiLabels}: props) => {

  return (
    <div className='w-full h-auto'>
      <div className='h-auto p-4 md:p-10 lg:p-12 w-full bg-primary rounded-b-4 md:rounded-b-[24px] overflow-hidden overflow-y-scroll'>
        <div className='max-w-7xl mx-auto'>
          <QuizHeader title={introTitle} highlight={introHightlight} description={introDesc} size='md' />
          <QuizInstructContainer
            instructionLabel={instructLabel}
            howItWorksTitle={howItWorkTitle}
            howItWorksSteps={howItWorkStep}
            representedImageTitle={RepresentedImageTitle}
            emojiLabels={emojiLabels}
          />
        </div>

      </div>
    </div>

  )
}
