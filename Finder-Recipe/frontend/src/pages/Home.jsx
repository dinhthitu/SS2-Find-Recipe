import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBackGround from "../assets/HomeBackGround.png"; 
import familyImg from "../assets/about_img/family1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  const query = "cooking OR recipe OR food OR culinary";
  const cacheKey = "homeNewsCache";

  const [articles, setArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState("");

  const handleTryNowClick = () => {
    navigate("/login");
  };

  // Fetch News API khi component mount
  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      setNewsError("");
      // Kiểm tra cache trước
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length) {
            setArticles(parsed);
            setLoadingNews(false);
            return;
          }
        } catch (e) {
          // nếu cache lỗi thì bỏ qua
          console.error("Error parsing cached news:", e);
        }
      }

      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            query
          )}&language=en&pageSize=6&apiKey=${apiKey}`
        );
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();

        const filtered = data.articles.filter((a) => {
          const txt = `${a.title || ""} ${a.description || ""}`.toLowerCase();
          return /(cook|recipe|food|culinar)/.test(txt);
        });

        if (!filtered.length) {
          setNewsError("No news found");
          setArticles([]);
          localStorage.removeItem(cacheKey);
        } else {
          setArticles(filtered);
          localStorage.setItem(cacheKey, JSON.stringify(filtered));
        }
      } catch (err) {
        console.error(err);
        setNewsError("Can not load news");
        setArticles([]);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EE] text-black">
      {/* Hero Section */}
      <div
        className="w-full h-[700px] bg-cover bg-center flex items-center justify-start text-[#8c0e2c] px-16 relative"
        style={{
          backgroundImage: `url(${SearchBackGround})`,
        }}
      >
        <div className="flex flex-col items-start max-w-lg">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-4 text-left leading-snug">
            Become True<br />Chef With Our Recipes
          </h1>

          <p className="text-sm md:text-base text-left font-sans leading-relaxed text-[#1c0e0e] mb-6">
            No idea what to cook? Type in what’s in your kitchen, and we’ll do the rest – recipes, tips, and more
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleTryNowClick}
              className="px-9 py-4 bg-[#a81a10] text-white rounded-full font-semibold text-sm hover:bg-[#c46570] transition"
            >
              Get Started
            </button>

            {/* Link “Search Now” đổi border/text thành #9b0a00, hover bg #ad6560 */}
            <Link
              to="/SearchRecipes"
              className="px-9 py-4 border border-[#961108] text-[#9b0a00] rounded-full font-semibold text-sm hover:bg-[#ad6560] hover:text-white transition"
            >
              Search Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full bg-[#B4324F] py-30 ">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-12">
            What You’ll Discover
            <br />
            When You Search for a Recipe
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#B4324F] mb-3">
                Full Ingredient List
              </h3>
              <p className="text-black text-sm">
                View every ingredient, with one-click access to details like calories, nutrition, and its cost.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#B4324F] mb-3">
                Step-by-Step Instructions
              </h3>
              <p className="text-black text-sm">
                Clear and easy-to-follow cooking steps to guide you from prep to plate.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#B4324F] mb-3">
                Nutritional Breakdown
              </h3>
              <p className="text-black text-sm">
                Automatically generated details for each recipe – calories, protein, carbs, and more.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#B4324F] mb-3">
                Similar Recipes You’ll Love
              </h3>
              <p className="text-black text-sm">
                Smart suggestions based on ingredients or dish types – discover your next favorite meal!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="w-full bg-[#F7F2EE] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-[#531A27]">
              Explore Culinary News And Stories
            </h2>
          </div>
          <div className="text-right mb-8">
            <Link
              to="/news"
              className="mt-2 inline-block text-[#B4324F] font-medium hover:underline"
            >
              Explore More →
            </Link>
          </div>
          {loadingNews && (
            <p className="text-center text-black">Loading News...</p>
          )}
          {newsError && !loadingNews && (
            <p className="text-center text-[#B4324F]">{newsError}</p>
          )}

          {!loadingNews && !newsError && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {articles.slice(0, 4).map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col hover:shadow-lg transition"
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-black text-xs">
                      {new Date(article.publishedAt).toLocaleDateString()} •{" "}
                      {Math.ceil((article.content?.length || 100) / 200)} min read
                    </p>
                    <h3 className="mt-2 font-semibold text-[#A6354E] text-lg flex-1">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-black text-sm line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* About Us Section */}
      <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl bg-[#F6E6E7] rounded-3xl py-8 px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl font-extrabold text-[#531A27] mb-4">
              About Us – Why We Built This
            </h2>
            <h3 className="text-xl font-semibold text-[#C54F6A] mb-4">
              ✨ Our Mission:
            </h3>
            <p className="text-black text-sm font-semibold mb-2">
              To help you cook smarter and save time – using only what you already have.
            </p>
            <p className="text-black text-sm mb-4">
              Whether you’re a busy student, a beginner in the kitchen, or someone tired of food waste, our platform makes it easy to find recipes based on ingredients you already own.
            </p>
            <p className="text-black text-sm font-semibold italic mb-6">
              “We started this project because we were tired of having random ingredients and no idea what to cook. So we built a tool we wish we had.”
            </p>
            <Link
              to="/AboutUs"
              className="inline-block bg-black text-white font-semibold px-6 py-2 rounded-full shadow-lg"
            >
              Our Story
            </Link>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md">
            <img
              src={familyImg}             
              alt="Team Working"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h2 className="text-4xl font-extrabold text-white leading-tight">
                LET’S
              </h2>
              <h2 className="text-4xl font-extrabold text-[#F7F2EE] leading-tight">
                CONNECT!
              </h2>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Home;
