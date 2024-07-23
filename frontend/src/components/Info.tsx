import { Box, HStack, Select, Input, TableContainer, Table, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';

const Info = () => {
  const sampleCurrencyData = [
    { currency: 'AUD', rate: 1.45, amount: 1.45 },
    { currency: 'BGN', rate: 1.76, amount: 1.76 },
    { currency: 'BRL', rate: 5.25, amount: 5.25 },
    { currency: 'CAD', rate: 1.25, amount: 1.25 },
    { currency: 'CHF', rate: 0.92, amount: 0.92 },
    { currency: 'CNY', rate: 6.47, amount: 6.47 },
    { currency: 'CZK', rate: 21.95, amount: 21.95 },
    { currency: 'DKK', rate: 6.36, amount: 6.36 },
    { currency: 'EUR', rate: 0.85, amount: 0.85 },
    { currency: 'GBP', rate: 0.74, amount: 0.74 },
    { currency: 'HKD', rate: 7.78, amount: 7.78 },
    { currency: 'HRK', rate: 6.39, amount: 6.39 },
    { currency: 'HUF', rate: 305.78, amount: 305.78 },
    { currency: 'IDR', rate: 14235, amount: 14235 },
    { currency: 'ILS', rate: 3.22, amount: 3.22 },
    { currency: 'INR', rate: 74.18, amount: 74.18 },
    { currency: 'ISK', rate: 126.75, amount: 126.75 },
    { currency: 'JPY', rate: 109.92, amount: 109.92 },
    { currency: 'KRW', rate: 1164.17, amount: 1164.17 },
    { currency: 'MXN', rate: 20.02, amount: 20.02 },
    { currency: 'MYR', rate: 4.22, amount: 4.22 },
    { currency: 'NOK', rate: 8.66, amount: 8.66 },
    { currency: 'NZD', rate: 1.50, amount: 1.50 },
    { currency: 'PHP', rate: 50.38, amount: 50.38 },
    { currency: 'PLN', rate: 3.85, amount: 3.85 },
    { currency: 'RON', rate: 4.12, amount: 4.12 },
    { currency: 'RUB', rate: 73.21, amount: 73.21 },
    { currency: 'SEK', rate: 8.62, amount: 8.62 },
    { currency: 'SGD', rate: 1.34, amount: 1.34 },
    { currency: 'THB', rate: 32.63, amount: 32.63 },
    { currency: 'TRY', rate: 8.55, amount: 8.55 },
    { currency: 'USD', rate: 1.00, amount: 1.00 },
    { currency: 'ZAR', rate: 14.58, amount: 14.58 }
  ];

  return (
    <Box h={'100%'} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <HStack mb={3}>
        <Select size='sm' border='1px' borderColor='gray.500'>
          {sampleCurrencyData.map((choice) => (
            <option value={choice.currency} key={choice.currency}>{choice.currency}</option>
          ))}
        </Select>
        <Input variant='outline' placeholder='small size' size='sm' border='1px' borderColor='gray.500' />
      </HStack>
      <TableContainer maxWidth={'100%'}>
        <Table variant='simple' size='sm'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Currency</Th>
              <Th isNumeric>Rate</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sampleCurrencyData.map((data) => (
              <Tr key={data.currency}>
                <Td>{data.currency}</Td>
                <Td isNumeric>{data.rate}</Td>
                <Td isNumeric>{data.amount}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Currency</Th>
              <Th isNumeric>Rate</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Info;
