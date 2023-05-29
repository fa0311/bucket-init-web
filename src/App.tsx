import { Box, ChakraProvider } from "@chakra-ui/react";
import { Container, Heading, Flex, useMediaQuery } from "@chakra-ui/react";
import { MarkGithubIcon } from "@primer/octicons-react";
import "./view/install";
import Install from "@/view/install";

import "@/App.css";

const App = () => {
  const [mobile] = useMediaQuery("(max-width: 800px)");
  const repository =
    "https://github.com/fa0311/essential-bucket-bulk-installer";
  return (
    <ChakraProvider>
      <Box position="absolute" left={0} right={0}>
        <Container maxW="1200px" px={mobile ? 0 : 4}>
          <Flex
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={"gray.200"}
            width={"100%"}
          >
            <Heading as="h1" size="md">
              Essential Bucket Bulk Installer
            </Heading>
            <Box ml="auto">
              <a href={repository}>
                <MarkGithubIcon size={25}></MarkGithubIcon>
              </a>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container maxW="1200px" py="5" pt="50px" h="100svh">
        <Install />
      </Container>
    </ChakraProvider>
  );
};

export default App;
