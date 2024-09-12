import React, {useEffect} from "react";
import Card from "../../common/Card";
import {useDispatch, useSelector} from "react-redux";
import {useUserInfo} from "../../hooks/useUserInfo.jsx";
import {userInfoActions} from "../../redux/reducer/userInfoSlice.jsx";

const HomePage = () => {

    const dispatch=useDispatch();

    const {data} = useUserInfo();
    useEffect(()=>{
        if(data){
            dispatch(userInfoActions.login(data))
        }
    }, [data,dispatch])

  return (
    <div className={"w-[100%]"}>
      <h2 className="text-white">HomePage</h2>
      <Card />
    </div>
  );
};

export default HomePage;
