'use client'
import { ArrowLeft, Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import chatImage from "@/public/chat/chat.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCreateChatMutation, useFetchAllChatQuery } from "@/redux/feature/chat/aiChat";
import { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ChatData = {
  uuid: string;
  chat_title: string;
  created_at: string;
  updated_at: string | null;
};

type AppSidebarProps = {
  selectedChatId: string | null | string[];
  setSelectedChatId: React.Dispatch<React.SetStateAction<string | null | string[]>>;
};


export function AppSidebar({ selectedChatId, setSelectedChatId }: AppSidebarProps) {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  // const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data: apiData, isLoading, isError } = useFetchAllChatQuery();
  const [createChat] = useCreateChatMutation();
  const router = useRouter();

  useEffect(() => {
    if (apiData?.payload) {
      setChatData(apiData.payload);
    }
  }, [apiData]);

  const handleBackClick = () => {
    router.back();
  };

  const createNewChat = async () => {
    try {
      const response = await createChat({ user_query: null }).unwrap();

      const newChat: ChatData = {
        uuid: response.payload.conversation_uuid,
        chat_title: response.payload.chat_title,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      console.log("chat from sidebar:", newChat)

      setChatData((prev) => [...prev, newChat]); // Add new chat to the list
      setSelectedChatId(newChat.uuid); // Auto-select the new chat
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

  const chatDetailNavigate = (uuid: string) => {
    setSelectedChatId(uuid);
    router.push(`/chat-with-ai/${uuid}`);
  };


  if (isError) return <p>Error loading chats. Please try again later.</p>;

  const sortedChatData = [...chatData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  console.log("chat id: ", selectedChatId)
  return (
    <Sidebar className="bg-white">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem className="flex mb-2 justify-between ">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-primary bg-opacity-10 border-none hover:bg-opacity-20 hover:bg-primary rounded-full shadow-none"
                  onClick={handleBackClick}
                >
                  <ArrowLeft color="#0BBB8A" />
                </Button>
                <div className="flex gap-1 items-center ">
                  <p className="text-lg font-semibold text-gray-700">Message</p>
                  <div className="w-6 h-6 flex justify-center items-center rounded-full text-xs font-normal bg-gray-400 bg-opacity-10 text-gray-700">
                    {Object.keys(chatData).length}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-primary bg-opacity-10 border-none hover:bg-opacity-20 rounded-full hover:bg-primary shadow-none p-2"
                  onClick={createNewChat}
                >
                  <Plus color="#0BBB8A" />
                </Button>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarHeader>
          <SidebarGroupContent>
            {isLoading ? (
              <div className="flex justify-center items-center p-4">
                <div className="space-y-2">
                  <Skeleton className="h-[60px] w-[200px] rounded-xl" />
                  <Skeleton className="h-[60px] w-[200px] rounded-xl" />
                  <Skeleton className="h-[60px] w-[200px] rounded-xl" />
                </div>
              </div>
            ) : (
              <SidebarMenu>
                {sortedChatData.map((chat) => (
                  <SidebarMenuItem key={chat.uuid}>
                    <button
                      onClick={() => chatDetailNavigate(chat.uuid)}
                      className={`w-full text-left ${chat?.uuid === selectedChatId ? "bg-primary bg-opacity-10" : ""
                        } hover:bg-primary hover:bg-opacity-10`}
                    >
                      <div className="flex items-start gap-4 p-4 rounded-lg">
                        <Image
                          src={chatImage}
                          alt="Chat avatar"
                          width={36}
                          height={36}
                          className="rounded-xl"
                        />
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[14px] text-gray-700 font-semibold overflow-hidden whitespace-nowrap max-w-[120px] text-ellipsis ">
                              {chat.chat_title || "Untitled Chat"}
                            </p>

                            <p className="text-xs text-gray-500">
                              {new Date(chat.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>

                          <div className="relative group">
                            <Popover >
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:bg-opacity-20"><Ellipsis /></Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-28 bg-white text-left">
                                <div className="flex items-center gap-2 font-semibold text-gray-700">
                                  <Pencil className="w-4 h-4" />
                                  <p className="text-[14px]">Rename</p>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-danger font-semibold">
                                  <Trash className="w-4 h-4" />
                                  <p className="text-[14px]">Delete</p>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                        </div>

                      </div>

                    </button>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
