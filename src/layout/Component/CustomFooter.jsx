import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";


// 섹션 데이터를 배열로 정의
const sections = [
    {
        title: '회사',
        items: ['상세정보', '채용정보', 'For the Record']
    },
    {
        title: '커뮤니티',
        items: ['아티스트', '개발자', '투자자', '공급업체']
    },
    {
        title: '유용한 링크',
        items: ['지원']
    },
    {
        title: '스포티파이 요금제',
        items: ['Premium 개인', 'Premium 듀오']
    }
];

const socialMediaIcons = [
    { id: 1, name: <FontAwesomeIcon icon={faInstagram} size={'xl'} />, url: '#' },
    {id: 2, name: <FontAwesomeIcon icon={faFacebook} size={'xl'} />, url: '#'},
    {id: 3, name: <FontAwesomeIcon icon={faTwitter} size={'xl'} />, url: '#'}
];

const CustomFooter = () => {
    return (
        <>
            <div className="grid grid-cols-6 h-[200px] text-white mx-5 mt-20">
                {sections.map((section, index) => (
                    <div key={index}>
                        <ul>
                        <li className="font-bold text-lg mb-4">{section.title}</li>
                            {section.items.map((item, i) => (
                                <li className={'text-sm mt-2'} key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div></div>
                <div className="flex gap-5">
                    {socialMediaIcons.map(icon => (
                        <button key={icon.id} className="w-12 h-12 rounded-full hover:bg-[rgb(36,36,36)]">
                            {icon.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="border-t-[1px] border-[rgb(88,88,88)] pt-4 px-5 h-[100px] text-white">
                &copy; {new Date().getFullYear()} Noona React-study Group Num 3. All rights reserved.
            </div>
        </>
    );
};

export default CustomFooter;
