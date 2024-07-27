import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      justifyContent={'end'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      bg={'#0a146e'}
      px={3}
      borderBottomRadius={'md'}
    >
      <Text color={'#ffffff'} fontSize={{base: 'small', md: 'small'}} fontFamily={'Merriweather'}>Created by Aaron W</Text>
    </Flex>
  );
};

export default Footer;
