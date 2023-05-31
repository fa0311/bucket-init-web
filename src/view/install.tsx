import {
  Flex,
  Button,
  Checkbox,
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Card,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import data from "@/assets/data.json";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";

import { useEffect, useState } from "react";
import rowRenderer from "@/utils/render";

type DataType = {
  tabs: string[];
  apps: [DataAppType];
};

type DataAppType = {
  bucket: string;
  name: string;
  tags: string[];
  default: boolean;
};

const toBucketCommand = (items: DataAppType[]): string[] => {
  return items
    .reduce(
      (x, y) => (x.includes(y.bucket) ? x : [...x, y.bucket]),
      [] as string[]
    )
    .map((e) => `scoop bucket add ${e}`);
};

const install = [
  "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force",
  "iwr -useb get.scoop.sh | iex",
  "scoop install main/git",
];

const toCommand = (items: DataAppType[]): string[] => {
  return items.map((e) => `scoop install ${e.name}`);
};

const Install = () => {
  const [select, setSelect] = useState<DataAppType[]>([]);
  const [copy, setCopy] = useState<boolean>(false);
  const [mobile] = useMediaQuery("(max-width: 800px)");
  const tabs = (data as unknown as DataType).tabs;
  const apps = (data as unknown as DataType).apps;

  const getCommand = () =>
    [...install, ...toBucketCommand(select), ...toCommand(select)].join("\n");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getCommand());
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  useEffect(() => {
    setSelect(apps.filter((e) => e.default));
  }, [apps]);

  return (
    <>
      <Tabs h="100%">
        <Flex direction="column" h="100%">
          <TabList>
            {tabs.map((tab) => (
              <Tab key={tab}>{tab}</Tab>
            ))}
          </TabList>

          <Flex
            h={"calc(100% - 40px)"}
            justify={mobile ? "flex-start" : "space-around"}
            direction={mobile ? "column" : "row"}
          >
            <Card
              overflowY={"auto"}
              h={"100%"}
              w={mobile ? "100%" : "50%"}
              m="10px"
            >
              <TabPanels>
                {tabs.map((tab) => (
                  <TabPanel key={tab}>
                    <Stack>
                      {apps
                        .filter((item) => item.tags.includes(tab))
                        .map((item) => (
                          <Checkbox
                            key={item.name}
                            isChecked={select.some((e) => e.name === item.name)}
                            onChange={(e) =>
                              setSelect((prev) =>
                                e.target.checked
                                  ? [...prev, item]
                                  : prev.filter((e) => e.name !== item.name)
                              )
                            }
                          >
                            <Text fontSize="sm">{item.name}</Text>
                          </Checkbox>
                        ))}
                    </Stack>
                  </TabPanel>
                ))}
              </TabPanels>
            </Card>

            <Flex
              h="100%"
              w={mobile ? "100%" : "50%"}
              direction="column"
              m="10px"
            >
              <SyntaxHighlighter
                customStyle={{
                  height: mobile ? "300px" : "calc(100% - 40px)",
                }}
                language="powershell"
                style={github}
                renderer={rowRenderer}
              >
                {getCommand()}
              </SyntaxHighlighter>
              <Button
                mt="10px"
                onClick={copyToClipboard}
                colorScheme="teal"
                variant="outline"
              >
                {copy ? (
                  <CheckIcon></CheckIcon>
                ) : (
                  <Text fontSize="sm">Copy to clipboard</Text>
                )}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Tabs>
    </>
  );
};

export default Install;
