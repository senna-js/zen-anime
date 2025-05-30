import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SplashScreen.css";
import logoTitle from "@/src/config/logoTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import getTopSearch from "@/src/utils/getTopSearch.utils";

// Static data moved outside the component
const NAV_LINKS = [
  { to: "/home", label: "Home" },
  { to: "/movie", label: "Movies" },
  { to: "/tv", label: "TV Series" },
  { to: "/most-popular", label: "Most Popular" },
  { to: "/top-airing", label: "Top Airing" },
];

const useTopSearch = () => {
  const [topSearch, setTopSearch] = useState([]);
  useEffect(() => {
    const fetchTopSearch = async () => {
      const data = await getTopSearch();
      if (data) setTopSearch(data);
    };
    fetchTopSearch();
  }, []);
  return topSearch;
};

function SplashScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const topSearch = useTopSearch();

  const handleSearchSubmit = useCallback(() => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;
    const queryParam = encodeURIComponent(trimmedSearch);
    navigate(`/search?keyword=${queryParam}`);
  }, [search, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  return (
    <div className="w-full">
      <div className="w-[1300px] mx-auto pt-12 relative overflow-hidden max-[1350px]:w-full max-[1350px]:px-8 max-[1200px]:pt-8 max-[1200px]:min-h-fit max-[780px]:px-4 max-[520px]:px-0 max-[520px]:pt-6">
        <nav className="relative w-full">
          <div className="w-fit flex gap-x-12 mx-auto font-semibold max-[780px]:hidden">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-[#ffbade]">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="max-[780px]:block hidden max-[520px]:px-4 max-[520px]:text-sm">
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 focus:outline-none flex items-center gap-x-2 transition-colors duration-200 group"
            >
              <svg
                className="w-6 h-6 text-white transition-colors duration-200 max-[520px]:w-5 max-[520px]:h-5 group-hover:text-[#ffbade] group-focus:text-[#ffbade] group-active:text-[#ffbade]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-white font-semibold transition-colors duration-200 group-hover:text-[#ffbade] group-focus:text-[#ffbade] group-active:text-[#ffbade]">
                Menu
              </span>
            </button>
          </div>

          {isModalOpen && (
            <div className="max-[780px]:block w-full hidden absolute z-50 top-10">
              <div className="bg-[#101010fa] w-full p-6 rounded-2xl flex flex-col gap-y-6 items-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="self-end text-black text-xl absolute top-0 right-0 bg-white px-3 py-1 rounded-tr-xl rounded-bl-xl font-bold"
                >
                  &times;
                </button>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsModalOpen(false)}
                    className="hover:text-[#ffbade] text-white text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
        <div className="splashscreen min-h-[480px] min-[1200px]:min-h-[520px] bg-[#2B2A3C] rounded-[40px] flex relative mt-7 max-[780px]:w-full items-stretch max-[780px]:rounded-[30px] max-[520px]:rounded-none max-[520px]:min-h-fit max-[520px]:pb-4 max-[520px]:mt-4">
          <div className="h-auto flex flex-col w-[700px] relative z-40 px-20 py-20 left-0 max-[1200px]:py-12 max-[780px]:px-12 max-[520px]:py-4 max-[520px]:px-8">
            <Link
              to="/home"
              className="text-[45px] font-extrabold tracking-wide max-[520px]:text-[38px] max-[520px]:text-center"
            >
            <img
              src="https://wsrv.nl/?url=https://cdn.statically.io/gh/senna-js/zen-anime/main/public/logo.png"
              alt="Nonton!me" class="w-[205px] h-[50px]"
            />
            </Link>
            <div className="w-full flex gap-x-3 mt-6">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full py-3 px-6 rounded-xl bg-white text-[18px] text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="bg-[#FFBADE] text-white py-3 px-4 rounded-xl font-extrabold"
                onClick={handleSearchSubmit}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-lg text-black hover:text-[#ffbade] max-[600px]:mt-[7px]"
                />
              </button>
            </div>
            <div className="mt-8 text-[15px] leading-[1.6] max-[520px]:text-[13px] max-[520px]:leading-[1.4]">
              <span className="splashitem font-[600]">Top search: </span>
              {topSearch.map((item, index) => (
                <span key={index} className="splashitem font-[400]">
                  <Link to={item.link}>{item.title}</Link>
                  {index < topSearch.length - 1 && <span>, </span>}
                </span>
              ))}
            </div>
            <div className="mt-8 flex max-[780px]:left-10">
              <Link to="/home" className="max-[520px]:w-full">
                <div className="bg-[#FFBADE] text-black py-4 px-10 rounded-xl font-bold text-[20px] max-[520px]:text-center max-[520px]:font-medium max-[520px]:text-[17px]">
                  Watch anime
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="ml-6 text-black"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="h-full w-[600px] absolute right-0 max-[780px]:hidden">
            <div className="splashoverlay"></div>
            <img
              src="https://wsrv.nl/?url=https://cdn.statically.io/gh/senna-js/zenime-id/main/public/splash.webp"
              alt="Splash"
              className="bg-cover rounded-r-[40px] w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
        <div className="mw-body">
          <div className="container">
            <div className="mwb-2col">
              <div className="mwb-center">
                <h1 className="mw-heading">
                  NontoNime.id - The best site to watch anime online for Free
                </h1>
                <p>
                  Do you know that according to Google, the monthly search volume for
                  anime related topics is up to over 1 Billion times? Anime is famous
                  worldwide and it is no wonder we've seen a sharp rise in the number of
                  free anime streaming sites.
                </p>
                <p>
                  Just like free online movie streaming sites, anime watching sites are
                  not created equally, some are better than the rest, so we've decided
                  to build NontoNime.id to be one of the best free anime streaming site
                  for all anime fans on the world.
                </p>
                <h2 style={{ fontSize: "1.5rem", margin: "1rem" }}>
                  1/ What is NontoNime.id?
                </h2>
                <p>
                  NontoNime.id is a free site to watch anime and you can even download
                  subbed or dubbed anime in ultra HD quality without any registration or
                  payment. By having only one ads in all kinds, we are trying to make it
                  the safest site for free anime.
                </p>
                <h2 style={{ fontSize: "1.5rem", margin: "1rem" }}>
                  2/ Is NontoNime.id safe?
                </h2>
                <p>
                  Yes we are, we do have only one Ads to cover the server cost and we
                  keep scanning the ads 24/7 to make sure all are clean, If you find any
                  ads that is suspicious, please forward us the info and we will remove
                  it.
                </p>
                <h2 style={{ fontSize: "1.5rem", margin: "1rem" }}>
                  3/ So what make NontoNime.id the best site to watch anime free online?
                </h2>
                <p>
                  Before building NontoNime.id, we've checked many other free anime
                  sites, and learnt from them. We only keep the good things and remove
                  all the bad things from all the competitors, to put it in our HiAnime
                  website. Let's see how we're so confident about being the best site
                  for anime streaming:
                </p>
                <ul style={{ margin: "1rem", boxSizing: "border-box" }}>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Safety:</strong> We try our best to not having harmful ads
                    on HiAnime.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Content library:</strong> Our main focus is anime. You can
                    find here popular, classic, as well as current titles from all
                    genres such as action, drama, kids, fantasy, horror, mystery,
                    police, romance, school, comedy, music, game and many more. All
                    these titles come with English subtitles or are dubbed in many
                    languages.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Quality/Resolution:</strong> All titles are in excellent
                    resolution, the best quality possible. NontoNime.id also has a
                    quality setting function to make sure our users can enjoy streaming
                    no matter how fast your Internet speed is. You can stream the anime
                    at 360p if your Internet is being ridiculous, Or if it is good, you
                    can go with 720p or even 1080p anime.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Streaming experience:</strong> Compared to other anime
                    streaming sites, the loading speed at NontoNime.id is faster.
                    Downloading is just as easy as streaming, you won't have any problem
                    saving the videos to watch offline later.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Updates:</strong> We updates new titles as well as fulfill
                    the requests on a daily basis so be warned, you will never run out
                    of what to watch on HiAnime.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>User interface:</strong> Our UI and UX makes it easy for
                    anyone, no matter how old you are, how long have you been on the
                    Internet. Literally, you can figure out how to navigate our site
                    after a quick look. If you want to watch a specific title, search
                    for it via the search box. If you want to look for suggestions, you
                    can use the site's categories or simply scroll down for new
                    releases.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Device compatibility:</strong> HiAnime works alright on both
                    your mobile and desktop. However, we'd recommend you use your
                    desktop for a smoother streaming experience.
                  </li>
                  <li style={{ margin: "0.5rem" }}>
                    <strong>Customer care:</strong> We are in active mode 24/7. You can
                    always contact us for any help, query, or business-related inquiry.
                    On our previous projects, we were known for our great customer
                    service as we were quick to fix broken links or upload requested
                    content.
                  </li>
                </ul>
                <p>
                  So if you're looking for a trustworthy and safe site for your Anime
                  streaming, let's give NontoNime.id a try. And if you like us, please
                  help us to spread the words and do not forget to bookmark our site.
                </p>
                <p>Thank you!</p>
                <p>&nbsp;</p>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      <div className="mt-10 text-[14px] text-center pb-4">
        © {logoTitle} All rights reserved.
      </div>
    </div>
  );
}

export default SplashScreen;
