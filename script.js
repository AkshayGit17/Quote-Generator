const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quoute-btn");
const loader = document.getElementById("loader");

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
//get quote from API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    if (!response.ok) {
      throw new Error("Response error");
    }
    const data = await response.json();
    //If quote length exceeds 120, reduce font size
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    //If no author found, add unkown
    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "unknown";
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }
    hideLoadingSpinner();
  } catch (error) {
    getQuote();
    console.log("Something went wrong!!", error.message);
  }
}

getQuote();

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  open(tweetUrl);
}

//Event Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuote);
