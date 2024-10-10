import React, { useEffect, useState,useRef} from "react";
import { useAuth } from "../AuthGuard/Auth";
import secureLocalStorage from "react-secure-storage";
import {
  faClock,
  faBullhorn,
  faGraduationCap,
  faHeartPulse,
  faUmbrellaBeach,
  faCalculator,
  faUserGroup,
  faChartSimple,
  faRotateRight,
  faCaretRight,
  faCaretLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Routes from "./Routes";
import useSnackbar from "../Api/useSnakbar";
import useBackdrop from "../Api/useBackdrop";
import useModal from "../Api/useModal";
import useDialog from "../Api/useDialog";
import { useForm } from "react-hook-form";
import { Button,   } from "@mui/material";


import '../App.css'
import { CALCULATE_TIME_OFF, REQUEST_TIME_OFF } from "../Utils/constant";



const Dashboard = () => {

  const { user, login } = useAuth();
  const form = useForm();
  const { register, handleSubmit, formState, reset} = form;
  const { errors } = formState;
  const { Modal, openModal, closeModal } = useModal();
  const { SnackbarComponent, showSnackbar,setOpenSnackbar, openSnackbar} = useSnackbar();
  const { BackdropComponent, showBackdrop, hideBackdrop } = useBackdrop();
  const { openDialog, DialogComponent } = useDialog();
  const [calculate,setCalculate] = useState(false)
  const cardContainerRef = useRef(null);
  const [routeTab, setRoute] = useState({
    headCounts: false,
    myTeams: true,
    turnOver: false,
  });
  


  useEffect(() => {
    login(JSON.parse(secureLocalStorage.getItem("authenticate")).session); 
  }, []);


  
  const handleOpen = (data) => {
    openModal();

    const active_btn  = document.activeElement

    active_btn.id ? setCalculate(true) : setCalculate(false)
    
    console.log(calculate)

  };

  const changeRoutes = ({headCounts,myTeams,turnOver}) => {
      setRoute((preState) => {
        return {
          ...preState, headCounts, myTeams, turnOver
        }
      })
  }

  const scroll = (direction) => {
    if (cardContainerRef.current) {
      const container = cardContainerRef.current;
      const cardWidth = container.querySelector('.available-leave').offsetWidth;
      const scrollAmount = cardWidth + 10; 

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }

  }

  const handleClose = () => {
    closeModal();
  };

  const submit = (data,e) => {
     e.preventDefault()
     closeModal();
  }


  return (
    <div>
      <h2>
        Login as {user?.firstName + " "}
        {user?.lastName}
      
      </h2>
      <div id="dashboard-container">
        <div id="announcement-time-off" className="dashboard-sub-container">
          <div id="time-off" className="dashboard-blocks">
            <header className="dashboard-blocks-headers" id="time-off-header">
              <FontAwesomeIcon icon={faClock} className="dashboard-icons" />
              Time Off
            </header>
            <div className="time-and-button-container">
            <button className="button-scroll" onClick={() => scroll('left')}><FontAwesomeIcon icon={faCaretLeft} className="dashboard-icons" /></button>
            <div
              id="time-off-container"
              style={{
                display: "flex",
                flexDirection:'column',
                alignContent:'flex-start',
                margin:'20px 0',
                flexWrap:'wrap',
                overflowX:'scroll',
                height:'100px',
                gap:'0'
              }}
              ref={cardContainerRef}
            >
              <div className="available-leave">
                <h3 className="available-leave-description">Vacation</h3>
                <h2 className="available-leave-description">
                  <FontAwesomeIcon
                    icon={faUmbrellaBeach}
                    className="dashboard-icons"
                  />{" "}
                  76
                </h2>
                <h4 className="available-leave-description">HOURS AVAILABLE</h4>
                <p className="available-leave-description">
                  48 hours scheduled
                </p>
              </div>


              <div className="available-leave">
                <h3 className="available-leave-description">Sick</h3>
                <h2 className="available-leave-description">
                  <FontAwesomeIcon
                    icon={faUmbrellaBeach}
                    className="dashboard-icons"
                  />{" "}
                  76
                </h2>
                <h4 className="available-leave-description">HOURS AVAILABLE</h4>
                <p className="available-leave-description">
                  48 hours scheduled
                </p>
              </div>

            </div>
            <button className="button-scroll" onClick={() => scroll('right')}><FontAwesomeIcon icon={faCaretRight} className="dashboard-icons" /></button>
            </div>
            <div className="time-off-calculation">
              <button className="time-btn"  onClick={handleOpen} >Request Time Off</button>
              <button className="time-btn" id="calculate-request" onClick={handleOpen}>
                <FontAwesomeIcon
                  icon={faCalculator}
                  className="dashboard-icons"
                />
              </button>
            </div>
          </div>
          <div id="announcement" className="dashboard-blocks">
            <header className="dashboard-blocks-headers">
              <FontAwesomeIcon icon={faBullhorn} className="dashboard-icons" />
              Announcement
            </header>
            <div className="dashboard-block-data">
              <div className="dashboard-data" id="dashboard-announcement">
                <FontAwesomeIcon
                  icon={faBullhorn}
                  className="dashboard-icons-data"
                />
                <div className="dashboard-data-description">
                  Take a moment to complete your Employee Assessments.Complete
                  the assessments on the Performance tab on each employee's
                  profile. Please complete by Jun 30 (53 days ago). past due
                </div>
              </div>
            </div>
          </div>
          <div id="activities" className="dashboard-blocks">
            <div className="dashboard-block-data">
              <div className="dashboard-data">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="dashboard-icons-data"
                />
                <div className="dashboard-data-description">
                  <h4 className="activities-title">Training</h4>
                  <p className="activities-title">
                    5 active trainings, 2 past due or expired
                  </p>
                </div>
              </div>

              <div className="dashboard-data">
                <FontAwesomeIcon
                  icon={faHeartPulse}
                  className="dashboard-icons-data"
                />
                <div className="dashboard-data-description">
                  <h4 className="activities-title">Benefits</h4>
                  <p className="activities-title">
                    5 active trainings, 2 past due or expired
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="my-team">
          <div id="dashboard-team-container" className="my-team-sub-container">
              < Routes routeTab={routeTab}/>
          </div>
          <div id="dashboard-team-navigation" className="my-team-sub-container">
            <div className="dashboard-navigation-container">
            <div  className="dashboard-navigation" onClick={() => changeRoutes({headCounts: true, myTeams: false, turnOver: false})}>
              <FontAwesomeIcon
                icon={faChartSimple}
                className="navigation-icons"
              />
              Head Counts
            </div>
            
            </div>

            <div className="dashboard-navigation-container">
            <div   className="dashboard-navigation" onClick={() => changeRoutes({headCounts: false, myTeams: true, turnOver: false})}>
              <FontAwesomeIcon
                icon={faUserGroup}
                className="navigation-icons"
              />
              My Teams
            </div>
            
            </div>

            <div className="dashboard-navigation-container" onClick={() => changeRoutes({headCounts: false, myTeams: false, turnOver: true})}>
            <div   className="dashboard-navigation">
              <FontAwesomeIcon
                icon={faRotateRight}
                className="navigation-icons"
              />
              Turn Over
            </div>
            
            </div>
            
          </div>
        </div>
      </div>
      <Modal
        className="modal-container"
        title={ calculate ? CALCULATE_TIME_OFF : REQUEST_TIME_OFF}
        content={
          <form id="dashboard-calculate-form">
            <div className= {calculate ? "form-group"  + " " + "calculating" : "form-group" } id="input-column" style={{columnGap:'15px'}}>
              <div className="input-contain">
                <label htmlFor="leaveFrom">From:</label>
                <input
                  required=""
                  placeholder="From"
                  className="form-control"
                  name="leaveFrom"
                  type="date"
                  {...register("leaveFrom", {
                    required: {
                      value: !calculate ?  true : false,
                      message: "*From is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.leaveFrom?.message}</p>
              </div>

              <div className="input-contain">
                <label htmlFor="leaveTo">To:</label>
                <input
                  required=""
                  placeholder="To"
                  className="form-control"
                  name="leaveTo"
                  type="date"
                  {...register("leaveTo", {
                    required: {
                      value: true,
                      message: "*To is required",
                    },
                  })}
                />
                <p className="errors-message">{errors.leaveTo?.message}</p>
              </div>
            </div>

            



            <div className="form-group">
              <label htmlFor="category">Time Off Category:</label>
              <select
                required=""
                className="form-control-select"
                name="leaveCategory"
                {...register("leaveCategory", {
                  required: {
                    value: calculate ? true : false,
                    message: "*Leave category is required",
                  },
                })}
              >
               <option value="" >-Select-</option>
               <option value="Vacation">Vocation</option>
               <option value="Sick">Sick</option>
              </select>
              <p className="errors-message">
                { errors.leaveCategory?.message}
              </p>
            </div>


            <div className= {!calculate ? "form-group"  + " " + "calculating" : "form-group" }>
              <label htmlFor="asDate">As Of Date:</label>
              <input
                required=""
                className="form-control"
                name="asDate"
                type="date"
                {...register("asDate", {
                  required: {
                    value: calculate ? true : false,
                    message: "*Phone is required",
                  },
                })}
              />
              <p className="errors-message">{errors.asDate?.message}</p>
            </div>


            <div className= {!calculate ? "form-group"  + " " + "calculating" : "form-group" }>
              <label>Available Hours:</label>
               <div className="request-available-leave"></div>
            </div>


  
            <div className= {calculate ? "form-group"  + " " + "calculating" : "form-group" } >
              <label htmlFor="note">Note:</label>
              <textarea
                required=""
                placeholder="Enter your Phone"
                className="form-control"
                id="form-control-textarea"
                name="note"
                type="number"
                {...register("note", {
                  required: {
                    value: true,
                    message: "*Note is required",
                  },
                })}
              >
              </textarea>
              <p className="errors-message">{errors.note?.message}</p>
             
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
    </div>
  );
};

export default Dashboard;
