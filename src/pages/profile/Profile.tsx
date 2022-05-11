import { useUserProfile } from "../../api/hooks/useUserProfile";

export interface IUserProfile {
  name: string;
  email: string;
}

export function Profile() {
  const { userProfile } = useUserProfile();
  return (
    <div>
      {userProfile && (
        <>
          <p>{userProfile.name}</p>
          <p>{userProfile.email}</p>
        </>
      )}
    </div>
  );
}
