import axios from "axios";
import { useEffect, useState, useRef } from "react";
import KryptoCard from "./components/KryptoCard/Index";
import { useInterval } from "./hooks/useInterval";

function App() {

    const currencyOptions = [
        { code: 'GBP', symbol: '£', },
        { code: 'USD', symbol: '$', },
        { code: 'EUR', symbol: '€', },
    ];

    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [search, setSearch] = useState('');
    const [currency, setCurrency] = useState(currencyOptions[0].code);

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+currency+"&order=market_cap_desc&per_page=1000&page=1&sparkline=true"
            )
            .then((response) => {
                setCryptocurrencies(response.data);
                console.log('inital load')
            })
            .catch((err) => {
                console.log("api error", err);
            });
    }, [currency]);

    useInterval(
        () => {
            axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + currency + "&order=market_cap_desc&per_page=1000&page=1&sparkline=true"
            )
            .then((response) => {
                setCryptocurrencies(response.data);
                console.log('refresh')
            })
            .catch((err) => {
                console.log("api error", err);
            });
        }, process.env.REACT_APP_API_REFRESH_INTERVAL
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleCurrency = (e) => {
        setCurrency(e.target.value);
    }

    const filteredCrypto = cryptocurrencies.filter(crypto =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <nav className="md:container md:mx-auto flex px-6 py-4">
                <h1 className="flex-none font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Kyrptowatch
                </h1>

                <div className="flex-auto relative text-gray-400 focus-within:text-gray-600">
                    <input
                        id="search"
                        type="search"
                        name="search"
                        placeholder="Search Kyrptos"
                        className="block h-full w-full text-center border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        onChange={handleSearch}
                    />
                </div>

                <div className="flex-none">
                    <select
                        data-testid="currency-select"
                        id="currency"
                        name="currency"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        defaultValue={currency}
                        onChange={handleCurrency}
                    >
                        {currencyOptions.map((option) => {
                            return <option key={option.code} value={option.code}>{option.code}</option>
                        })}
                    </select>
                </div>
            </nav>

            <div className="md:container md:mx-auto px-6 py-2 flex justify-between items-center">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {filteredCrypto.map((crypto) => {
                        return (
                            <KryptoCard
                                key={crypto.name}
                                name={crypto.name}
                                symbol={crypto.symbol}
                                iconURL={crypto.image}
                                displayCurrency={currencyOptions.find(option => option.code === currency).symbol}
                                currentPrice={crypto.current_price}
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default App;
