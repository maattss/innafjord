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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Meta from "../components/Meta";
import { Line } from "react-chartjs-2";
import { DownloadIcon } from "@chakra-ui/icons";
import dummyToday from "../data/dummyToday.json";
import dummyWeek from "../data/dummyWeek.json";
import dummyMonth from "../data/dummyMonth.json";
import GenerateReport from "../components/GenerateReport";

const PowerPrice: React.FC = () => {
  const [filterGraph, setFilterGraph] = useState<string>("today");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  let mockData = dummyToday;
  const border = useColorModeValue("gray.100", "gray.700");

  let time = [];
  let timeweek = [];
  let timemonth = [];

  let data = [];
  let dataweek = [];
  let datamonth = [];

  for (let i = 0; i < mockData.length; i++) {
    let times = new Date(mockData[i].timestamp).toUTCString().slice(17, 26);
    time.push(times);
    timeweek.push(new Date(dummyWeek[i].timestamp).toUTCString().slice(0, 11));
    timemonth.push(
      new Date(dummyMonth[i].timestamp).toUTCString().slice(0, 11)
    );

    data.push(mockData[i].powerPrice);
    dataweek.push(dummyWeek[i].powerPrice);
    datamonth.push(dummyMonth[i].powerPrice);

    mockData.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });
    dummyWeek.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });

    dummyMonth.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });
  }

  const graphExampleData = {
    labels: time,
    datasets: [
      {
        label: "Power Price",
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (filterGraph === "week") {
    mockData = dummyWeek;
    for (let i = 0; i < graphExampleData.datasets.length; i++) {
      graphExampleData.datasets[i].data = dataweek;
      graphExampleData.labels = timeweek;
    }
  }
  if (filterGraph === "month") {
    mockData = dummyMonth;
    for (let i = 0; i < graphExampleData.datasets.length; i++) {
      graphExampleData.datasets[i].data = datamonth;
      graphExampleData.labels = timemonth;
    }
  }

  return (
    <>
      <Meta title="Power Price" />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="2"
        wrap="wrap"
      >
        <Heading>Power Price</Heading>
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
            width="160px"
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
              <Th textAlign="center">Power Price (MWh)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockData.map((item, key) => {
              return (
                <Tr key={key}>
                  <Td textAlign="center">{item.timestamp.slice(0, 10)}</Td>
                  <Td textAlign="center">{item.timestamp.slice(11, 19)}</Td>
                  <Td textAlign="center">{item.powerPrice || 0}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <GenerateReport isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PowerPrice;
