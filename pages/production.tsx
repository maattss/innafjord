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
import dummyToday from "../data/dag.json";
import dummyWeek from "../data/uke.json";
import dummyMonth from "../data/month.json";

const Production: React.FC = () => {
  const [filterGraph, setFilterGraph] = useState<string>("today");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const border = useColorModeValue("gray.100", "gray.700");
  let mockData = dummyToday;
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

    mockData.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });

    dummyWeek.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });

    dummyMonth.sort(function (a, b) {
      return +new Date(a.timestamp) - +new Date(b.timestamp);
    });

    let totalproduction = 0;
    let totalprodweek = 0;
    let totalprodmonth = 0;

    //Pluss sammen produksjon i hver turbin. i er en dag. Hver dag har mange turbiner
    for (let j = 0; j < mockData[i].turbiner.length; j++) {
      totalproduction += mockData[i].turbiner[j].production;
      totalprodweek += dummyWeek[i].turbiner[j].production;
      totalprodmonth += dummyMonth[i].turbiner[j].production;
    }
    data.push(totalproduction);
    dataweek.push(totalprodweek);
    datamonth.push(totalprodmonth);
  }

  console.log(data);
  console.log(time);

  const graphExampleData = {
    labels: time,
    datasets: [
      {
        label: "Production",
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
      <Meta title="Production" />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="2"
        wrap="wrap"
      >
        <Heading>Production</Heading>
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
            mr={2}
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
        <Table maxH="330px" variant="simple">
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
              item.turbiner.forEach((t) => (total += t.production));

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
                Download as{" "}
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

export default Production;
