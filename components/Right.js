import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";

function Right(props) {
  const [articles, setArticles] = useState([]);

  const country = useSelector((state) => state.city.country);
  const render = useSelector((state) => state.render.value.isUpdated);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.token) {
      fetch(`https://weatherapp-back-red.vercel.app/news/get/${country}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            setArticles(data.articles);
          }
        });
    }
  }, [country, render, user.token]);

  const list = articles.map((e, i) => {
    return <Article key={i} {...e} />;
  });

  return (
    <div className="w-1/5 bg-[#000A14] h-full flex flex-col border-l-2 border-stone-200 justify-center text-center no-scrollbar">
      <h1 className="text-stone-100 font-serif text-3xl font-bold text-center py-5">
        News
      </h1>

      <div className="flex flex-1 gap-4 overflow-y-auto no-scrollbar flex-col items-center">
        {list}
      </div>
    </div>
  );
}

export default Right;
