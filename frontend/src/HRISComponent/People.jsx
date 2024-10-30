import React, { useEffect, useState } from "react";
import { Button,   } from "@mui/material";
import { useAuth } from "../AuthGuard/Auth";
import { useForm } from "react-hook-form";
import { environtment } from "../Environment/environment";
import useSnackbar from "../Api/useSnakbar";
import useBackdrop from "../Api/useBackdrop";
import useModal from "../Api/useModal";
import useDialog from "../Api/useDialog";
import  useQueryHooks from '../Api/useQueryHook'
import Table from "./Table";
import secureLocalStorage from "react-secure-storage";
import { UPDATE_FAILED,UPDATE_SUCCESSFULLY,DELETE_FAILED,DELETE_SUCCESSFULLY,CREATE_FAILED,CREATE_SUCCESSFULLY, SUCCESS, ERROR,DELETE_TITLE,DELETE_DESCRIPTION, EDIT_PROFILE, ADD_USER } from "../Utils/constant";
import DOMPurify from "dompurify";

const People = () => {

  const { Modal, openModal, closeModal } = useModal();
  const { SnackbarComponent, showSnackbar,setOpenSnackbar, openSnackbar} = useSnackbar();
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();
  const { openDialog, DialogComponent } = useDialog();
  const [userId,setId] = useState('')
  const [edit, setEdit] = useState(false);
  const [fetchEdit,setFetchEdit] = useState(false)
  const [profile,setProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState();
  const [reQuery, setQuery] = useState(false)

 
  const form = useForm();
  const { register, handleSubmit, formState, reset} = form;
  const { errors } = formState;
  const [paginate,setPagination] = useState(10);
  const [offset,setOffSet] = useState(0);
  const { data, queryLoading, queryError, setError, createProfile, updateProfile, deleteProfile } = useQueryHooks(environtment.api + "all-profile/" , paginate, offset,openSnackbar);
  const [users,setUsers] = useState([])




//  useEffect(() => {
//  axios.get(environtment.api + 'all-profile/'+ paginate + "/" +  offset, {
//   headers: { 'Authorization': `Bearer ${JSON.parse(secureLocalStorage.getItem('authenticate')).token}`}
// })
//  .then((response) => {
//      setUsers(response.data)
//      console.log("From people",response.data)
//  })
//  .catch((err) => console.log(err))
//   console.log("From query",data)
//   },[])

// useEffect(() => {
//   console.log(users)
// }, [users])

  
  const submit = (data,e) => {
    // setLoading(true);
    // setOpenSnackbar(false)
     let formData = {
      FirstName:DOMPurify.sanitize(data.FirstName),
      MiddleName: DOMPurify.sanitize(data.MiddleName),
      LastName:DOMPurify.sanitize(data.LastName),
      Email:DOMPurify.sanitize(data.Email),
      Phone:DOMPurify.sanitize(data.Phone),
      Password:DOMPurify.sanitize(data.Password),
      ConfirmPassword: DOMPurify.sanitize(data.ConfirmPassword)
     }


    showBackdrop(); 

    if (edit && formData) {
      setEdit(true)
      updateProfile(environtment.api + "update-profile/" + userId.EmployeeID,formData)
       .then((response) => {
        hideBackdrop();
        closeModal();
        setEdit(false)
        setFetchEdit(!fetchEdit)
        // setLoading(false);
        setId('')
        reset()
        showSnackbar(UPDATE_SUCCESSFULLY, SUCCESS);
  
      return
      })
      .catch((err) => {
        hideBackdrop();
        closeModal();
        setEdit(false)
        setFetchEdit(!fetchEdit)
        // setLoading(false);
        setId('')
        reset()
        showSnackbar(UPDATE_FAILED, ERROR);
    
      return
      })
     closeModal();
     setOpenSnackbar(false)
    return

    }

    if (data.Password !== data.ConfirmPassword) {
      setMatch("Password not match");
      return;
    }



     if(formData) {

      createProfile(environtment.api + "register/", formData)
      .then((response) => {
        hideBackdrop();
        closeModal();
        // setLoading(!loading);
        reset();
        showSnackbar(CREATE_SUCCESSFULLY, SUCCESS);
      return
      })
      .catch((err) => {
        hideBackdrop();
        closeModal();
        // setLoading(!loading);
        reset();
        showSnackbar(CREATE_SUCCESSFULLY, ERROR);
      return
      })
      e.preventDefault()
      closeModal();
    }
  };



  const handleClose = () => {
    closeModal();
  };



  const handleOpen = (data) => {
    

    setOpenSnackbar(false)
    if(!openSnackbar) {
    reset({
      FirstName:"",
      MiddleName: "",
      LastName:"",
      Email:"",
      Phone:"",
      Password:"",
      ConfirmPassword: ""
    })
    setEdit(false)
    setId('')
    if (document.activeElement.id === "edit") {
      setEdit(true);
      setId(data)
      reset({
        FirstName:data.FirstName,
        MiddleName: data.MiddleName,
        LastName: data.LastName,
        Email:data.Email,
        Phone: data.Phone
      })
    }


    openModal();
    return
  } 
  };


  const handleOpenDialog = (data) => {

    
    setOpenSnackbar(false)    
    showBackdrop();

    const dialogTitle = DELETE_TITLE;
    const dialogMessage = DELETE_DESCRIPTION;
    const confirmCallback = () => {
    const EmployeeID = data.EmployeeID;

    deleteProfile(environtment.api + "delete-profile/" + EmployeeID)
     .then((response) => {
      hideBackdrop();

      showSnackbar(DELETE_SUCCESSFULLY, SUCCESS);
       return
      })
      .catch((err) => {
       hideBackdrop();
  
       showSnackbar(DELETE_FAILED, ERROR);
       return
    }) 
    
    };


    const closeCallback = () => {
      console.log('Dialog closed!');
      hideBackdrop();
    };


    openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);

  };



  const handleChange = (e) => {
  
    const pagination = e.target.value
    setPagination(pagination)

  }
  const handleIncrement = () => {
       
    if(data.users.length < offset || data.users.length < 10) {
       return
    }
       setOffSet(offset + 10)
       return
  }

  const handleDecrement = () => {
    if(offset === 0) {
       return
    }
       setOffSet(offset - 10)
       return
}




  return (
    <div id="people-container">
      <div id="people-header">
      <h2 id="people-header-title">Employee list</h2>
      <Button variant="contained" color="primary" onClick={handleOpen} id="people-add">
        Add user
      </Button>
      </div>
      <Modal
        title={edit ? EDIT_PROFILE: ADD_USER}
        content={
          <form >
            <div className="form-group" id="input-column">
              <div className="input-contain">
                <label htmlFor="FirstName">FirstName:</label>
                <input
                  required=""
                  placeholder="Enter your FirstName"
                  className="form-control"
                  name="FirstName"
                  type="text"
                  {...register("FirstName", {
                    required: {
                      value: edit? false : true,
                      message: "*FirstName is required",
                    },
                  })}
                />
                <p className="errors-message">{edit ?  '' : errors.FirstName?.message}</p>
              </div>

              <div className="input-contain">
                <label htmlFor="MiddleName">MiddleName:</label>
                <input
                  required=""
                  placeholder="Enter your MiddleName"
                  className="form-control"
                  name="MiddleName"
                  type="text"
                  {...register("MiddleName", {
                    required: {
                      value: edit? false : true,
                      message: "*MiddleName is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.MiddleName?.message}</p>
              </div>
            </div>
            
            <div className="form-group" id="input-column">
              <div className="input-contain">
                <label htmlFor="LastName">LastName:</label>
                <input
                  required=""
                  placeholder="Enter your LastName"
                  className="form-control"
                  name="LastName"
                  type="text"
                  {...register("LastName", {
                    required: {
                      value: edit? false : true,
                      message: "*LastName is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.LastName?.message}</p>
              </div>

              <div className="input-contain">
                <label htmlFor="Email">E-mail:</label>
                <input
                  required=""
                  placeholder="Enter your E-mail"
                  className="form-control"
                  name="Email"
                  type="text"
                  {...register("Email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "*Input a valid Email",
                    },
                    required: {
                      value: edit? false : true,
                      message: "*Email is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.Email?.message}</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="Phone">Phone:</label>
              <input
                required=""
                placeholder="Enter your Phone"
                className="form-control"
                name="Phone"
                type="number"
                {...register("Phone", {
                  required: {
                    value:edit? false : true,
                    message: "*Phone is required",
                  },
                })}
              />
              <p className="errors-message">{edit ?  '' : errors.Phone?.message}</p>
            </div>

            <div className={edit ? "form-group" + " " + "edit-profile" : "form-group"}>
              <label htmlFor="Password">Password:</label>
              <input
                required=""
                placeholder="Enter your Password"
                className="form-control"
                name="Password"
                type="Password"
                {...register("Password", {
                  required: {
                    value:edit? false : true,
                    message: "*Password is required",
                  },
            
                })}
              />
              <p className="errors-message">{errors.Password?.message}</p>
            </div>
            <div className={edit ? "form-group" + " " + "edit-profile" : "form-group"}>
              <label htmlFor="ConfirmPassword">Confirm Password:</label>
              <input
                required=""
                placeholder="Enter your ConfirmPassword"
                className="form-control"
                name="ConfirmPassword"
                type="Password"
                {...register("ConfirmPassword", {
                  required: {
                    value: edit? false : true,
                    message: "*ConfirmPassword is required",
                  },
                })}
              />
              <p className="errors-message">
                {match ? match : errors.ConfirmPassword?.message}
              </p>
            </div>
          </form>
        }
        actions={
          <>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit(submit)}>
              Confirm
            </Button>
          </>
        }
      />
    
      <div className="table-container">
        <Table Data={{data,paginate}} CallBack={{handleOpenDialog,handleOpen,handleChange,handleDecrement,handleIncrement}}/>
      </div>
      <SnackbarComponent /> 
     <BackdropComponent />
    <DialogComponent />
  </div>
  );
};

export default People;
