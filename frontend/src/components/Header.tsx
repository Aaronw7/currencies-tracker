import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
      align={{ base: 'start', md: 'center' }}
      w={'100%'}
      h={'100%'}
      bg={'#0a146e'}
      p={2}
    >
      <Heading color={'#ffffff'}>Currency Converter</Heading>
      <Text color={'#ffffff'} mt={{ base: 0, md: 5 }}>Updated Daily</Text>
    </Flex>
  );
};

export default Header;
