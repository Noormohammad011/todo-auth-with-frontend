import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const useLogOut = () => {
  const router = useRouter();

  return () => {
    removeUserInfo(authKey);
    router.push("/login");
  };
};

export default useLogOut;
