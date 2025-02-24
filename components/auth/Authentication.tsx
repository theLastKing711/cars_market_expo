import useAuthStore from "@/state/useAuthStore";
import React from "react";

export type AuthenticationProps = {
  successPage?: React.ReactNode;
  failurePage?: React.ReactNode;
};

const Authentication = ({ successPage, failurePage }: AuthenticationProps) => {
  const {
    getToken,
    params: { phone_number, token },
    saveToken,
  } = useAuthStore();

  if (token) {
    return successPage;
  }

  return failurePage;
};

export default Authentication;
