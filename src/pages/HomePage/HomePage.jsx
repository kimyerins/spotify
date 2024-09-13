import React, { useEffect } from "react";
import Card from "../../common/Card";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../../hooks/useUserInfo.jsx";
import { userInfoActions } from "../../redux/reducer/userInfoSlice.jsx";
import './Homepage.style.css';

const HomePage = () => {

  const filterTitle={
    all:'모두',
    music:'음악',
    artist:'아티스트',
    album:'앨범'
  }
  const dispatch = useDispatch();

  const { data } = useUserInfo();
  useEffect(() => {
    if (data) {
      dispatch(userInfoActions.login(data));
    }
  }, [data, dispatch]);

  return (
      <div
          className={'flex h-[calc(100vh-140px)] w-[calc(100vw-700px)] min-w-[600px] mx-2 p-3 bg-[#121212] justify-center rounded-[10px] overflow-hidden hover:overflow-y-auto custom-scrollbar'}>
        <div className={'main max-w-[2100px]'}>
          <div className={'flex'}>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.all}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.music}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.artist}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.album}</button>
          </div>
          <div className={'card-div text-white mx-1 mt-10 w-[calc(100vw-900px)] min-w-[560px] max-w-[1900px]'}>
            <div>
              <h1>
                인기라디오
              </h1>
              <div className={'grid grid-cols-[repeat(auto-fit,minmax(165px,1fr))] gap-1'}>
                <Card title={'몰라몰라'} subTitle={'나도몰라'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
                <Card genre={'d'} imgSrc={'d'}/>
              </div>
            </div>
            <div>
              <h1>
                인기라디오
              </h1>
              <div>

              </div>
            </div>
            <div>
              <h1>
                인기라디오
              </h1>
              <div>

              </div>
            </div>
            <div>
              <h1>
                인기라디오
              </h1>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
