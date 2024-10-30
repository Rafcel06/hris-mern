import React, { useEffect, useRef, useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useNavigate, useLocation } from "react-router-dom";
import useQueryHooks from "../Api/useQueryHook";
import { environtment } from "../Environment/environment";
import useDialog from "../Api/useDialog";
import profile from "../Assets/profile.jpg";
import {
  faUser,
  faCog,
  faAdjust,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../AuthGuard/Auth"
import HeaderNavigation from "./HeaderNavigation"
import { Link } from "react-router-dom";

const Body = ({ showBar }) => {
  const {
    data,
    queryLoading,
    queryError,
    setError,
    createProfile,
    updateProfile,
    deleteProfile,
  } = useQueryHooks(environtment.api + "all-profile/", 0, 0, false);
  const { openDialog, DialogComponent } = useDialog();
  const profileImg = useRef(null);
  const [showSubNav,setShowSubNav] = useState(false);
  const [subNavigation,setSubNavigation] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {user,login,logout} = useAuth()




  useEffect(() => {
    if (queryError) {
      handleOpenDialog();
    }
  }, [location]);

  const routes = ['First','Second','Third']
  const handleOpenDialog = () => {
    if (queryError) {
      const dialogTitle = "Session Expired";
      const dialogMessage = "Please relogin to renew your session";
      const confirmCallback = () => {
        navigate("/");
        secureLocalStorage.clear();
        return;
      };

      const closeCallback = () => {
        navigate("/");
        secureLocalStorage.clear();
        return;
      };

      openDialog(dialogTitle, dialogMessage, confirmCallback, closeCallback);
      return;
    }
  };


  // const gotoLogin = () => {
  //   handleClose()
  //   secureLocalStorage.clear();
  //   logout()
  //   navigate("/");
  // };

  const addSubNavigation = (route) =>  {
      if(route.path === 'people') {
         setShowSubNav(true)
         const routeArr = route
         setSubNavigation(routeArr)
         return
      }
      else if(route.path === 'payroll') {
         setShowSubNav(true)
         const routeArr = route
         setSubNavigation(routeArr)
         return
      }
      else {
         setShowSubNav(false)
         setSubNavigation()
      }
  }

  return (
    <>
      <div className="home-body">
        <header id="header-body-contain">
          <HeaderNavigation addSubNavigation={addSubNavigation}/>
        </header>
        {
         showSubNav ? 
         
          <header id="header-body-contain-sub" style={{marginTop:'0.7em',color : '#000', padding:'0 1.5em',textTransform:'capitalize'}}>
            {
              subNavigation?.children?.map((mapped,index) => <Link  className="sub-list-navigation" key={index} to={subNavigation?.path  + "/" + mapped?.path}>{mapped?.path.replace(/-/g,' ')}</Link>)
            }
          </header>
         
         : null
        }
        <div className="home-body-contain">
          <Outlet />
        </div>
      </div>
      <DialogComponent />
    </>
  );
};

export default Body;
