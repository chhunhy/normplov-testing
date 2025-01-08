// useHandleResultUuid.ts (Custom Hook)
import { useEffect } from "react";
import { usePathname } from "next/navigation"; // To get the current route path

const useHandleResultUuid = () => {
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    // Check if we are on /test-result or /chat-with-ai route with a uuid parameter
    const matchTestResult = pathname.match(/\/(en|km)?\/test-result\/([^/]+)/);
    const matchChatWithAi = pathname.match(/\/(en|km)?\/chat-with-ai\/([^/]+)/);

    if (!(matchTestResult || matchChatWithAi)) {
      // If not on /test-result or /chat-with-ai, remove the uuid and resultType from localStorage
      localStorage.removeItem("currentType");
      localStorage.removeItem("resultUuid");
    }
  }, [pathname]); // Trigger the effect on route change
};

export default useHandleResultUuid;
