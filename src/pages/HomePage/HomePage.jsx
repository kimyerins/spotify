import React, {useEffect} from "react";
import Card from "../../common/Card";
import {useDispatch, useSelector} from "react-redux";
import {userIdActions} from "../../redux/reducer/userIdSlice.jsx";
import {useUserId} from "../../hooks/useUserId.jsx";

const HomePage = () => {

    const dispatch=useDispatch();

    const {data} = useUserId();

    useEffect(()=>{
        if(data){
            dispatch(userIdActions.login(data.id))
        }
    }, [data])

    const userid = useSelector((state)=>state.userId.id)

    console.log('userid',userid)


  return (
    <div className={"w-[100%]"}>
      <h2 className="text-white">HomePage</h2>
      <Card />
    </div>
  );
};

export default HomePage;
