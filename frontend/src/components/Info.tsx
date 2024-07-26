import React from 'react';
import { Flex, Box, Select, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';

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

      console.log(code, previousRate, currentRate, change);

      return change;
    }
    return 0;
  };

  return (
    <Flex direction={'column'} justifyContent={'center'} h={'100%'} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <Select size='sm' border='1px' borderColor='gray.500' mb={6} onChange={handleCurrencyChange} placeholder={selectedCurrency}>
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
                <Th isNumeric>Rate</Th>
                <Th isNumeric>Change</Th>
              </Tr>
              <Tr bg={'black'}>
                <Th textColor={'green.500'}>{selectedCurrency}</Th>
                <Th textColor={'green.500'} isNumeric>1</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody overflowY={'scroll'}>
              {currencies.map((data) => {
                const change = formatChange(data.code);
                return (
                  <Tr key={data.code}>
                    <Td>{data.code}</Td>
                    <Td isNumeric>{formatRate(data.rate)}</Td>
                    <Td color={change > 0.01 ? 'green.500' : change < -0.01 ? 'red.500' : 'gray.500'} isNumeric>
                      {`${change.toFixed(2)}%`}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot position={'sticky'} bottom={0}>
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
