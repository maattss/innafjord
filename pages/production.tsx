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
import GenerateReport from "../components/GenerateReport";
import {
  getSortedDayData,
  getSortedDayLabels,
  getSortedWeekData,
  getSortedWeekLabels,
  getSortedMonthData,
  getSortedMonthLabels,
  mockData,
} from "../helpers/arrangeData";
import { getSortedDayProduction } from "../helpers/getDayData";
import { getSortedWeekProduction } from "../helpers/getWeekData";
import { getSortedMonthProduction } from "../helpers/getMonthData";
import { getGraphDataSet, graphOptions } from "../helpers/graphConfig";

const Production: React.FC = () => {
  const [tableData, setTableData] = useState<mockData[]>(getSortedDayData());
  const [graphData, setGraphData] = useState<number[]>(
    getSortedDayProduction()
  );
  const [graphLabels, setGraphLabels] = useState<string[]>(
    getSortedDayLabels()
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  const border = useColorModeValue("gray.100", "gray.700");

  const setData = (value: string) => {
    if (value === "day") {
      setGraphData(getSortedDayProduction());
      setGraphLabels(getSortedDayLabels());
      setTableData(getSortedDayData());
    } else if (value === "week") {
      setGraphData(getSortedWeekProduction());
      setGraphLabels(getSortedWeekLabels());
      setTableData(getSortedWeekData());
    } else {
      // Month
      setGraphData(getSortedMonthProduction());
      setGraphLabels(getSortedMonthLabels());
      setTableData(getSortedMonthData());
    }
  };

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
            onChange={(event) => setData(event.target.value)}
            mr={2}
          >
            <option value="day">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
          </Select>
        </Flex>
      </Flex>

      <Line
        data={getGraphDataSet(graphData, graphLabels)}
        options={graphOptions}
      />
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
              <Th textAlign="center">Production (kWh/s)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item, key) => {
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
      <GenerateReport isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Production;
