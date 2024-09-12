import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useSpotifyToken from "../../hooks/useSpotifyToken.jsx";

const ProtectPage = ({children}) => {
    const { token, login } = useSpotifyToken(); // 토큰과 로그인 함수 가져오기
    const navigate = useNavigate();

     useEffect(() => {
        // 토큰이 없으면 로그인 화면으로 이동
        if (!token) {
            login();
        }
    }, [token, navigate]);

    return (
        <>{children}</>
    );
};

export default ProtectPage;