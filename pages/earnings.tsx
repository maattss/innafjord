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
    useColorModeValue
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import Meta from "../components/Meta";
  import { Line } from "react-chartjs-2";
  import { EmailIcon } from "@chakra-ui/icons";
  import dummyToday from "../data/dummyToday.json";
  import dummyWeek from "../data/dummyWeek.json";
  import dummyMonth from "../data/dummyMonth.json";
  import dummyYear from "../data/dummyYear.json";
  
  let dummydata = dummyToday;
  
  let time = []
  let data = []
  
  for (let i = 0; i< dummydata.length; i++){
    time.push(dummydata[i].timestamp)
    data.push(dummydata[i].money)
  
    
  }
  
  const graphExampleData = {
    labels: time,
    datasets: [
      {
        label: "Power price",
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
  
  const Earnings: React.FC = () => {
    const [filterGraph, setFilterGraph] = useState<string>("today");
    const bg = useColorModeValue("gray.100", "gray.700");
    let mockData = dummyToday;
    if (filterGraph === "week") mockData = dummyWeek;
    if (filterGraph === "month") mockData = dummyMonth;
    if (filterGraph === "year") mockData = dummyYear;
    return (
      <>
        <Meta title="Earnings History" />
        <Flex justifyContent="space-between" alignItems="center" mb="2">
          <Heading>Earnings</Heading>
          <Select
            width="200px"
            onChange={(event) => setFilterGraph(event.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
            <option value="year">Last year</option>
          </Select>
        </Flex>
  
        <Line data={graphExampleData} options={options} />
  
        <Box maxH="500px" mt="4" w="100%" overflow="auto"  borderRadius="lg" bg={bg}>
          <Table maxH="500px">
            <Thead>
              <Tr>
                <Th textAlign="center">Date</Th>
                <Th textAlign="center">Time</Th>
                <Th textAlign="center">Power Price</Th>
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
        <Flex justifyContent="center" w="100%" mt="4">
          <Button
            leftIcon={<EmailIcon />}
            colorScheme="teal"
            variant="solid"
            size="lg"
          >
            Generate report
          </Button>
        </Flex>
      </>
    );
  };
  
  export default Earnings;
  