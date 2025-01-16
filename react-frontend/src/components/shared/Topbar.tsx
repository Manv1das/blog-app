import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <section className="top-0 z-50 bg-black w-full py-4">
      <div className="flex justify-between items-center px-5 w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
          <rect x="1" y="1" width="98" height="98" fill="black" stroke="white" stroke-width="2" />
          <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="50" font-family="Arial" dy=".3em" font-weight="bold">
            F
          </text>
        </svg>
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
