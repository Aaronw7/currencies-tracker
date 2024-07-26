import React from 'react';
import { Flex, Box, Select, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Tfoot, Text } from '@chakra-ui/react';

interface Currency {
  code: string;
  rate: number;
}

interface InfoProps {
  currencies: Currency[];
  previousCurrencies: Currency[];
  selectedCurrency: string;
  setSelectedCurrency:  (value: string) => void
}

const Info: React.FC<InfoProps> = ({ currencies, previousCurrencies, selectedCurrency, setSelectedCurrency }) => {
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const formatRate = (rate: number) => {
    return rate.toPrecision(5);
  };

  const formatChange = (code: string) => {
    const currentRate = currencies.find(currency => currency.code === code)?.rate;
    const previousRate = previousCurrencies.find(currency => currency.code === code)?.rate;

    if (currentRate !== undefined && previousRate !== undefined) {
      const change = ((currentRate - previousRate) / previousRate) * 100;
      return change.toFixed(2);
    }
    return 0;
  };

  return (
    <Flex direction={'column'} justifyContent={'center'} h={'100%'} p={4} bg="#ffffff" borderRadius="md" boxShadow="md">
      <Text>Select Currency</Text>
      <Select size='sm' border='1px' borderColor='gray.500' mb={6} onChange={handleCurrencyChange} value={selectedCurrency}>
        {currencies.map((choice) => (
          <option value={choice.code} key={choice.code}>{choice.code}</option>
        ))}
      </Select>
      <Box
        flex={1}
        w={'100%'}
        h={'100%'}
        maxH={'500px'}
        border={'1px'}
        borderColor={'#000000'}
        borderRadius={'5px'}
        overflow={'hidden'}
      >
        <TableContainer
          h={'100%'}
          overflowY={'scroll'}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
          }}
        >
          <Table variant='unstyled' size='sm'>
            <Thead position="sticky" top={0} zIndex={1} bg={'#ffffff'}>
              <Tr>
                <Th>Currency</Th>
                <Th textAlign={'right'}>Rate</Th>
                <Th textAlign={'right'}>Change</Th>
              </Tr>
              <Tr borderBottom={'1px'} bg={'#0a146e'}>
                <Th textColor={'#ffffff'}>{selectedCurrency}</Th>
                <Th textColor={'#ffffff'} textAlign={'right'}>1</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {currencies.map((data) => {
                const change = formatChange(data.code);
                return (
                  <Tr key={data.code}>
                    <Td>{data.code}</Td>
                    <Td textAlign={'right'}>{formatRate(data.rate)}</Td>
                    <Td color={
                      Number(change) >= 0.5 ? '#53bc53' :
                      Number(change) >= 0.01 ? '#86cf72' :
                      Number(change) <= -0.5 ? '#df2334' :
                      Number(change) <= -0.01 ? '#cf7286' :
                      'gray.500'}
                      textAlign={'right'}
                    >
                      {`${change}%`}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot borderTop={'1px'}>
              <Tr>
                <Th>Currency</Th>
                <Th isNumeric>Rate</Th>
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
