"use client"
import Image from 'next/image';
import aichat from '@/public/chat/aiChat.png'
import { useCreateChatMutation } from '@/redux/feature/chat/aiChat';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function Page() {

  const router = useRouter();
  const pathname = usePathname();
  const [createChat] = useCreateChatMutation();
  const [currentLocale, setCurrentLocale] = useState<string>('km');


  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  const createNewChat = async () => {
    try {
      const response = await createChat({ user_query: null }).unwrap();

      const newChat = {
        uuid: response.payload.conversation_uuid,
        chat_title: response.payload.chat_title,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      // Navigate to the new chat's details page
      const newPath = `/${currentLocale}/chat-with-ai/${newChat.uuid}`;

      // Ensure the new path does not contain the duplicate locale part
      if (!pathname.startsWith(`/${currentLocale}`)) {
        // If the pathname doesn't include the current locale, add it
        router.push(newPath);
      } else {
        // If the pathname already includes the locale, navigate to the result directly
        router.push(newPath);
      }
      // router.push(`/chat-with-ai/${newChat.uuid}`);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  return (
    <div >
      {/* Chat Sidebar */}
      {/* <AppSidebar /> */}

      <div>
        <div className="h-screen flex justify-center items-center overflow-hidden p-4">
          <div className='flex justify-center flex-col items-center'>
            <Image
              src={aichat}
              alt="Quiz Illustration"
              width={500}
              height={500}
              className="object-fill w-[250px] h-[250px]"
            />
            <p className='text-center -mt-2 max-w-[400px]'><span onClick={createNewChat} className='text-primary hover:cursor-pointer hover:underline'>No chats yet?</span> Create a new conversation or pick one from the sidebar to get started.</p>
          </div>
        </div>

      </div>

    </div >

  );
}
