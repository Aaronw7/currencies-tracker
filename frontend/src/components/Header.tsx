import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
      w={'100%'}
      h={'100%'}
      bg={'#0a146e'}
      p={2}
    >
      <Heading color={'#ffffff'}>Currency Converter</Heading>
      <Text color={'#ffffff'}>Created by Aaron W</Text>
    </Flex>
  );
};

export default Header;
