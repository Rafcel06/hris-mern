import React, {useEffect,useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import '../App.css'
import { useAuth } from "../AuthGuard/Auth";
import secureLocalStorage from "react-secure-storage";
import { faRightFromBracket   } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Subnavigation from "./Subnavigation";
import logo from "../Assets/dashboard.png";
import { routeConfig } from "../Routing/routeConfig";

const useStyle = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    margin:'-7px',
    padding: 0,
    
  },
  expand_icon: {
    color: "white",
  },
});   

const Navigation = ({showBar}) => {
  
  const {user,login,logout} = useAuth()
  const navigate = useNavigate();
  const navRef = useRef(null);
  const classes = useStyle();


  const gotoLogin = () => {
    secureLocalStorage.clear();
    logout()
    navigate("/");
  };

  useEffect(() => {
     if(showBar.navBarVisible) {
             const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
          showBar.setNavBarVisible(!showBar.navBarVisible)
      }
  
    };
    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
     }

  }, [showBar.navBarVisible]);

  const sBar = showBar.navBarVisible ?  true : false


  return (
    <>
      <nav id="navigation-list" className={sBar? 'show' : 'hide'} ref={navRef}>
        <div className="navigation-path" id="navigation-logo">
          <img id="navigation-image" src={logo} />
        </div>

{routeConfig[3].children?.map((route, index) => (
          !route.parentnaviagtion ? ( !route?.subnaviagtion ?
            <Link key={index} to={route?.path} className="navigation-path">
              <FontAwesomeIcon icon={route?.icons} className="navigation-icons" />
              {route?.path}
            </Link>  :
            null
          ) : (
            <div key={index} className={classes.root}>
              <Accordion sx={{ boxShadow: 0, backgroundColor: "transparent", width: '118%', position: 'relative', left: '-.6em' }}>
                <AccordionSummary
                  id="panel-header"
                  aria-controls="panel-content"
                  expandIcon={<ExpandMoreIcon className={classes.expand_icon} />}
                >
                  <Link to={route.path} className="navigation-path">
                    <FontAwesomeIcon icon={route?.icons} className="navigation-icons" />
                    {route?.path}
                  </Link>
                </AccordionSummary>
                <AccordionDetails>
                  <Subnavigation />
                </AccordionDetails>
              </Accordion>
            </div>
          )
        ))}
        <div className="navigation-path" onClick={gotoLogin}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="navigation-icons"
          />
          Log out
        </div>
      </nav>
    </>
  );
};

export default Navigation;
