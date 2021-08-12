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
let productiondata = []


for (let i = 0; i< dummydata.length; i++){
  time.push(dummydata[i].timestamp)
  let totalproduction = 0

  //Pluss sammen produksjon i hver turbin. i er en dag. Hver dag har mange turbiner
  for(let j = 0; j < dummydata[i].turbines.length; j++){
    totalproduction+= dummydata[i].turbines[j].production
  }
  productiondata.push(totalproduction)
}

console.log(productiondata)



const graphExampleData = {
  labels: time,
  datasets: [
    {
      label: "Production",
      data: productiondata,
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
  const bg = useColorModeValue("gray.100", "gray.700");
  let mockData = dummyToday;
  if (filterGraph === "week") mockData = dummyWeek;
  if (filterGraph === "month") mockData = dummyMonth;
  if (filterGraph === "year") mockData = dummyYear;
  return (
    <>
      <Meta title="Production History" />
      <Flex justifyContent="space-between" alignItems="center" mb="2">
        <Heading>Production</Heading>
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

export default Production;
