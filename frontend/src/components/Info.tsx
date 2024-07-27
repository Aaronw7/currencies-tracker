import React from 'react';
import { Flex, Box, Select, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Tfoot, Text, Heading } from '@chakra-ui/react';

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
      if (change < 0 && change > -0.005) {
        return "0.00"
      }
      return change.toFixed(2);
    }
    return 0;
  };

  return (
    <Flex
      direction={'column'}
      justifyContent={'center'}
      h={'100%'}
      p={4}
      bg="#ffffff"
      borderTopLeftRadius={'md'}
      borderTopRightRadius={{ base: 'md', md: 'none'}}
      borderBottomLeftRadius={{ base: 'none', md: 'md' }}
    >
      <Heading size={{ base: 'sm', md: 'md' }} mb={4}>
        <Box as='span' color={'#0a146e'} fontSize={{base: 'xx-large', md: 'xxx-large'}} fontFamily={'Merriweather'}>32 </Box>
        Popular Currencies
      </Heading>
      <Box display={{ base: 'none', md: 'flex'}} flexDirection={'column'}>
        <Text fontWeight={'bold'}>Select Currency</Text>
        <Select
          size='sm'
          border='1px'
          borderColor='gray.500'
          mb={4}
          onChange={handleCurrencyChange}
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
      </Box>
      <Box
        flex={1}
        w={'100%'}
        maxH={{ base: '250px', md: '500px' }}
        border={'1px'}
        borderColor={'gray.500'}
        borderRadius={'3px'}
        overflow={'hidden'}
      >
        <TableContainer
          h={'100%'}
          overflowY={'scroll'}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
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
                      Number(change) >= 0.5 ? '#3e9e3e' :
                      Number(change) >= 0.01 ? '#65c24c' :
                      Number(change) <= -0.5 ? '#b51a28' :
                      Number(change) <= -0.01 ? '#c24c65' :
                      '#a3a3a3'}
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
                <Th textAlign={'right'}>Rate</Th>
                <Th textAlign={'right'}>Change</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
};

export default Info;
