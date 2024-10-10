import React from "react";
import { Button } from "@mui/material";
import useDialog from "../Api/useDialog";

const Report = () => {
  const { openDialog, DialogComponent } = useDialog();

  const handleOpenDialog = () => {
    
    const dialogTitle = 'Close Dialog';
    const dialogMessage = 'Are you sure you want to close this dialog?';
    const confirmCallback = () => {
      console.log('Dialog confirmed!');
    };
    const closeCallback = () => {
      console.log('Dialog closed!');
    };


    openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);
  };


  return (
    <>
      <div>Report is under development</div>
      <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Open Close Dialog
      </Button>
      <DialogComponent />
      </div>
    </>
  );
};

export default Report;
