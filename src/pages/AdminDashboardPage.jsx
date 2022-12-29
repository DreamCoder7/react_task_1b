import React, { useContext } from "react";
import { AuthContext } from "../authContext";

import DashboardList from "../components/DashboardList";
import downArrow from "../assets/icons/caret-down.svg";
import userIcon from "../assets/icons/user.svg";
import MkdSDK from "../utils/MkdSDK";

const dashboardListContent = [
  {
    img: "",
    title: "Rune raises $100,000 for marketing through NFT butterflies sale",
    author: "ninjanft",
    likeNum: 254,
  },
  {
    img: "",
    title: "The Cryptocurrency Trading Bible",
    author: "deniscrypto",
    likeNum: 203,
  },
  {
    img: "",
    title: "Designing our new company brand: Meta",
    author: "meta_world98",
    likeNum: 134,
  },
  {
    img: "",
    title: "Connect media partners, earn exciting rewards  for today",
    author: "kingdom43world",
    likeNum: 99,
  },
  {
    img: "",
    title: "Designing a more effective proejcts",
    author: "sjkj3987423kjbdfsf",
    likeNum: 88,
  },
];

const getVideo = () => {
  const sdk = new MkdSDK();

  sdk._table = "video";
  sdk._method = "PAGINATE";
  const list = sdk.callRestAPI(
    { payload: { payload: {}, page: 1, limit: 10 } },
    "PAGINATE"
  );
  // console.log(list);
};

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const logoutHundler = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
  };

  return (
    <>
      <div className="w-full text-7xl min-h-screen text-gray-700 bg-black p-4 px-24">
        <nav className="flex justify-between">
          <div className="text-white text-4xl">APP</div>
          <button
            onClick={logoutHundler}
            className="flex items-center gap-1 bg-lime-400  text-base py-0 px-4 rounded-3xl"
          >
            <img src={userIcon} alt="" className="w-5" />
            Logout
          </button>
        </nav>
        <main className="py-20">
          <header className="flex justify-between items-center">
            <p className="text-3xl text-gray-400">Today's leaderboard</p>
            <ul className="flex gap-5 bg-gray-900 p-4 px-6 rounded">
              <li className="text-lg text-slate-500">30 May 2022</li>
              <li className="text-sm bg-lime-400 px-1 py-0 rounded font-light uppercase">
                Submissions Open
              </li>
              <li className="text-lg text-slate-500">11:34</li>
            </ul>
          </header>
          <article className="grid grid-cols-3">
            <ul className="flex justify-between py-6 row-span-1 col-span-full">
              <li className="text-lg text-gray-800"># Title</li>
              <li className="text-lg text-gray-800">Author</li>
              <li className="flex gap-2 text-lg text-gray-800 cursor-pointer">
                Most Liked
                <img src={downArrow} alt className="w-6" />
              </li>
            </ul>
            <div className="flex flex-col gap-5 col-span-full">
              {dashboardListContent.map((item, index) => (
                <DashboardList
                  num={index + 1}
                  title={item.title}
                  author={item.author}
                  likeNum={item.likeNum}
                  img={item.img}
                  key={index}
                />
              ))}
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardPage;
