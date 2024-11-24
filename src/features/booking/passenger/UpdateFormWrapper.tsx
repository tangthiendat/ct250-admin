import React from "react";
import { IPassenger } from "../../../interfaces";
import UpdatePassengerForm from "./UpdatePassengerForm";
import UpdateUserForm from "../../auth/users/UpdateUserForm";

interface UpdateFormWrapperProps {
  passengerToUpdate?: IPassenger;
  onCancel: () => void;
  viewOnly?: boolean;
}

const UpdateFormWrapper: React.FC<UpdateFormWrapperProps> = ({
  passengerToUpdate,
  onCancel,
  viewOnly = false,
}) => {
  if (passengerToUpdate?.user) {
    return (
      <UpdateUserForm
        userToUpdate={passengerToUpdate.user}
        onCancel={onCancel}
        viewOnly={viewOnly}
      />
    );
  }

  return (
    <UpdatePassengerForm
      passengerToUpdate={passengerToUpdate}
      onCancel={onCancel}
      viewOnly={viewOnly}
    />
  );
};

export default UpdateFormWrapper;
