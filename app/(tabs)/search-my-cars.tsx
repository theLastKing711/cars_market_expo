import Authentication from "@/components/auth/Authentication";
import SearchMyCarsAuthenticated from "@/components/searchMyCars/SearchMyCarsAuthenticated";
import React from "react";

const searchMyCars = () => {
  return <Authentication successPage={<SearchMyCarsAuthenticated />} />;
};

export default searchMyCars;
