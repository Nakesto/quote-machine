const App = () => {
    const [quote, setQuote] = React.useState([]);
    const [index, setIndex] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    function setRandomNumber(maxLimit) {
        let rand = Math.random() * maxLimit;
        rand = Math.floor(rand);
        setIndex(rand);
        return rand;
    }

    const getdata = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
            const data = await response.json();
            setQuote(data.quotes);
            setRandomNumber(data.quotes.length);
            setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getdata();
    }, [])


    if (isLoading) return <h1>Loading....</h1>

    return (
        <div id="quote-box" className="container mx-auto" style={{ width: "500px" }}>
            <div id="text">
                {quote[index].quote}
            </div>
            <div id="author">
                {quote[index].author}
            </div>
            <button id="new-quote" onClick={() => setRandomNumber(quote.length)}>New Quote</button>
            <a href={`https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=${quote[index].quote}`} id="tweet-quote">Twitter</a>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));