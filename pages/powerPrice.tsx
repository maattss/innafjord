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
import dummyToday from "../data/dag.json";
import dummyWeek from "../data/uke.json";
import dummyMonth from "../data/month.json";
import dummyYear from "../data/dummyYear.json";

const PowerPrice: React.FC = () => {
  const [filterGraph, setFilterGraph] = useState<string>("today");
  const bg = useColorModeValue("gray.100", "gray.700");

let mockData = dummyToday;

let time = []
let timeweek = []
let timemonth = [ ]

let data = []
let dataweek = []
let datamonth = []  

for (let i = 0; i< mockData.length; i++){
  let times = new Date(mockData[i].timestamp).toUTCString().slice(17,26)
  time.push(times)
  timeweek.push(new Date(dummyWeek[i].timestamp).toUTCString().slice(0,11))
  timemonth.push(new Date(dummyMonth[i].timestamp).toUTCString().slice(0,11))
  
  data.push(mockData[i].powerPrice)
  dataweek.push(dummyWeek[i].powerPrice)
  datamonth.push(dummyMonth[i].powerPrice)
  
  mockData.sort(function(a,b){
      return + new Date(a.timestamp)-+new Date(b.timestamp);
    })
    dummyWeek.sort(function(a,b){
      return + new Date(a.timestamp)-+new Date(b.timestamp);
    })
  
    dummyMonth.sort(function(a,b){
      return + new Date(a.timestamp)-+new Date(b.timestamp);
    })
  
}

const graphExampleData = {
  labels: time,
  datasets: [
    {
      label: "Environmental Costs",
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


  
  if (filterGraph === "week") {
      mockData = dummyWeek;
      for (let i = 0; i < graphExampleData.datasets.length; i++){
          
          graphExampleData.datasets[i].data = dataweek
          graphExampleData.labels = timeweek

      }
  }
  if (filterGraph === "month"){ 
      mockData = dummyMonth;
      for (let i = 0; i < graphExampleData.datasets.length; i++){
          
          graphExampleData.datasets[i].data = datamonth
          graphExampleData.labels = timemonth

      }
  }
  if (filterGraph === "year") mockData = dummyYear;
  return (
    <>
      <Meta title="Power Price History" />
      <Flex justifyContent="space-between" alignItems="center" mb="2">
        <Heading>Power Price</Heading>
        <Select
          width="200px"
          onChange={(event) => setFilterGraph(event.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">Last week</option>
          <option value="month">Last month</option>
         
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

export default PowerPrice;
