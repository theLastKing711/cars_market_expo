import Authentication from "@/components/auth/Authentication";
import SearchMyFavouriteCarsAuthenticated from "@/components/searcyMyFavouriteCars/SearchMyFavouriteCarsAuthenticated";

import React from "react";

const SearchMyFavouriteCars = () => {
  return (
    <Authentication successPage={<SearchMyFavouriteCarsAuthenticated />} />
  );
};

export default SearchMyFavouriteCars;
