import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import "./view/install";
import Install from "@/view/install";

import "@/App.css";

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="1200px" py="5" h="100svh">
        <Install />
      </Container>
    </ChakraProvider>
  );
};

export default App;
