export default function KryptoCard({
    name,
    symbol,
    iconURL,
    displayCurrency,
    currentPrice,
}) {
    return (
        <div className="relative bg-white mt-5 pb-2 shadow rounded-lg overflow-hidden">
            <div className="absolute rounded-md p-2">
                <img className="h-8 w-8 text-white" aria-hidden="true" data-testid="krypto-image-url" src={iconURL} alt={symbol}/>
            </div>

            <dt>
                <p className="ml-16 text-xl font-bold text-black-500">
                    <span data-testid="krypto-name">{name} </span>
                    <span data-testid="krypto-symbol" className="text-sm text-gray-700">{symbol.toUpperCase()}</span>
                </p>
            </dt>

            <dd className="ml-16 pb-2 flex items-baseline pb-1">
                <p className="text-sm font-semibold text-gray-900">
                    <span data-testid="krypto-currency">{displayCurrency}</span>
                    <span data-testid="krypto-price">{currentPrice}</span>
                </p>
            </dd>
        </div>
    );
}