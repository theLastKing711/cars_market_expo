import React from "react";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Authentication from "@/components/auth/Authentication";
import CreateCarOfferAuthenticated from "@/components/createCarOffer/CreateCarOfferAuthenticated";
import Register from "../register";

const CreateCarOffer = () => {
  return (
    <Authentication
      successPage={<CreateCarOfferAuthenticated />}
      failurePage={<Register />}
    />
  );
};

export default CreateCarOffer;
