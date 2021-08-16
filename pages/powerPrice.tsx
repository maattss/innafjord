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
import { getSortedDayPowerPrice } from "../helpers/getDayData";
import {
  getSortedDayData,
  getSortedDayLabels,
  getSortedMonthData,
  getSortedMonthLabels,
  getSortedWeekData,
  getSortedWeekLabels,
  mockData,
} from "../helpers/arrangeData";
import { getSortedWeekPowerPrice } from "../helpers/getWeekData";
import { getSortedMonthPowerPrice } from "../helpers/getMonthData";
import { getGraphDataset, graphOptions } from "../helpers/graphConfig";

const PowerPrice: React.FC = () => {
  const [tableData, setTableData] = useState<mockData[]>(getSortedDayData());
  const [graphData, setGraphData] = useState<number[]>(
    getSortedDayPowerPrice()
  );
  const [graphLabels, setGraphLabels] = useState<string[]>(
    getSortedDayLabels()
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  const border = useColorModeValue("gray.100", "gray.700");

  const setData = (value: string) => {
    if (value === "day") {
      setGraphData(getSortedDayPowerPrice());
      setGraphLabels(getSortedDayLabels());
      setTableData(getSortedDayData());
    } else if (value === "week") {
      setGraphData(getSortedWeekPowerPrice());
      setGraphLabels(getSortedWeekLabels());
      setTableData(getSortedWeekData());
    } else {
      // Month
      setGraphData(getSortedMonthPowerPrice());
      setGraphLabels(getSortedMonthLabels());
      setTableData(getSortedMonthData());
    }
  };

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
            onChange={(event) => setData(event.target.value)}
          >
            <option value="day">Last 24 hours</option>
            <option value="week">Last week</option>
            <option value="month">Last month</option>
          </Select>
        </Flex>
      </Flex>

      <Line
        data={getGraphDataset(graphData, graphLabels)}
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
              <Th textAlign="center">Power Price (MWh)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item, key) => {
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
