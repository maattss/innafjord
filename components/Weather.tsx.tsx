import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
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

  return (
    <Flex justifyContent="center" alignItems="center" w="100%">
      <Flex width="100%" justifyContent="center">
        <Flex flexDirection="column" width="40%">
          <Image
            src={"./weather/" + weatherIcon + ".svg"}
            alt="Current weather icon Emoji"
            height="100px"
          />
          <Text fontWeight="medium" textAlign="center" mt={-5}>
            Bodø
          </Text>
        </Flex>
        <Flex flexDirection="column" width="20%" justifyContent="center">
          <Text fontWeight="medium" fontSize="2xl">
            Temp: {airTemperatur} °C
          </Text>
        </Flex>
        <Flex flexDirection="column" width="20%" justifyContent="center">
          <Text fontWeight="medium" fontSize="2xl">
            Rain: {precipitation} mm
          </Text>
        </Flex>
        <Flex flexDirection="column" width="20%" justifyContent="center">
          <Text fontWeight="medium" fontSize="2xl">
            Wind: {wind} m/s
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Weather;
