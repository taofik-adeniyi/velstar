import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return <div className="flex flex-col justify-between mr-4 mb-4 pl-2 items-center md:flex-row">
  <div className="text-3xl font-bold font-body">Velstar Platform</div>
  <div>
    <nav className="py-4 px-6 text-sm font-medium">
      <ul className="flex space-x-3">
        <li>
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md bg-sky-500 text-white`}
          >
            home
          </Link>
        </li>
        <li>
          <a
          target="_blank"
          href="https://newsapi.org/"
            className={`block px-3 py-2 rounded-md 
   ${isActive ? "bg-sky-500 text-white" : "bg-slate-50"}
  `}
          >
            news api
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>;
};

export default Header;
