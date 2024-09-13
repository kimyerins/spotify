import React, { useState, useEffect, useRef } from 'react';
import RectangleCard from '../../common/RectangleCard';
import { useCategoryQuery } from '../../hooks/useCategory';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const token = localStorage.getItem("spotifyToken");
    const { data, error, isLoading } = useCategoryQuery(36);
    const [columns, setColumns] = useState(6);
    const containerRef = useRef(null);

    // 메인 컨테이너(부모 요소) 너비에 따라 그리드 컬럼 수를 설정
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                if (width < 600) {
                    setColumns(2);
                } else if (width < 780) {
                    setColumns(3);
                } else if (width < 1300) {
                    setColumns(4);
                } else if (width < 1520) {
                    setColumns(5);
                } else {
                    setColumns(6);
                }
            } else {
                setColumns(4);
            }
        };

        handleResize(); // 처음 렌더링 시 그리드 컬럼을 설정
        window.addEventListener('resize', handleResize); // 윈도우 리사이즈 시 그리드 컬럼을 변경

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // grid-cols 클래스 이름
    const gridClass = `grid-cols-${columns}`;

    return (
        <div ref={containerRef} className='w-full h-fit flex flex-col text-white bg-[#121212] p-4 rounded-lg min-w-[500px]'>
            <h2 className='h-[60px] flex font-bold text-2xl items-center mt-8'>모두 둘러보기</h2>
            <div className={`grid gap-4 ${gridClass}`}>
                {data && data.map((category, index) => (
                    <Link to={`https://open.spotify.com/genre/${category.id}`} key={index}>
                        <RectangleCard key={category.id} genre={category.name} imgSrc={category.icons[0].url} index={index} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
