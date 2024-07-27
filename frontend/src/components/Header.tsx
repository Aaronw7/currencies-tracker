import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'space-between'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      bg={'#0a146e'}
      py={2}
      px={4}
      borderTopRadius={'md'}
    >
      <Heading color={'#ffffff'} fontFamily={'Merriweather'} fontSize={{ base: 'x-large', md: 'xx-large' }}>CURRENCY CONVERTER</Heading>
      <Text color={'#ffffff'} mt={{ base: 0, md: 5 }}>Updated Daily</Text>
    </Flex>
  );
};

export default Header;
