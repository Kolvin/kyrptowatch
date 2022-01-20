import { render, screen } from '@testing-library/react';
import KryptoCard from "./Index";

test('renders krypto name', async () => {
    render(
        <KryptoCard
            name="Bitcoin"
            symbol="btc"
            iconURL="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            displayCurrency="£"
            currentPrice="31591"
        />
    );

    expect(await screen.findByTestId("krypto-name")).toBeInTheDocument();
});

test('renders krypto symbol', async () => {
    render(
        <KryptoCard
            name="Bitcoin"
            symbol="btc"
            iconURL="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            displayCurrency="£"
            currentPrice="31591"
        />
    );

    expect(await screen.findByTestId("krypto-symbol")).toBeInTheDocument();
});

test('renders krypto price', async () => {
    render(
        <KryptoCard
            name="Bitcoin"
            symbol="btc"
            iconURL="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            displayCurrency="£"
            currentPrice="31591"
        />
    );

    expect(await screen.findByTestId("krypto-price")).toBeInTheDocument();
});

test('renders krypto currency', async () => {
    render(
        <KryptoCard
            name="Bitcoin"
            symbol="btc"
            iconURL="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            displayCurrency="£"
            currentPrice="31591"
        />
    );

    expect(await screen.findByTestId("krypto-currency")).toBeInTheDocument();
});