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
      <div class="mw-body">
        <div class="container">
          <div class="share-buttons share-buttons-detail">
            <div class="share-buttons-block">
              <div class="share-icon"></div>
              <div class="sbb-title mr-3">
                <span>Share Nontonime</span>
                <p class="mb-0">to your friends</p>
              </div>
              <div class="sbb-social">
                <div class="sharethis-inline-share-buttons st-center st-has-labels  st-inline-share-buttons st-animated" id="st-1">
                  <div class="st-total ">
                    <span class="st-label">17.6k</span>
                    <span class="st-shares"> Shares </span>
                  </div>
                  <div class="st-btn st-first                                                                                                                                                                       st-remove-label" data-network="telegram" style="display: none;">
                    <img alt="telegram sharing button" src="https://platform-cdn.sharethis.com/img/telegram.svg"/>
                    <span class="st-label">Share</span>
                  </div>
                  <div class="st-btn                                                                                                                                                                        st-remove-label" data-network="twitter" style="display: none;">
                    <img alt="twitter sharing button" src="https://platform-cdn.sharethis.com/img/twitter.svg"/>
                    <span class="st-label">Tweet</span>
                  </div>
                  <div class="st-btn                                                                                                                                                                         st-remove-label" data-network="facebook" style="display: none;">
                    <img alt="facebook sharing button" src="https://platform-cdn.sharethis.com/img/facebook.svg"/>
                    <span class="st-label">Share</span>
                  </div>
                  <div class="st-btn                                                                                                                                                                          st-remove-label" data-network="reddit" style="display: none;">
                    <img alt="reddit sharing button" src="https://platform-cdn.sharethis.com/img/reddit.svg"/>
                    <span class="st-label">Share</span>
                  </div>
                  <div class="st-btn st-last                                                                                                                                                                           st-remove-label" data-network="sharethis" style="display: inline-block;">
                    <img alt="sharethis sharing button" src="https://platform-cdn.sharethis.com/img/sharethis.svg"/>
                    <span class="st-label">Share</span>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="mwb-2col">
            <div class="mwb-left">
              <h1 class="mw-heading">Nontonime.id - The best site to watch anime online for Free</h1>
              <p>Do you know that according to Google, the monthly search volume for anime related topics is up to over 1 Billion times? Anime is famous worldwide and it is no wonder we've seen a sharp rise in the number of free anime streaming sites.</p>
              <p>Just like free online movie streaming sites, anime watching sites are not created equally, some are better than the rest, so we've decided to build Nontonime.id to be one of the best free anime streaming site for all anime fans on the world.</p>
              <h2>1/ What is Nontonime.id?</h2>
              <p>Nontonime.id is a free site to watch anime and you can even download subbed or dubbed anime in ultra HD quality without any registration or payment. By having only one ads in all kinds, we are trying to make it the safest site for free anime.</p>
              <h2>2/ Is Nontonime.id safe?</h2>
              <p>Yes we are, we do have only one Ads to cover the server cost and we keep scanning the ads 24/7 to make sure all are clean, If you find any ads that is suspicious, please forward us the info and we will remove it.</p>
              <h2>3/ So what make Nontonime.id the best site to watch anime free online?</h2>
              <p>Before building Nontonime.id, we've checked many other free anime sites, and learnt from them. We only keep the good things and remove all the bad things from all the competitors, to put it in our Nontonime website. Let's see how we're so confident about being the best site for anime streaming:</p>
              <ul>
                <li>
                  <strong>Safety:</strong> We try our best to not having harmful ads on Nontonime.
                </li>
                <li>
                  <strong>Content library:</strong> Our main focus is anime. You can find here popular, classic, as well as current titles from all genres such as action, drama, kids, fantasy, horror, mystery, police, romance, school, comedy, music, game and many more. All these titles come with English subtitles or are dubbed in many languages.
                </li>
                <li>
                  <strong>Quality/Resolution:</strong> All titles are in excellent resolution, the best quality possible. Nontonime.id also has a quality setting function to make sure our users can enjoy streaming no matter how fast your Internet speed is. You can stream the anime at 360p if your Internet is being ridiculous, Or if it is good, you can go with 720p or even 1080p anime.
                </li>
                <li>
                  <strong>Streaming experience:</strong> Compared to other anime streaming sites, the loading speed at Nontonime.id is faster. Downloading is just as easy as streaming, you won't have any problem saving the videos to watch offline later.
                </li>
                <li>
                  <strong>Updates:</strong> We updates new titles as well as fulfill the requests on a daily basis so be warned, you will never run out of what to watch on Nontonime.
                </li>
                <li>
                  <strong>User interface:</strong> Our UI and UX makes it easy for anyone, no matter how old you are, how long have you been on the Internet. Literally, you can figure out how to navigate our site after a quick look. If you want to watch a specific title, search for it via the search box. If you want to look for suggestions, you can use the site's categories or simply scroll down for new releases.
                </li>
                <li>
                  <strong>Device compatibility:</strong> Nontonime works alright on both your mobile and desktop. However, we'd recommend you use your desktop for a smoother streaming experience.
                </li>
                <li>
                  <strong>Customer care:</strong> We are in active mode 24/7. You can always contact us for any help, query, or business-related inquiry. On our previous projects, we were known for our great customer service as we were quick to fix broken links or upload requested content.
                </li>
              </ul>
              <p>So if you're looking for a trustworthy and safe site for your Anime streaming, let's give Nontonime.id a try. And if you like us, please help us to spread the words and do not forget to bookmark our site.</p>
              <p>Thank you!</p>
              <p>&nbsp;</p>
            </div>
            <div class="mwb-right">
              <div class="zr-connect zr-connect-list">
                <h2 class="heading-news">Trending Posts</h2>
                <div class="connecting-list">
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-yellow mr-2">#Question</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>17 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>396
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="What is the worst anime u have ever watched or dropped in the first ep">What is the worst anime u have ever watched or dropped in the first ep</a>
                    </h4>
                    <div class="subject">
                      <div>ya the title says it all</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/demon_splayer/File15.jpg" alt="zqwxxh"/>
                      </div>
                      <a href="#" target="_blank" class="user-name">zqwxxh</a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-blue mr-2">#General</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>13 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>120
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="WHERE MY HOMIES AT??">WHERE MY HOMIES AT??</a>
                    </h4>
                    <div class="subject">
                      <div>All my homies, best friends and friends, I am in need of your help 🙏🏻 A guy named "you creep" came on a post regarding physical mangas where I had commented "I don't own any mangas" and replied with "that's coz ure a brokie". This guy is now trash talking me, using foul language and slurs. We don't need kids like these in the community, do we?? Communities are Toxic, Kyolord, TUSHAR, Radzz, Thesilentcoldyy, RORCEPTUS, Gustav, Sir Crocodile, Sanji, and many more of my homies, let's gang up on "you creep". I'll provide you with the post link guys ✌🏻 This "you creep" thinks my ahh is on Nontonime the whole day. Gotta deadahh show him who're the bosses around here 💪🏻🔫 Or you can make your own posts showing him not to mess with the anilords around here, coz that's the one thing you're not expected to do... THANK YOU EVERYBODY 💪🏻🔫</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/spy_family/01.png" alt="XX_JJMaGnAnIMuZz_XX"/>
                      </div>
                      <a href="#" target="_blank" class="user-name is-level-x is-level-a">
                        <i class="badg-level level-a up-4"></i> XX_JJMaGnAnIMuZz_XX <span>Dolphin</span>
                      </a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-blue mr-2">#General</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>11 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>73
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="Yoo Mods :)">Yoo Mods :)</a>
                    </h4>
                    <div class="subject">
                      <div>Just wanna say hi 👋 (Lowkey curious if they gonna reply 👀🌚)</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/dragon_ball_chibi/beerus.png" alt="☣Kaiser㊗🥷🏻"/>
                      </div>
                      <a href="#" target="_blank" class="user-name">☣Kaiser㊗🥷🏻</a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-blue mr-2">#General</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>15 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>91
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="Showdown of the Main Characters - Round 2 Results 🏆">Showdown of the Main Characters - Round 2 Results 🏆</a>
                    </h4>
                    <div class="subject">
                      <div>📝POINTS TO BE NOTED:- 🌟 This is only the results of round 2 and round 3🌚 will be live at or after 8:00 Pm IST 🌟 Highest voted character from each bracket will be promoted to next round and remaining will be eliminated 🌟 For further confirmation of counting you can re visit Round 2 (Nontonimez.to/community/post/showdown-of-the-main-characters-round-2-261876) Here are the results:- 1. 🏅 Subaru Natsuki (26) [Re:Zero] vs Tanjiro Kamado (23) [Demon Slayer] 2. 🏅 Arthur (25) [The Beginning After the End] vs Asta (23)[Black Clover] 3. 🏅Ayanokoji Kiyotaka (25) [Classroom of the Elite] vs Gintoki (23) [Gintama] 4. 🏅Guts (28) [Berserk] vs Edward Elric (21) [Fullmetal Alchemist: Brotherhood] 5. 🏅Eren Yeager (41) [Attack on Titan] vs Kenzo Tenma (10) [Monster] 6. 🏅Thorfinn (42) [Vinland Saga] vs Ginko (6) [Mushi-shi] 7.🏅Violet Evergarden (32) [Violet Evergarden] Vs Oreki Houtarou (15) [Hyouka] 8. 🏅Ichigo (30) [Bleach] Vs Senku (20) [Dr. Stone] [Post no: 88th] [Date: 27/4/25]</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/dragon_ball_chibi/goku.png" alt="Sir Crocodile💫"/>
                      </div>
                      <a href="#" target="_blank" class="user-name is-level-x is-level-a">
                        <i class="badg-level level-a up-4"></i> Sir Crocodile💫 <span>Dolphin</span>
                      </a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-blue mr-2">#General</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>14 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>92
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="TOP 5 Ecchi">TOP 5 Ecchi</a>
                    </h4>
                    <div class="subject">
                      <div>Tell me ur top 5 ECCHI anime (If u want, TOP 10).</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/zoro_normal/av-zz-01.jpeg" alt="Max"/>
                      </div>
                      <a href="#" target="_blank" class="user-name is-level-x is-level-a">
                        <i class="badg-level level-a up-4"></i> Max <span>Dolphin</span>
                      </a>
                    </div>
                  </div>
                  <div class="item">
                    <div class="gi-top d-flex justify-content-between align-items-center">
                      <div class="ztag">
                        <span class="zt-purple mr-2">#Discussion</span>
                        <div class="time d-inline">
                          <span>
                            <i class="dot mr-2"></i>21 hours ago </span>
                        </div>
                      </div>
                      <div class="gi-stats d-flex align-items-center">
                        <div class="ml-4">
                          <i class="fas fa-comment mr-1"></i>162
                        </div>
                      </div>
                    </div>
                    <h4 class="item-name">
                      <a href="#" title="For those who think aot is mid.">For those who think aot is mid.</a>
                    </h4>
                    <div class="subject">
                      <div>With 606k ratings and having a rating of 9.1 in imdb is something that not any other anime can achieve that. Aot won 40 awards and have 90 nominations. Jjk which won 9 awards at 2023 crunchyroll awards still have only 31 awards. Aot is first ever anime to won a astra award and have highest number of awards in the history of anime series. 363k people who rated aot 10 star are not blind and illiterate acclaim a show in that high regards. And you people may not know but imdb rating are based on weighted ratings means it not just make a average of all people ratings and rate a show but it takes ratings from their highly trusted reviewers and then rate it. And it is #21 top rated of all time in imdb not just anime but of all time. Aot has at the present time 8, 9.8 rated eps and 5 , 9.7 rated even after too much bomabarding. Aot is the most selling manga PROPORTION wise : 34 volumes with 140 millions copies sold ( i ain't baiting one piece fans. it is also my 2nd fav anime but it also has 1146 chapters , which it indeed needed for such a big story). "Hero" ep is highest rated anime ep in terms of no of people voting which crosses 145k till this date. Many anime eps which a 9.8 ratings but not able to cross 10k or 20k and max to max 30k . Isayama's home town : ōyama is full themed by the aot merchandise and given many tribute to isayama for completing such a story.</div>
                    </div>
                    <div class="cn-owner">
                      <div class="profile-avatar">
                        <img src="https://cdn.noitatnemucod.net/avatar/100x100/mha/avatar-18.png" alt="emmerseave"/>
                      </div>
                      <a href="#" target="_blank" class="user-name is-level-x is-level-a">
                        <i class="badg-level level-a"></i> emmerseave <span>Angelfish</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="d-block">
                  <a href="#" class="btn btn-sm py-2 btn-block btn-radius btn-blank text-white" style="background-color: rgba(255,255,255,.1);">Read more</a>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>
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
