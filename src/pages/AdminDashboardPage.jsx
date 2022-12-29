import React, { useContext, useState } from "react";
import { AuthContext } from "../authContext";
import { useDrop } from "react-dnd";

import DashboardList from "../components/DashboardList";
import downArrow from "../assets/icons/caret-down.svg";
import userIcon from "../assets/icons/user.svg";
import MkdSDK from "../utils/MkdSDK";

const getVideo = async () => {
  const sdk = new MkdSDK();

  sdk._table = "video";
  sdk._method = "PAGINATE";
  const dashboardList = await sdk.callRestAPI(
    // prettier-ignore
    { payload: { "payload": {}, "page": 1, "limit": 10 } },
    "PAGINATE"
  );
  return dashboardList;
};

const AdminDashboardPage = () => {
  const { dispatch } = useContext(AuthContext);
  const logoutHundler = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
  };

  const list = getVideo();
  const [board, setBoard] = useState([]);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "aside",
    drop: (item) => addListToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addListToBoard = (id) => {
    const dashboardList = dashboardListContent.filter((item) => item.id === id);
    setBoard([dashboardList[0]]);
  };

  getVideo();

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
                <img src={downArrow} alt="" className="w-6" />
              </li>
            </ul>
            <div className="grid gap-5 col-span-full" ref={dropRef}>
              {board.map((item) => (
                <DashboardList
                  id={item.id}
                  num={item.id}
                  title={item.title}
                  author={item.author}
                  likeNum={item.likeNum}
                  img={item.img}
                  key={item.id}
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
