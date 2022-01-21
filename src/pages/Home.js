// All articles about Tesla from the last month, sorted by recent first
// https://newsapi.org/v2/everything?q=tesla&from=2021-12-20&sortBy=publishedAt&apiKey=API_KEY

// All articles mentioning Apple from yesterday, sorted by popular publishers first
// https://newsapi.org/v2/everything?q=apple&from=2022-01-19&to=2022-01-19&sortBy=popularity&apiKey=API_KEY

// Top business headlines in the US right now
// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY

// Top headlines from TechCrunch right now
// https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=API_KEY

// All articles published by the Wall Street Journal in the last 6 months, sorted by recent first
// https://newsapi.org/v2/everything?domains=wsj.com&apiKey=API_KEY

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Slider from "../comps/Slider";

import Layout from "../Layout";
import Header from "../comps/Header";
import View from "../comps/View";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(null);
  const [lastPage, setLastPage] = useState(0);
  const [category, setCategory] = useState("apple");
  const [topHeadlines, setTopHeadlines] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const fetchApi = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${category}&domains=wsj.com&page=${page}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      );
      // console.log("news api res:", res?.data?.articles);
      setLoading(false);
      if (res?.data?.status === "ok") {
        setArticles([...articles, ...res?.data?.articles]);
        setTotalResults(res?.data?.totalResults);
        setLastPage(Math.ceil(res?.data?.totalResults / 20));
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("error news api:", error);
      setError(error);
      setLoading(false);
    }
  };
  

  const getTopHeadlines = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&pageCount=3&page=1&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      );
      setTopHeadlines(res?.data?.articles)
    } catch (error) {
      console.log("error top headlines api:", error);
    }
  };

  const more = () => {
    setPage((prevState) => prevState + 1);
    window.scroll(0, document.querySelector("#more").scrollHeight);
  };

  useEffect(() => {
    getTopHeadlines()
    fetchApi();
  }, [page, category]);

  const [isReadMore] = useState(true);


  const history = useHistory();

  const display = () => {
    return (
      <>
        {articles
          ? articles.map((article, id) => {
              return (
                <div
                  key={id}
                  className="bg-white p-1 flex w-full justify-between rounded overflow-hidden shadow-md relative hover:shadow-lg hover:pointer"
                >
                  <div className="w-1/2">
                    <p className="pl-2 font-fira font-semibold text-red-900">
                      {article?.author}
                    </p>

                    <p className="text-xs pl-2 pr-2 font-body text-gray-600">
                      {isReadMore ? article?.content?.slice(0, 100) : null}
                    </p>
                    <div
                      className="flex max-w-fit cursor-pointer px-1.5 ring-1 ring-slate-200 p-1 rounded text-xs ml-2 my-2 font-pop font-semibold text-gray-600"
                      onClick={() =>
                        history.push({
                          pathname: "/details",
                          state: {
                            article: article,
                          },
                        })
                      }
                    >
                      next
                    </div>
                  </div>
                  <img
                    className="w-1/2 h-32 sm:h-42 object-cover"
                    src={article?.urlToImage}
                    alt={article?.title}
                    loading="lazy"
                  />
                </div>
              );
            })
          : <div className="w-full flex justify-center p-20 m-20">No data to be show</div>}
      </>
    );
  };

  return (
    <View>
      <Header />
      <div>
        <Slider topHeadlines={topHeadlines} />
      </div>

      <div className="w-full justify-center flex mt-4 mb-5 text-zinc-700 font-bold font-body">
        .. Top Platform News ..
      </div>
      {loading ? (
        <div className="w-full flex justify-center">..loading news feed</div>
      ) : null}
      {/* <div className="flex justify-end my-4 pr-4">
        <div>
          <span className="font-pop text-sm pr-5">Switch Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">........</option>
            <option value="tesla">tesla</option>
            <option value="apple">apple</option>
          </select>
        </div>
      </div> */}
      <Layout
        title={category}
        onMore={more}
        totalResults={totalResults}
        lastPage={lastPage}
        page={page}
        loading={loading}
      >
        {display()}
      </Layout>
    </View>
  );
};

export default Home;
