import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import Map from '../components/Map';
import Info from '../components/Info';

interface Currency {
  code: string;
  rate: number;
}

const convertCurrency = (amount: number, fromRate: number, toRate: number) => {
  return (amount / fromRate) * toRate;
};

const Home = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [previousCurrencies, setPreviousCurrencies] = useState<Currency[]>([]);
  const [adjustedCurrencies, setAdjustedCurrencies] = useState<Currency[]>([]);
  const [adjustedPreviousCurrencies, setAdjustedPreviousCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const [latestResponse, previousResponse] = await Promise.all([
          axios.get('http://localhost:4000/currency/latest'),
          axios.get('http://localhost:4000/currency/previous')
        ]);

        const { rates: latestRates } = latestResponse.data;
        const formattedLatestRates: Currency[] = Object.entries(latestRates).map(([code, rate]) => ({ code, rate: rate as number }));
        setCurrencies(formattedLatestRates);

        const { rates: previousRates } = previousResponse.data;
        const formattedPreviousRates: Currency[] = Object.entries(previousRates).map(([code, rate]) => ({ code, rate: rate as number }));
        setPreviousCurrencies(formattedPreviousRates);

      } catch (error) {
        console.error('Failed to fetch currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const selectedCurrencyRate = currencies.find(currency => currency.code === selectedCurrency)?.rate || 1;
    const previousSelectedCurrencyRate = previousCurrencies.find(currency => currency.code === selectedCurrency)?.rate || 1;

    const newAdjustedCurrencies = currencies.map(currency => ({
      ...currency,
      rate: convertCurrency(currency.rate, selectedCurrencyRate, 1)
    }));

    const newAdjustedPreviousCurrencies = previousCurrencies.map(currency => ({
      ...currency,
      rate: convertCurrency(currency.rate, previousSelectedCurrencyRate, 1)
    }));

    setAdjustedCurrencies(newAdjustedCurrencies);
    setAdjustedPreviousCurrencies(newAdjustedPreviousCurrencies);
  }, [currencies, previousCurrencies, selectedCurrency]);

  console.log('these are the adjusted currencies: ', adjustedCurrencies);

  return (
    <Box w={'100vw'} h={'100vh'} p={4}>
      <Grid
        templateAreas={{
          base: `
            "nav"
            "map"
            "info"
            "footer"
          `,
          md: `
            "nav nav"
            "map info"
            "footer footer"
          `,
        }}
        gridTemplateRows={{
          base: '50px 1fr 1fr 30px',
          md: '50px 1fr 30px',
        }}
        gridTemplateColumns={{
          base: '1fr',
          md: '65% 35%',
        }}
        h={'100%'}
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'nav'}>
          Nav
        </GridItem>
        <GridItem area={'map'} minH={'500px'}>
          <Map currencies={adjustedCurrencies} previousCurrencies={adjustedPreviousCurrencies} />
        </GridItem>
        <GridItem area={'info'}>
          <Info currencies={adjustedCurrencies} previousCurrencies={adjustedPreviousCurrencies} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency}/>
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
