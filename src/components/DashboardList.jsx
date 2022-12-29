import React from "react";
import { useDrag } from "react-dnd";

import arrowUp from "../assets/icons/arrow-up.svg";

export default function DashboardList({
  id,
  num,
  img,
  title,
  author,
  likeNum,
}) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "aside",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <aside
      className="grid grid-cols-3 items-center justify-items-center border border-gray-600 rounded-lg p-4"
      ref={dragRef}
    >
      <div className="flex gap-5 items-center">
        <p className="text-lg text-gray-800 ">0 {num}</p>
        <img src={img} alt="" />
        <h4 className="text-2xl text-gray-600">{title}</h4>
      </div>
      <p className="flex gap-1 items-center text-lg text-lime-900">
        <img className="w-5 h-5 rounded-full border border-lime-200 "></img>
        {author}
      </p>
      <p className="flex gap-2 text-lg text-gray-200 justify-self-end">
        {likeNum}
        <img src={arrowUp} alt="" className="w-6" />
      </p>
    </aside>
  );
}
