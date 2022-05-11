import { useContext } from "react";
import { UserProfileContext } from "../../context/UserProfileContext";

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  if (context === undefined) {
    throw new Error("useAuth() must be used inside a UserProfileProvider");
  }

  return context;
};
