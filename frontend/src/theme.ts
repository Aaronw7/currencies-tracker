import { extendTheme } from '@chakra-ui/react';
import '@fontsource/inter';
import '@fontsource/merriweather';

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
});

export default theme;