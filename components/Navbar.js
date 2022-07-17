import { RiMenu4Fill, RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [nav, setNav] = useState(false);

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
              <div className="flex flex-col gap-3">
                <Link href="/posts">
                  <a>posts</a>
                </Link>
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
