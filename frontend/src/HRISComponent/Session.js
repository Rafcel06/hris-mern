import React, { useEffect } from "react";
import useQueryHooks from "../Api/useDialog";
import useDialog from "../Api/useDialog";
import { useNavigate } from "react-router-dom";
import { environtment } from "../Environment/environment";
import secureLocalStorage from "react-secure-storage";

const Session = () => {
  const { openDialog, DialogComponent } = useDialog();
  const navigate = useNavigate();

  useEffect(() => {
      handleOpenDialog();
  }, []);

  const handleOpenDialog = () => {
      const dialogTitle = "Session Expired";
      const dialogMessage = "Please relogin to renew your session";
      const confirmCallback = () => {
        navigate("/");
        secureLocalStorage.clear();
        return;
      };

      const closeCallback = () => {
        console.log("Dialog closed!");
      };

      openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);
      return;
  };

  return (
    <>
      <DialogComponent />
    </>
  );
};

export default Session;
