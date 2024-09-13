import React from "react";

const AlbumBanner = () => {
  return (
    <div className="relative flex justify-center items-center  rounded-md w-full flex-grow-1  ">
      <div className="z-10 flex justify-center items-center  rounded-md w-full p-4">
        <div className="z-10 flex gap-6 self-stretch w-full h-full   ">
          <div
            className="rounded-md w-[232px] h-[232px] bg-cover shadow-custom hover:scale-[102%] transition-all duration-200"
            style={{
              backgroundImage: `url(
              "https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp")`,
            }}
          ></div>
          <div className="flex flex-col justify-end">
            <div className="text-white">
              <span className=" text-[14px]">EP</span>
            </div>
            <div className="text-white">
              <h2 className="text-8xl py-4 font-black">GOLDEN</h2>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <img
                  width={32}
                  src="https://i.namu.wiki/i/3B-OpZ4Zv3EHLm1L1u0vOWjT2Sy4uAT43W93T0QzZW-YhxaP8ECybTqzArW3u6xA86NG-GOWWPPnNyUgPMzllQ.webp"
                  className="rounded-full"
                />
              </div>
              <div>
                <ul className="text-white flex gap-1">
                  <li className="text-white hover:underline cursor-pointer">
                    정국
                  </li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">2023</li>
                  <li className="opacity-65">・</li>
                  <li className="opacity-65">11곡,</li>
                  <li className="opacity-65">11시간45분</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumBanner;
