import React, { useEffect, useState } from 'react';
import { Box, Flex, Grid, GridItem, Text, Select, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import Header from '@/components/Header';
import Map from '@/components/Map';
import Info from '@/components/Info';
import Footer from '@/components/Footer';
import Meta from '@/components/Meta';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pingKeepAlive = async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/keep-alive`);
        console.log('Server is alive!');
      } catch (error) {
        console.error('Failed to ping keep-alive endpoint', error);
      }
    };

    const shouldPing = () => {
      const now = new Date();
      const currentHour = now.getHours();
      return currentHour >= 8 && currentHour < 23;
    };

    const schedulePing = () => {
      if (shouldPing()) {
        pingKeepAlive();
      }
    };

    const intervalId = setInterval(schedulePing, 300000);

    schedulePing();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const [latestResponse, previousResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/currency/latest`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/currency/previous`)
        ]);

        const { rates: latestRates } = latestResponse.data;
        const formattedLatestRates: Currency[] = Object.entries(latestRates).map(([code, rate]) => ({ code, rate: rate as number }));
        setCurrencies(formattedLatestRates);

        const { rates: previousRates } = previousResponse.data;
        const formattedPreviousRates: Currency[] = Object.entries(previousRates).map(([code, rate]) => ({ code, rate: rate as number }));
        setPreviousCurrencies(formattedPreviousRates);

        setLoading(false);

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

  if (loading) {
    return (
      <Flex w={'100vw'} h={'100vh'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} bg={'#202020'}>
        <Text color={'white'} mb={3}>Please hold while our servers wake up</Text>
        <Spinner size={'lg'} color={'white'} />
      </Flex>
    );
  }

  return (
    <Box w={'100vw'} h={'100vh'} p={3} bg={'#202020'} overflowY={'scroll'}>
      <Meta />
      <Grid
        templateAreas={{
          base: `
            "header"
            "select"
            "map"
            "info"
            "footer"
          `,
          md: `
            "header header"
            "map info"
            "footer footer"
          `,
        }}
        gridTemplateRows={{
          base: '80px 88px 1fr 1fr 35px',
          md: '50px 1fr 35px',
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
        <GridItem area={'header'}>
          <Header />
        </GridItem>
        <GridItem area={'select'}>
          <Flex display={{ md: 'none'}} flexDirection={'column'} justifyContent={'center'} px={12} py={4} bg={'#ffffff'} borderBottomRadius="md" boxShadow="md">
            <Text fontWeight={'bold'}>Select Currency</Text>
            <Select
              size='sm'
              border='1px'
              borderColor='gray.500'
              onChange={(e) => setSelectedCurrency(e.target.value)}
              value={selectedCurrency}
              _hover={{
                borderColor: 'gray.700',
                cursor: 'pointer'
              }}
              _focus={{
                boxShadow: '0 0 0 1px gray.500',
                borderColor: 'gray.500',
              }}
            >
              {currencies.map((choice) => (
                <option value={choice.code} key={choice.code}>{choice.code}</option>
              ))}
            </Select>
          </Flex>
        </GridItem>
        <GridItem area={'map'}>
          <Map selectedCurrency={selectedCurrency} currencies={adjustedCurrencies} previousCurrencies={adjustedPreviousCurrencies} />
        </GridItem>
        <GridItem area={'info'}>
          <Info currencies={adjustedCurrencies} previousCurrencies={adjustedPreviousCurrencies} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency}/>
        </GridItem>
        <GridItem area={'footer'}>
          <Footer />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
