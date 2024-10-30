import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthGuard/Auth';
import Navigation from "./Navigation";
import Body from "./Body";

function Home() {
  const navigate = useNavigate();
  const {user,login,logout} = useAuth()


  // const gotoLogin = () => {
  //       sessionStorage.clear()
  //       logout()
  //       navigate('/')
  // }

  const [navBarVisible, setNavBarVisible] = useState(false);

  return (
    <>
      <div id="home-container">
        {/* <Navigation showBar={{navBarVisible,setNavBarVisible}}/> */}
          <Body showBar={{navBarVisible,setNavBarVisible}}/>
      </div>
    </>
  );
}

export default Home;
