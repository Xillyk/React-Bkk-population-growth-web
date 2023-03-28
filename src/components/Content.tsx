import {
  Box,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

type DistrictData = {
  year: number;
  percentage: number;
  isDisabled: boolean;
};

type DistrictSummarizeData = {
  dcode: string;
  name: string;
  data: DistrictData[];
};

const Content = () => {
  const theme = useTheme();
  const isAboveSmallScreens = useMediaQuery("(min-width: 800px)");
  const [isLoading, setIsLoading] = useState(true);
  const [districtSummarizeDatas, setDistrictSummarizeDatas] =
    useState<DistrictSummarizeData[]>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const [selectedDistrictDataset, setSelectedDistrictDataset] =
    useState<DistrictData[]>();
  const [cloneSelectedDistrictDataset, setCloneSelectedDistrictDataset] =
    useState<DistrictData[]>();

  const [fromYear, setFromYear] = useState(0);
  const [toYear, setToYear] = useState(0);

  const commonConfig = { delimiter: "," };

  useEffect(() => {
    Papa.parse("/bkk_population_growth.csv", {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        let tmpDistrictsData: any = [];

        result.data?.forEach((bigObject) => {
          let arrays = Object.entries(bigObject as object);
          let districtSummarizeData = {};
          let districtData: DistrictData[] = [];
          arrays.forEach((array, index) => {
            if (index === 10) {
              Object.assign(districtSummarizeData, { dcode: array[1] });
            } else if (index === 11) {
              Object.assign(districtSummarizeData, { name: array[1] });
            } else {
              let data: DistrictData = {
                year: +array[0],
                percentage: +array[1].substring(0, array[1].length - 1),
                isDisabled: false,
              };
              districtData.push(data);
            }
          });
          Object.assign(districtSummarizeData, { data: districtData });
          tmpDistrictsData.push(districtSummarizeData);
        });

        setDistrictSummarizeDatas(tmpDistrictsData);

        // set district [4] as default value
        // set range 2550-2559 as default range
        setSelectedDistrictDataset(tmpDistrictsData[4].data);
        setCloneSelectedDistrictDataset(tmpDistrictsData[4].data);

        setSelectedDistrict(tmpDistrictsData[4].name);
        setFromYear(2550);
        setToYear(2559);
      },
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Typography variant="h3" fontWeight="bold">
        การเติบโต
      </Typography>

      {isLoading ? (
        <div>LOADING.......</div>
      ) : (
        <>
          {/* CHART FILTER */}
          <Box
            mt={3}
            display="flex"
            alignItems="center"
            justifyItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box display="flex" alignItems="center" justifyItems="center">
              <Typography width={70}>เขต</Typography>
              <Box>
                <Select
                  id="select"
                  value={selectedDistrict}
                  onChange={(event) => {
                    let districtName = event.target.value;
                    setSelectedDistrict(districtName);
                    let index = districtSummarizeDatas!.findIndex(
                      (data: any) => data.name === districtName
                    );
                    let districtSummarizeData = districtSummarizeDatas![index];
                    // set district dataset
                    setSelectedDistrictDataset(districtSummarizeData.data);
                    setCloneSelectedDistrictDataset(districtSummarizeData.data);

                    // reset fromYear value
                    setFromYear(2550);

                    // reset toYear value
                    setToYear(2559);
                  }}
                  color="info"
                  fullWidth={isAboveSmallScreens ? false : true}
                  sx={{
                    width: isAboveSmallScreens ? 200 : 280,
                    height: 30,
                    bgcolor: "#FFFFFF",
                    color: "#000000",
                  }}
                  MenuProps={{
                    style: {
                      maxHeight: 400,
                    },
                  }}
                >
                  {districtSummarizeDatas?.map((districtData) => (
                    <MenuItem
                      key={districtData.dcode}
                      dense
                      value={districtData.name}
                      sx={{
                        color: "#000",
                      }}
                    >
                      {districtData.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            <Box
              display="flex"
              gap={4}
              sx={{ mt: isAboveSmallScreens ? 0 : 2 }}
            >
              <Box display="flex" alignItems="center" justifyItems="center">
                <Typography width={70}>ตั้งแต่</Typography>
                <Box>
                  <Select
                    id="select"
                    value={fromYear}
                    onChange={(event) => {
                      let fromYear = +event.target.value;
                      setFromYear(fromYear);

                      // reset toYear value
                      setToYear(2559);

                      let cloneDataset = cloneSelectedDistrictDataset;

                      // set toYear available range
                      let editedDataset = cloneDataset?.map((data) => {
                        if (data.year < fromYear) {
                          data.isDisabled = true;
                        } else {
                          data.isDisabled = false;
                        }
                        return data;
                      });
                      setSelectedDistrictDataset(editedDataset);
                    }}
                    color="info"
                    sx={{
                      width: 100,
                      height: 30,
                      bgcolor: "#FFFFFF",
                      color: "#000000",
                    }}
                    MenuProps={{
                      style: {
                        maxHeight: 400,
                      },
                    }}
                  >
                    {selectedDistrictDataset?.map((districtData) => (
                      <MenuItem
                        key={districtData.year}
                        dense
                        value={districtData.year}
                        sx={{
                          color: "#000",
                        }}
                      >
                        {districtData.year}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" justifyItems="center">
                <Typography>ถึง</Typography>
                <Box ml={4}>
                  <Select
                    id="select"
                    value={toYear}
                    onChange={(event) => {
                      let toYear = +event.target.value;
                      setToYear(toYear);
                    }}
                    color="info"
                    sx={{
                      width: 100,
                      height: 30,
                      bgcolor: "#FFFFFF",
                      color: "#000000",
                    }}
                    MenuProps={{
                      style: {
                        maxHeight: 400,
                      },
                    }}
                  >
                    {selectedDistrictDataset?.map((districtData) => (
                      <MenuItem
                        key={districtData.year}
                        dense
                        value={districtData.year}
                        disabled={districtData.isDisabled}
                        sx={{
                          color: "#000",
                        }}
                      >
                        {districtData.year}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* CHART */}
          <Box pt={3} width="100%" height={300}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                data={cloneSelectedDistrictDataset?.filter(
                  (data) => data.year >= fromYear && data.year <= toYear
                )}
                layout="vertical"
                barCategoryGap={1}
              >
                <XAxis
                  type="number"
                  hide
                  domain={() => {
                    let filteredData = cloneSelectedDistrictDataset?.filter(
                      (data) => data.year >= fromYear && data.year <= toYear
                    )
                    let min = filteredData![0].percentage
                    let max = filteredData![0].percentage

                    // find min, max
                    for (let i = 0; i < filteredData!.length; i++) {
                      if (min > filteredData![i].percentage) {
                        min = filteredData![i].percentage
                      }

                      if (max < filteredData![i].percentage) {
                        max = filteredData![i].percentage
                      }
                    }

                    return [min - 0.1, max + 0.1]
                  }}
                />
                <YAxis
                  dataKey="year"
                  tickLine={false}
                  stroke="white"
                  strokeWidth={2}
                  domain={[fromYear, toYear]}
                  interval={0}
                  tickCount={1}
                  type="number"
                  style={{
                    padding: "5rem 0",
                  }}
                />
                <Bar
                  dataKey="percentage"
                  fill={theme.palette.primary.main}
                  barSize={20}
                  style={{ margin: 0 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </>
  );
};

export default Content;
