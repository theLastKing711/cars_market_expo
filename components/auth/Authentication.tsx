import Register from "@/app/register";
import useAuthStore from "@/state/useAuthStore";
import React from "react";

export type AuthenticationProps = {
  successPage?: React.ReactNode;
  // failurePage?: React.ReactNode;
};

const Authentication = ({ successPage }: AuthenticationProps) => {
  return <Register />;

  const {
    getToken,
    params: { token },
    saveToken,
  } = useAuthStore();

  if (token) {
    return successPage;
  }

  return <Register />;
};

export default Authentication;
