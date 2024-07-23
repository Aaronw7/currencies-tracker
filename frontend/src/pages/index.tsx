import { Box, Grid, GridItem } from '@chakra-ui/react';
import Map from '../components/Map';

const Home = () => {
  return (
    <Box w={'100vw'} h={'100vh'} p={4}>
      <Grid
        templateAreas={{
          base: `
            "nav"
            "map"
            "input"
            "output"
            "footer"
          `,
          md: `
            "nav nav"
            "map input"
            "map output"
            "footer footer"
          `,
        }}
        gridTemplateRows={{
          base: '50px 1fr 1fr 1fr 30px',
          md: '50px 1fr 1fr 30px',
        }}
        gridTemplateColumns={{
          base: '1fr',
          md: '65% 35%',
        }}
        h={'100%'}
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='orange.300' area={'nav'}>
          Nav
        </GridItem>
        <GridItem area={'map'} minH={'500px'}>
          <Map />
        </GridItem>
        <GridItem area={'input'}>
          {/* <Input /> */}
          Input
        </GridItem>
        <GridItem area={'output'}>
          {/* <Output /> */}
          Output
        </GridItem>
        <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
