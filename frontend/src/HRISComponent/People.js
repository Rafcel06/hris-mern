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
import axios from "axios";
import Table from "./Table";
import secureLocalStorage from "react-secure-storage";
import { UPDATE_FAILED,UPDATE_SUCCESSFULLY,DELETE_FAILED,DELETE_SUCCESSFULLY,CREATE_FAILED,CREATE_SUCCESSFULLY, SUCCESS, ERROR,DELETE_TITLE,DELETE_DESCRIPTION, EDIT_PROFILE, ADD_USER } from "../Utils/constant";


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
    showBackdrop(); 

    if (edit) {
      setEdit(true)
      updateProfile(environtment.api + "update-profile/" + userId.id,data)
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

    if (data.password !== data.confirmPassword) {
      setMatch("Password not match");
      return;
    }


      createProfile(environtment.api + "register/", data)
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
  };



  const handleClose = () => {
    closeModal();
  };



  const handleOpen = (data) => {
    

    setOpenSnackbar(false)
    if(!openSnackbar) {
    reset({
      firstName:"",
      middleName: "",
      lastName:"",
      email:"",
      phone:"",
      password:"",
      confirmPassword: ""
    })
    setEdit(false)
    setId('')
    if (document.activeElement.id === "edit") {
      setEdit(true);
      setId(data)
      reset({
        firstName:data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email:data.email,
        phone: data.phone
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
    const id = data.id;

    deleteProfile(environtment.api + "delete-profile/" + id)
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
                <label htmlFor="firstName">FirstName:</label>
                <input
                  required=""
                  placeholder="Enter your FirstName"
                  className="form-control"
                  name="firstName"
                  type="text"
                  {...register("firstName", {
                    required: {
                      value: edit? false : true,
                      message: "*FirstName is required",
                    },
                  })}
                />
                <p className="errors-message">{edit ?  '' : errors.firstName?.message}</p>
              </div>

              <div className="input-contain">
                <label htmlFor="middleName">MiddleName:</label>
                <input
                  required=""
                  placeholder="Enter your MiddleName"
                  className="form-control"
                  name="middleName"
                  type="text"
                  {...register("middleName", {
                    required: {
                      value: edit? false : true,
                      message: "*MiddleName is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.middleName?.message}</p>
              </div>
            </div>
            
            <div className="form-group" id="input-column">
              <div className="input-contain">
                <label htmlFor="lastName">LastName:</label>
                <input
                  required=""
                  placeholder="Enter your LastName"
                  className="form-control"
                  name="lastName"
                  type="text"
                  {...register("lastName", {
                    required: {
                      value: edit? false : true,
                      message: "*LastName is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.lastName?.message}</p>
              </div>

              <div className="input-contain">
                <label htmlFor="email">E-mail:</label>
                <input
                  required=""
                  placeholder="Enter your E-mail"
                  className="form-control"
                  name="email"
                  type="text"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "*Input a valid email",
                    },
                    required: {
                      value: edit? false : true,
                      message: "*Email is required",
                    },
                  })}
                />
                <p className="errors-message">{ edit ?  '' : errors.email?.message}</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                required=""
                placeholder="Enter your Phone"
                className="form-control"
                name="phone"
                type="number"
                {...register("phone", {
                  required: {
                    value:edit? false : true,
                    message: "*Phone is required",
                  },
                })}
              />
              <p className="errors-message">{edit ?  '' : errors.phone?.message}</p>
            </div>

            <div className={edit ? "form-group" + " " + "edit-profile" : "form-group"}>
              <label htmlFor="password">Password:</label>
              <input
                required=""
                placeholder="Enter your Password"
                className="form-control"
                name="password"
                type="password"
                {...register("password", {
                  required: {
                    value:edit? false : true,
                    message: "*Password is required",
                  },
            
                })}
              />
              <p className="errors-message">{errors.password?.message}</p>
            </div>
            <div className={edit ? "form-group" + " " + "edit-profile" : "form-group"}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                required=""
                placeholder="Enter your ConfirmPassword"
                className="form-control"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: edit? false : true,
                    message: "*ConfirmPassword is required",
                  },
                })}
              />
              <p className="errors-message">
                {match ? match : errors.confirmPassword?.message}
              </p>
            </div>
          </form>
        }
        actions={
          <>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={(e) => handleSubmit(submit)}>
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
