// import { useEffect, useState } from "react";
// import Newsitem from "./Newsitem";



// import React from "react";

// const NewsBoard = ({ category }) => {
//   const [articles, setArticles] = useState([]);
//   useEffect(() => {
//     let url = ` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
//       import.meta.env.VITE_API_KEY
//     }`;
//     fetch(url).then(response=>
//       response.json()).then(data=> setArticles(data.articles))
 
//   }, [category]);


import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h2 className="text-center"  >
       <div style={{fontSize:"40px", padding:"1rem"}}>Latest <span className="badge bg-danger" >News</span></div> 
        {articles.map((news, index) => {
          return (
            <Newsitem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })}
      </h2>
    </div>
  );
};

export default NewsBoard;
