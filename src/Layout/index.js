import React, { useRef, useEffect } from "react";

const Layout = ({ title, children, onMore, lastPage, totalResults, page, loading }) => {
  const moreRef = useRef()
  const scrollToBottom = () => {
    moreRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(()=>{
    scrollToBottom()
  }, [page])
  return (
    <>
      <h1 className="text-xl font-bold p-2 uppercase text-sky-400">{title} news</h1>
      <div
       className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2"
      >
        {children}
      </div>
      <div className="my-10 flex justify-center" >
        {totalResults !== page ? <button 
        onClick={onMore}
        id="more"
        className="bg-sky-500 text-white text-secondary-200 text-xs font-bold rounded-full pr-5 pl-5 py-2 uppercase"
        >{loading ? '...': 'More'}</button> : null}
        
      </div>
      <div ref={moreRef} />
    </>
  );
};

export default Layout;
