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
      px={4}
      py={{ base: 4, md: 2 }}
      borderTopRadius={'md'}
    >
      <Heading color={'#ffffff'} fontFamily={'Merriweather'} fontSize={{ base: 'x-large', md: 'xx-large' }}>CURRENCIES TRACKER</Heading>
      <Text color={'#ffffff'} mt={{ base: 0, md: 5 }} fontSize={{ base: 'small', md: 'medium'}}>Updated Daily</Text>
    </Flex>
  );
};

export default Header;
