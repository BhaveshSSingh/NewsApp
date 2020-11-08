import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";

import logo from "./images/logo.png";
import { NewsCards, Modal } from "./components";
import useStyles from "./styles";

const alanKey =
  "d32c2f63c988102c2da82143ae06f11d2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    alanBtn({
      key:
        "64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "instructions") {
          setIsOpen(true);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again...");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          } else {
            alanBtn().playText("Please try that again...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src="" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
