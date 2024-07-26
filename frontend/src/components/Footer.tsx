import { Flex, Heading, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      justifyContent={'end'}
      align={'center'}
      w={'100%'}
      h={'100%'}
      bg={'#0a146e'}
      px={3}
    >
      <Text color={'#ffffff'}>Created by Aaron W</Text>
    </Flex>
  );
};

export default Footer;
