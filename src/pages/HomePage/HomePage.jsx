import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserInfo } from "../../hooks/useUserInfo.jsx";
import { userInfoActions } from "../../redux/reducer/userInfoSlice.jsx";
import './Homepage.style.css';
import {useGenreSeeds} from "../../hooks/useGenreSeeds.js";
import Recommend from "./Recommend.jsx";
import Artists from "./Artists.jsx";
import CustomFooter from "../../layout/Component/CustomFooter.jsx";

const HomePage = () => {

  const filterTitle={
    all:'모두',
    music:'음악',
    artist:'아티스트',
    album:'앨범'
  }

  const artistsArray = [
    "6qvVoPGEqNCyYSjYCgfV1v", // 최유리
    "3HqSLMAZ3g3d5poNaI7GOU", // 아이유
    "5TnQc2N1iKlFjYD7CPGvFc", // 데이6
    "28ot3wh4oNmoFOdVajibBl", // 엔믹스
    "2bWTIIQP9zaVc55RaMGu7e", // 서리
    "0XufO9nLOKNN0w0qNrDrZy", // ewer
    "6YVMFz59CuY7ngCxTxjpxE", // 에스파
    "41MozSoPIsD1dJM0CLPjZF", // 블랙핑크
    "6HvZYsbFfjnjFrWF950C9d", // 뉴진스
    "5DnjOSzLCfn4hDbLECq8pt", // 양다일
    "2hcsKca6hCfFMwwdbFvenJ", // 비투비
    "0Y2AcMPMpeuPXtPQGVvRBq", // 이영지
    "6k4r73Wq8nhkCDoUsECL1e", // 멜로망스
    "6dhfy4ByARPJdPtMyrUYJK", // 백예린
    "5z8B2oTjiZbpbMB6rAfPGl"  // 허회경
  ];

  const getRandomItems = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomIds = getRandomItems(artistsArray, 10).join(',');

  const dispatch = useDispatch();
  const {data:genre} = useGenreSeeds();



  const defaultGenre = ['k-pop']
  const randomGenre=()=>{
    if (genre && genre.length > 1) {
      return getRandomItems(genre, 1);
    }
    return [];
  }

  const combinedGenre = ()=> {
    const random = randomGenre();
    return [...defaultGenre, ...random]
  }

  const { data } = useUserInfo();
  useEffect(() => {
    if (data) {
      dispatch(userInfoActions.login(data));
    }
  }, [data, dispatch]);

  return (
      <div
          className={'flex justify-center mx-2'}>
        <div className={'main max-w-[2100px]'}>
          <div className={'flex mt-1 px-5'}>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.all}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.music}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.artist}</button>
            <button
                className={'h-8 px-4 bg-[rgb(37,37,37)] rounded-full text-[rgb(174,174,174)] mx-1 hover:bg-[rgb(214,214,214)] hover:text-black'}>{filterTitle.album}</button>
          </div>
          <div className={'card-div text-white mx-1 mt-10 px-5 w-[calc(100vw-800px)] min-w-[560px] max-w-[1900px]'}>
            {genre && combinedGenre().map((item, index)=>(
                <Recommend key={index} data={item}/>
            ))}
              <Artists key={combinedGenre().length} data={randomIds}/>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
