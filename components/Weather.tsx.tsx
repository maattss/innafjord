import React from "react";
import { Box, Flex, Image, LinkBox, Text } from "@chakra-ui/react";
import useSWR from "swr";

const apiUrlYr = "https://api.met.no/weatherapi/locationforecast/2.0/compact";
const fetcher = (params: string) =>
  fetch(apiUrlYr + params).then((res) => res.json());

export const Weather: React.FC = () => {
  const { data, error } = useSWR("?altitude=3&lat=67.47&lon=14.80", fetcher);

  if (error) return <div>Failed to load weather from Yr.no</div>;
  if (!data) return <div>Loading...</div>;
  const airTemperatur =
    data.properties.timeseries[0].data.instant.details.air_temperature;
  const weatherIcon =
    data.properties.timeseries[0].data.next_6_hours.summary.symbol_code;
  const precipitation =
    data.properties.timeseries[0].data.next_6_hours.details
      .precipitation_amount;
  const wind = data.properties.timeseries[0].data.instant.details.wind_speed;
  console.log("Data", data);

  return (
    <Flex justifyContent="left" alignItems="center" w="100%">
      <Box width="25%" borderRadius={"lg"} mr={4}>
        <Image
          src={"./weather/" + weatherIcon + ".svg"}
          alt="Recycle Emoji"
          width="100%"
        />
      </Box>
      <Flex flexDirection="column">
        <Text fontWeight="medium" fontSize="2xl">
          Temperature: {airTemperatur} °C
        </Text>
        <Text fontWeight="medium" fontSize="2xl">
          Precipitation: {precipitation} mm (next 6 hours)
        </Text>
        <Text fontWeight="medium" fontSize="2xl">
          Wind: {wind} m/s
        </Text>
      </Flex>
    </Flex>
  );
};

export default Weather;
