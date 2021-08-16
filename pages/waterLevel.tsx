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
import { getSortedDayWaterLevel } from "../helpers/getDayData";
import { getSortedWeekWaterLevel } from "../helpers/getWeekData";
import { getSortedMonthWaterLevel } from "../helpers/getMonthData";
import { graphOptions, getGraphDataSet } from "../helpers/graphConfig";

const WaterLevel: React.FC = () => {
  const [tableData, setTableData] = useState<mockData[]>(getSortedDayData());
  const [graphData, setGraphData] = useState<number[]>(
    getSortedDayWaterLevel()
  );
  const [graphLabels, setGraphLabels] = useState<string[]>(
    getSortedDayLabels()
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  const border = useColorModeValue("gray.100", "gray.700");

  const setData = (value: string) => {
    if (value === "day") {
      setGraphData(getSortedDayWaterLevel());
      setGraphLabels(getSortedDayLabels());
      setTableData(getSortedDayData());
    } else if (value === "week") {
      setGraphData(getSortedWeekWaterLevel());
      setGraphLabels(getSortedWeekLabels());
      setTableData(getSortedWeekData());
    } else {
      // Month
      setGraphData(getSortedMonthWaterLevel());
      setGraphLabels(getSortedMonthLabels());
      setTableData(getSortedMonthData());
    }
  };

  return (
    <>
      <Meta title="Water Level" />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="2"
        wrap="wrap"
      >
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
            width="160px"
            onChange={(event) => setData(event.target.value)}
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
        <Table maxH="330px">
          <Thead>
            <Tr>
              <Th textAlign="center">Date</Th>
              <Th textAlign="center">Time</Th>
              <Th textAlign="center">Water level (m)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item, key) => {
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

      <GenerateReport isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default WaterLevel;
