import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { faArrowUpFromBracket,faEyeSlash, faEye} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import secureLocalStorage from "react-secure-storage";
import useBackdrop from "../Api/useBackdrop";
import useSnackbar from "../Api/useSnakbar";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";
import {
  UPDATE_SUCCESSFULLY,
  UPDATE_FAILED,
  ERROR,
  SUCCESS,
  INVALID
} from "../Utils/constant";
import ProfileImage  from "../Assets/anonymous.png" 

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(secureLocalStorage.getItem("authenticate")).session
  );

  const form = useForm({
    defaultValues: {
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const [eye, setEye] = useState(false);
  const [invalid,setInvalid] = useState(false)
  const hide = !eye ? faEye : faEyeSlash;
  const type = !eye ? "password" : "text";
  const [image,setImage] = useState(false);
  const {
    data,
    queryLoading,
    queryError,
    setError,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useQueryHooks(environtment.api + "all-profile/",0,0);
  const { SnackbarComponent, showSnackbar, setOpenSnackbar, openSnackbar } =useSnackbar();
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();



  const submit = (data,e) => {
    if(data.password !== data.confirmPassword) {
          setInvalid(true)
    }
    showBackdrop();
    setInvalid(false)

    updateProfile(environtment.api + "update-profile/" + user.id, data)
      .then((response) => {
        showSnackbar(UPDATE_SUCCESSFULLY, SUCCESS);
        hideBackdrop();
        
      })
      .catch((err) => {
        showSnackbar(UPDATE_FAILED, ERROR);
        hideBackdrop();
        
      });
    hideBackdrop();
    setOpenSnackbar(false);

    
    if(!openSnackbar) {
        
    reset()
    }

    e.preventDefault()

  };

    
  const selectFile = (event) => {
 
  const reader = new FileReader()

        reader.onlaod = () => {
           console.log(reader.result)
        }

        console.log(reader.readAsDataURL(event.target.files[0]))
 }


  return (
    <>
      <h2>Update Profile Infomation</h2>
      <form className="profile-form">
        <div className="profile-form-cards">
          <div className="form-group">
            <div className="profile-form-step">1</div>
            <h1 className="profile-form-label">Profile</h1>
          </div>

          <div className="form-group"  id="profile-input-file">
            <figure className="profile-form-image">
                  <img src={image ? '' : ProfileImage}/>
            </figure>

            <div className="form-group">
            
            <label htmlFor="profileImage" className="profile-input-label" id="profile-input-file-label">
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
              Upload Image
            </label>
            <input
              className="form-control"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              type="file"
              {...register("profileImage", {
                onChange: selectFile,
                required: {
                  value: false,
                },
              })}
            />
            </div>
            {/* <label htmlFor="email" className="profile-input-label">
              Your e-mail
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="E-mail"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "*Input a valid email",
                },
                required: {
                  value: true,
                  message: "*Email is required",
                },
              })}
            />
            <p className="errors-message">{errors.email?.message}</p> */}
          </div>

          <div className="form-group">
            <label htmlFor="firstName" className="profile-input-label">
              First Name
            </label>
            <input
              required=""
              placeholder="First Name"
              className="form-control"
              name="firstName"
              type="text"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "*FirstName is required",
                },
              })}
            />
            <p className="errors-message">{errors.firstName?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="middleName" className="profile-input-label">
              Middle Name
            </label>
            <input
              required=""
              placeholder="Middle Name"
              className="form-control"
              name="middleName"
              type="text"
              {...register("middleName", {
                required: {
                  value: true,
                  message: "*MiddleName is required",
                },
              })}
            />
            <p className="errors-message">{errors.middleName?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="profile-input-label">
              Last Name
            </label>
            <input
              required=""
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "*FirstName is required",
                },
              })}
            />
            <p className="errors-message">{errors.lastName?.message}</p>
          </div>

          
        </div>

        <div className="profile-form-cards">
          <div className="form-group">
            <h1
              className="profile-form-label"
              style={{ color: "transparent" }}
              id="profile-form-contact"
            >
              Contact
            </h1>
          </div>

          <div className="form-group">
            <label htmlFor="Phone" className="profile-input-label">
              Personal phone number
            </label>
            <input
              required=""
              placeholder="Personal Number"
              className="form-control"
              name="phone"
              type="number"
              {...register("phone", {
                required: {
                  value: true,
                  message: "*Phone Number is required",
                },
              })}
            />
            <p className="errors-message">{errors.phone?.message}</p>
          </div>

          <div className="form-group">
            <label
              htmlFor="emegercyPhoneNumber"
              className="profile-input-label"
            >
              Emergency phone number
            </label>
            <input
              required=""
              placeholder="Work phone number"
              className="form-control"
              name="emegercyPhoneNumber"
              type="number"
              {...register("emergencyPhoneNumber", {
                required: {
                  value: true,
                  message: "*Emergency phone number is required",
                },
              })}
            />
            <p className="errors-message">
              {errors.emergencyPhoneNumber?.message}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="currentAddress" className="profile-input-label">
              Current Address
            </label>
            <input
              required=""
              placeholder="Current address"
              className="form-control"
              name="currentAddress"
              type="text"
              {...register("currentAddress", {
                required: {
                  value: true,
                  message: "*Current address is required",
                },
              })}
            />
            <p className="errors-message">{errors.currentAddress?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="permanentAddress" className="profile-input-label">
              Permanent Address
            </label>
            <input
              required=""
              placeholder="Permanent Address"
              className="form-control"
              name="permanentAddress"
              type="text"
              {...register("permanentAddress", {
                required: {
                  value: true,
                  message: "*Permanent Address is required",
                },
              })}
            />
            <p className="errors-message">{errors.permanentAddress?.message}</p>
          </div>
        </div>

        <div className="profile-form-cards">
          <div className="form-group">
            <div className="profile-form-step">2</div>
            <h1 className="profile-form-label">Credentials</h1>
          </div>


          <div className="form-group">
            <label htmlFor="email" className="profile-input-label">
              Your e-mail
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="E-mail"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "*Input a valid email",
                },
                required: {
                  value: true,
                  message: "*Email is required",
                },
              })}
            />
            <p className="errors-message">{errors.email?.message}</p>
          </div>


          <div className="form-group">
            <label htmlFor="password" className="profile-input-label">
              New Password
            </label>
            <input
              required=""
              placeholder="New password"
              className="form-control"
              name="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "*New Password is required",
                },
              })}
            />
            <p className="errors-message">{errors.password?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="profile-input-label">
              Confirm password
            </label>
            <input
              required=""
              placeholder="Confirm password"
              className="form-control"
              name="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "*Confirm password is required",
                },
              })}
            />
            <p className="errors-message">{invalid ? INVALID : errors.confirmPassword?.message}</p>
          </div>

          <div className="form-group">
            <label
              className="profile-input-label"
              style={{ color: "transparent" }}
            >
              Update Button
            </label>
            <input
              required=""
              placeholder="update"
              id="Update-btn"
              type="submit"
              value="Correct save info"
              onClick={() => handleSubmit(submit)}
            />
          </div>
        </div>
      </form>
      <SnackbarComponent />
      <BackdropComponent />
    </>
  );
};

export default Profile;
