import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Meta from "../components/Meta";
import { Line } from "react-chartjs-2";
import { CloseIcon, DownloadIcon } from "@chakra-ui/icons";
import dummyToday from "../data/dummyToday.json";
import dummyWeek from "../data/dummyWeek.json";
import dummyMonth from "../data/dummyMonth.json";

let dummydata = dummyToday;

let time = [];
let data = [];

for (let i = 0; i < dummydata.length; i++) {
  time.push(dummydata[i].timestamp);
  data.push(dummydata[i].waterlevel);
}

const graphExampleData = {
  labels: time,
  datasets: [
    {
      label: "Water level",
      data: data,
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
      },
    ],
  },
};

const WaterLevel: React.FC = () => {
  const [filterGraph, setFilterGraph] = useState<string>("today");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const border = useColorModeValue("gray.100", "gray.700");

  let mockData = dummyToday;
  if (filterGraph === "week") mockData = dummyWeek;
  if (filterGraph === "month") mockData = dummyMonth;

  return (
    <>
      <Meta title="Water Level History" />
      <Flex justifyContent="space-between" alignItems="center" mb="2">
        <Heading>Water level</Heading>
        <Flex>
          <Button
            leftIcon={<DownloadIcon />}
            variant="outline"
            size="md"
            mr={2}
            onClick={() => setIsOpen(true)}
          >
            Generate report
          </Button>
          <Select
            width="200px"
            onChange={(event) => setFilterGraph(event.target.value)}
          >
            <option value="today">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
          </Select>
        </Flex>
      </Flex>

      <Line data={graphExampleData} options={options} />

      <Box
        maxH="330px"
        mt="4"
        w="100%"
        overflow="auto"
        p={4}
        border="1px"
        borderColor={border}
        borderRadius="lg"
      >
        <Table maxH="330px">
          <Thead>
            <Tr>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Time</Th>
              <Th textAlign="center">Water level</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((item, key) => {
              return (
                <Tr key={key}>
                  <Td textAlign="center">{item.timestamp.slice(0, 10)}</Td>
                  <Td textAlign="center">{item.timestamp.slice(11, 19)}</Td>
                  <Td textAlign="center">{item.waterlevel}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="medium">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>Report is generated successfully!</Text>
                <Button onClick={onClose}>
                  <CloseIcon />
                </Button>
              </Flex>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Text fontSize="lg" mr={4} fontWeight="medium">
                Download{" "}
              </Text>
              <Button ref={cancelRef} onClick={onClose} mr={2}>
                . CSV
              </Button>
              <Button ref={cancelRef} onClick={onClose} mr={2}>
                . PDF
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                . JSON
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default WaterLevel;
