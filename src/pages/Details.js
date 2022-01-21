import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../comps/Header";
import View from "../comps/View";

const Details = () => {
    let getDay = (date) => {
        return new Date(date).toDateString()
    }
    const { id } = useParams()
    const {state: {article}} = useLocation()

  return (
    <View>
      <Header />
      <div className="px-5 pb-7">
      <h3 className="flex-auto text-lg font-medium text-slate-700">{article?.author}</h3>
      <h1 className="text-xs text-slate-500">article posted : {getDay(article?.publishedAt)} </h1>
      <img src={article?.urlToImage} alt={article?.title} className="h-96 w-full object-cover shadow-lg" loading="lazy" />
      <div className="mt-5">
          <h3 className="w-full flex-none mb-1 text-xl leading-none text-slate-700 underline">{article?.title}</h3>
        <p className="text-xs text-slate-500">
            {article?.description}
            </p>
        <p className="my-3 text-sm leading-6 font-body text-slate-900">{article?.content}</p>
        <div className="font-semibold text-sm">
        <p>Source url: <a className="text-sky-900" target="_blank" href={article?.url} alt={article?.title}>{article?.title}</a></p>
        <p className="text-xs ">Source: <span className="underline">{article?.source?.name}</span></p>
        </div>
      </div>
      </div>
    </View>
  );
};

export default Details;
