import { RiMenu4Fill } from "react-icons/ri";

export default function Nav() {
  return (
    <div>
      <div className="w-full h-16 bg-cyan-800 text-white">
        <div>
          <div className="flex items-center justify-between px-4">
            <h3>App</h3>
            <div>
              <ul>
                <li>
                  <a href="/">Posts</a>
                </li>
                <li>
                  <a href="/">profile</a>
                </li>
              </ul>
            </div>
            <div>
              <RiMenu4Fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
