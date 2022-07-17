import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import { useState } from "react";

export default function Nav() {
  const [nav, setNav] = useState(false);

  function handlerNav() {
    setNav(!nav);
  }

  return (
    <div>
      <div className="w-full text-slate-600">
        <div className="">
          {/* mobile mneu */}
          <div
            className={
              !nav
                ? "hidden"
                : "fixed w-[200px] h-screen flex flex-col items-center justify-start right-0 bg-slate-300 "
            }
          >
            <h3 className="text-4xl py-20">App</h3>
            {/* menu */}
            <div>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/">Posts</a>
                </li>
                <li>
                  <a href="/">profile</a>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="absolute right-0 top-5 px-4">
            <button onClick={handlerNav} className="text-xl">
              {nav ? <RiCloseLine /> : <RiMenu4Fill />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
