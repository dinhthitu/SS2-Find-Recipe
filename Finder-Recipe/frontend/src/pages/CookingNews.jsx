import React, { useState, useEffect } from 'react';

const CookingNews = () => {
  const tags = [
    'Recipe', 'Baking', 'Vegan', 'Dessert',
    'Quick Meals', 'Healthy', 'Grilling', 'Comfort Food',
    'Keto', 'Gluten-Free', 'Soup', 'Salad',
    'Seafood', 'Vegetarian', 'BBQ', 'Breakfast'
  ];

  const [selectedTag, setSelectedTag] = useState('Recipe');
  const [articles, setArticles]       = useState([]);
  const [query, setQuery]             = useState('Recipe');
  const [page, setPage]               = useState(1);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [showAll, setShowAll]         = useState(false);

  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  const cacheKey = `news_${query}_${page}`;

  const fetchNews = async () => {
    setLoading(true);
    setError('');

    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setArticles(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&page=${page}&apiKey=${apiKey}`
      );
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();

      const filtered = data.articles.filter(a => {
        const txt = `${a.title} ${a.description}`.toLowerCase();
        return /(cook|recipe|food|culinar)/.test(txt);
      });

      if (!filtered.length) {
        setError('Không tìm thấy bài viết nào cho chủ đề này.');
        setArticles([]);
      } else {
        setArticles(filtered);
        localStorage.setItem(cacheKey, JSON.stringify(filtered));
      }
    } catch (err) {
      console.error(err);
      setError('Không thể tải tin tức. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query, page]);

  const onTagClick = tag => {
    setSelectedTag(tag);
    setQuery(tag);
    setPage(1);
    setShowAll(false);
  };

  const loadMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);

  const featured = articles[0];
  const smallPosts = articles.slice(1, 5);
  const latestPosts = showAll ? articles.slice(5) : articles.slice(5, 10);

  return (
    <div className="min-h-screen w-full bg-[#F7F2EE] px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto py-8">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-center text-gray-500 mb-4">Loading news...</p>}

        {/* Featured + Small posts */}
        <h2 className="text-2xl font-bold text-[#800020] mb-4">Featured posts</h2>
        <div className="mb-16 flex flex-col lg:flex-row gap-8">
          {featured && (
            <div className="lg:w-3/5 bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={featured.urlToImage || 'https://via.placeholder.com/600x400'}
                alt={featured.title}
                className="w-full h-72 lg:h-[28rem] object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(featured.publishedAt).toLocaleDateString('vi-VN')} • {featured.author || 'Unknown'}
                </p>
                <h2 className="text-3xl font-bold text-[#800020] mb-4">{featured.title}</h2>
                <p className="text-gray-600 line-clamp-3 mb-4">{featured.description}</p>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800020] font-semibold hover:underline"
                >
                  Read more →
                </a>
              </div>
            </div>
          )}

          <div className="lg:w-2/5 space-y-6">
            {smallPosts.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={a.urlToImage || 'https://via.placeholder.com/150'}
                    alt={a.title}
                    className="w-1/3 h-36 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{a.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(a.publishedAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Latest posts + Sidebar */}
        <section className="flex flex-col lg:flex-row gap-8">
          {/* Latest posts */}
          <div className="lg:w-2/3 space-y-8">
            <h2 className="text-2xl font-bold text-[#800020] mb-4">Latest posts</h2>
            {latestPosts.map((a, i) => (
              <div key={i} className="flex flex-col sm:flex-row bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={a.urlToImage || 'https://via.placeholder.com/200'}
                  alt={a.title}
                  className="w-full sm:w-1/3 h-48 object-cover"
                />
                <div className="p-6 flex-1">
                  <p className="text-gray-500 text-sm mb-2">
                    {new Date(a.publishedAt).toLocaleDateString('vi-VN')} • {a.author || 'Unknown'}
                  </p>
                  <h3 className="text-lg font-semibold text-[#800020] mb-2 line-clamp-2">{a.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{a.description}</p>
                  <a href={a.url} className="text-[#800020] font-semibold hover:underline text-sm">
                    Read more →
                  </a>
                </div>
              </div>
            ))}
            <div className="text-center flex justify-center gap-4">
              {!showAll ? (
                <button
                  onClick={loadMore}
                  className="bg-[#800020] text-white px-6 py-3 rounded-full hover:bg-[#a00030] transition"
                >
                  Show more
                </button>
              ) : (
                <button
                  onClick={showLess}
                  className="bg-[#800020] text-white px-6 py-3 rounded-full hover:bg-[#a00030] transition"
                >
                  Show less
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Discover more tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${selectedTag === tag
                        ? 'bg-[#800020] text-white hover:bg-[#800020]'
                        : 'bg-gray-200 text-gray-700 hover:bg-[#800020] hover:text-white'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default CookingNews;
