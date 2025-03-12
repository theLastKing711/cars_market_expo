import React from "react";

import Authentication from "@/components/auth/Authentication";
import CreateCarOfferAuthenticated from "@/components/createCarOffer/CreateCarOfferAuthenticated";

const CreateCarOffer = () => {
  return <Authentication successPage={<CreateCarOfferAuthenticated />} />;
};

export default CreateCarOffer;
