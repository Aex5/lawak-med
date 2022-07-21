import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";
import cookies from "js-cookie";
import Router from "next/router";

export default function Nav() {
  const [nav, setNav] = useState(false);

  function deleteCookie() {
    cookies.remove("token");
    Router.push("/auth/login");
  }

  function handlerNav() {
    setNav(!nav);
  }

  return (
    <div>
      <div className="w-full h-20 text-slate-600">
        <div>
          {/* mobile mneu */}
          <div
            className={
              !nav
                ? "hidden"
                : "fixed w-[200px] h-full flex flex-col items-center justify-center right-0 border-2 bg-white"
            }
          >
            {/* menu */}
            <div>
              <div className="w-[150px] flex flex-col items-center gap-3">
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/posts">
                  <a>Notes</a>
                </Link>
                <button
                  onClick={deleteCookie}
                  className="w-full py-1 rounded-md bg-red-400 text-white"
                >
                  logout
                </button>
              </div>
            </div>
            <div></div>
          </div>
          <div className="absolute right-0 top-5 px-6">
            <button
              onClick={handlerNav}
              className="text-xl border-2 h-8 w-8 rounded-lg flex items-center justify-center"
            >
              {nav ? <RiCloseLine /> : <RiMenu4Fill />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
