import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Meta from "../components/Meta";
import { Line } from "react-chartjs-2";
import { EmailIcon } from "@chakra-ui/icons";
import dummyToday from "../data/dummyToday.json";
import dummyWeek from "../data/dummyWeek.json";
import dummyMonth from "../data/dummyMonth.json";
import dummyYear from "../data/dummyYear.json";

const graphExampleData = {
  labels: ["1", "2", "3", "4", "5", "6", "7"],
  datasets: [
    {
      label: "Production",
      data: [25, 26, 27, 26, 28, 29, 30],
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

const Production: React.FC = () => {
  const [filterGraph, setFilterGraph] = useState<string>("today");
  let mockData = dummyToday;
  if (filterGraph === "week") mockData = dummyWeek;
  if (filterGraph === "month") mockData = dummyMonth;

  return (
    <>
      <Meta title="Production History" />
      <Flex justifyContent="space-between" alignItems="center" mb="2">
        <Heading>Production</Heading>
        <Flex>
          <Button leftIcon={<EmailIcon />} variant="outline" size="md" mr={2}>
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
      <Box maxH="500px" mt="4" w="100%" overflow="auto">
        <Table maxH="500px">
          <Thead>
            <Tr>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Time</Th>
              <Th textAlign="center">Production (MW)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((item, key) => {
              let total = 0;
              item.turbines.forEach((t) => (total += t.production));

              return (
                <Tr key={key}>
                  <Td textAlign="center">{item.timestamp.slice(0, 10)}</Td>
                  <Td textAlign="center">{item.timestamp.slice(11, 19)}</Td>
                  <Td textAlign="center">{Math.round(total)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Production;
