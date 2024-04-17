import { useState, useEffect } from "react";
import axios from "axios";

import { useLoaderData } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";

import RecArticleCard from "./RecArticleCard";

export function loader({ params }) {
  const articleId = params.articleId;
  return articleId;
}

function RecommendationGallery({ params }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  // {
  //   id: -1,
  //   title: "dummy",
  //   text: "dummy text",
  //   bias: 0,
  //   keywords: ["d", "u", "m", "m", "y"],
  //   cluster_tags: [1, 2, 3],
  // }
  // const [similarArticles, setSimilarArticles] = useState([]);
  // const [differentArticles, setDifferentArticles] = useState([]);

  const articleId = useLoaderData();
  //   console.log(articleId);

  useEffect(() => {
    // TODO: Need API route to GET by articleId
    // TODO: 2 API calls (or can maybe condense into 1 if smart about sending it)
    // setArticles(keywordArticles);

    axios
      .get(`http://127.0.0.1:5000/articles/${articleId}`)
      .then((response) => {
        const res = response.data;
        console.log(res);
        setSelectedArticle(res);
      });

    const clusterId = 0;

    axios.get(`http://127.0.0.1:5000/bias/${clusterId}/5`).then((response) => {
      const res = response.data;

      const similarArticles = [];

      // setData(res);
    });
    // const simArts = [
    //   {
    //     id: 1,
    //     title: "economix article 1",
    //     text: "lorem ipsum dolor",
    //     bias: 0,
    //     keywords: ["taxes", "fed", "monetary", "policy", "economy"],
    //     cluster_tags: [1, 2, 7],
    //   },
    //   {
    //     id: 2,
    //     title: "economix article 2",
    //     text: "lorem ipsum dolor yummy bad",
    //     bias: 1,
    //     keywords: ["science", "economy", "stocks", "bubble", "money"],
    //     cluster_tags: [1, 4, 8],
    //   },
    // ];

    // const diffArts = [
    //   {
    //     id: 4,
    //     title: "easdfasdfasdfconomix article 1",
    //     text: "lorem ipsum dolor",
    //     bias: 0,
    //     keywords: ["taxes", "fed", "monetary", "policy", "economy"],
    //     cluster_tags: [1, 2, 7],
    //   },
    //   {
    //     id: 5,
    //     title: "economix asdfasdfarticle 2",
    //     text: "lorem ipsum dolor yummy bad",
    //     bias: 1,
    //     keywords: ["science", "economy", "stocks", "bubble", "money"],
    //     cluster_tags: [1, 4, 8],
    //   },
    // ];

    // const selArt = {
    //   id: 3,
    //   title: "YOUR SELECTED ARTICLE",
    //   text: "lorem ipsum dolor",
    //   bias: 0,
    //   keywords: ["taxes", "fed", "monetary", "policy", "economy"],
    //   cluster_tags: [1, 2, 7],
    // };

    // setSimilarArticles(simArts);
    // setDifferentArticles(diffArts);
    // setSelectedArticle(selArt);

    console.log("here");
    console.log(selectedArticle);
  }, []);

  return (
    <div>
      <h1>RECOMMENDATION PAGE {articleId} </h1>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <h1>Similar Articles</h1>
          {/* {similarArticles.map((article) => (
            <RecArticleCard
              articleId={article.id}
              title={article.title}
              text={article.text}
              bias={article.bias}
              keywords={article.keywords}
            />
          ))} */}
        </GridItem>
        <GridItem w="100%" h="10">
          <h1>Selected Article</h1>
          {selectedArticle && (
            <RecArticleCard
              articleId={selectedArticle.article_id}
              title={selectedArticle.Title}
              text={selectedArticle.Text}
              bias={selectedArticle.Bias}
              keywords={selectedArticle.Keywords}
            />
          )}
        </GridItem>
        <GridItem w="100%" h="10">
          <h1>Different Articles</h1>
          {/* {differentArticles.map((article) => (
            <RecArticleCard
              articleId={article.id}
              title={article.title}
              text={article.text}
              bias={article.bias}
              keywords={article.keywords}
            />
          ))} */}
        </GridItem>
      </Grid>
    </div>
  );
}

export default RecommendationGallery;
