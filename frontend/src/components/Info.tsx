import React, { useEffect, useState } from 'react';
import { Flex, Box, Select, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';
import axios from 'axios';

interface Currency {
  code: string;
  rate: number;
}

const Info = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/currency/latest');
        const { rates } = response.data;
        const formattedRates: Currency[] = Object.entries(rates).map(([code, rate]) => ({ code, rate: rate as number }));
        setCurrencies(formattedRates);
      } catch (error) {
        console.error('Failed to fetch currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const formatRate = (rate: number) => {
    return rate.toPrecision(5);
  };

  return (
    <Flex direction={'column'} justifyContent={'center'} h={'100%'} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <Select size='sm' border='1px' borderColor='gray.500' mb={6} onChange={handleCurrencyChange}>
        {currencies.map((choice) => (
          <option value={choice.code} key={choice.code}>{choice.code}</option>
        ))}
      </Select>
      <Box flex={1} w={'100%'} h={'100%'} maxH={'500px'} overflowY={'scroll'}>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead>
              <Tr>
                <Th>Currency</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>Change</Th>
              </Tr>
              <Tr bg={'black'}>
                <Th textColor={'#86cf72'}>{selectedCurrency}</Th>
                <Th textColor={'#86cf72'} isNumeric>1</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody overflowY={'scroll'}>
              {currencies.map((data) => (
                <Tr key={data.code}>
                  <Td>{data.code}</Td>
                  <Td isNumeric>{formatRate(data.rate)}</Td>
                  <Td isNumeric>{formatRate(data.rate)}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot position={'sticky'} bottom={0}>
              <Tr>
                <Th>Currency</Th>
                <Th isNumeric>Amount</Th>
                <Th isNumeric>Change</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
};

export default Info;
