'use client';

import { useState, useEffect } from 'react';
import { DynamicChatComponent } from '@/components/ui/chat/DynamicChatComponent';
import Image from 'next/image';
import aichat from '@/public/chat/aiChat.png'
import { useParams, usePathname } from 'next/navigation';
import { useContinueConversationMutation, useCreateChatMutation, useFetchConversationDetailsQuery } from '@/redux/feature/chat/aiChat';
import Loading from '@/components/General/Loading';
import { useGetUserQuery } from '@/redux/service/user';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  variant: 'received' | 'sent';
  avatar: string | null;
  message: string;
};

export default function ChatApp() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const uuid = Array.isArray(params.id) ? params.id[0] : params.id;
  const [createChat] = useCreateChatMutation();
  const [currentLocale, setCurrentLocale] = useState<string>('km');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLocale(savedLanguage);
    }
  }, []);

  const { data: chatDetail, isFetching } = useFetchConversationDetailsQuery(uuid || '', {
    skip: !uuid,
  });
  const [continueConversation] = useContinueConversationMutation();

  const [chatData, setChatData] = useState<{ [key: string]: Message[] }>({});
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { data: user } = useGetUserQuery();
  console.log("user data", user)
  const userData = user?.payload
  const avatarUrl = userData?.avatar
    ? `${process.env.NEXT_PUBLIC_NORMPLOV_API_URL}${userData.avatar}`
    : '/chat/ai.png';

  console.log("avatar", avatarUrl)
  useEffect(() => {
    if (chatDetail?.payload) {
      const filteredMessages = chatDetail.payload.conversation_history
        .flatMap((entry, index) => [
          {
            id: `${index * 2}`,
            variant: 'sent' as const,
            avatar: avatarUrl,
            message: entry.user_query || '',
          },
          {
            id: `${index * 2 + 1}`,
            variant: 'received' as const,
            avatar: '/chat/ai.png',
            message: entry.ai_reply || '',
          },
        ])
        .filter((message) => !(message.variant === 'sent' && message.message.trim() === '')); // Exclude empty "sent" messages

      setChatData({ [uuid]: filteredMessages });
      setSelectedChatId(uuid);
    }
  }, [chatDetail, uuid, avatarUrl]);


  const updateMessages = (chatId: string, newMessage: Message) => {
    setChatData((prevData) => ({
      ...prevData,
      [chatId]: [...(prevData[chatId] || []), newMessage],
    }));
  };

  const handleSendMessage = async (newQuery: string) => {
    try {
      await continueConversation({ uuid, new_query: newQuery }).unwrap();

    } catch (error) {
      console.error('Error continuing conversation:', error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

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
      {/* Sidebar */}
      {/* <AppSidebar /> */}

      {/* Chat Content */}
      <div >

        {selectedChatId ? (
          <DynamicChatComponent
            messages={chatData[selectedChatId] || []}
            updateMessages={(newMessage) => {
              updateMessages(selectedChatId, newMessage);

              // Send the new message to the server
              if (newMessage.variant === 'sent') {
                handleSendMessage(newMessage.message);
              }
            }}
          />
        ) : (
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

        )}
      </div>



    </div>

  );
}
