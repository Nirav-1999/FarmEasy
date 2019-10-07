import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import CloudOff from "@material-ui/icons/CloudOff";
import CloudQueue from "@material-ui/icons/CloudQueue";
import CloudCircle from "@material-ui/icons/CloudCircle";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { bugs, website, server } from "variables/general.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEditHttp } from "../../Hooks/editHttp";
import { usePostHttp } from "../../Hooks/postHttp";
import { useGetHttp } from "../../Hooks/getHttp";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

var Chartist = require("chartist");
const useStyles = makeStyles(styles);

const useStyles2 = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
    zIndex: 1000,
  },
  chat: {
    position: 'fixed',
    right: 50,
    bottom: 100,
    zIndex: 1000,
    border: 0
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const classes2 = useStyles2();

  const [values, setValues] = React.useState('BIHAR');
  const [circular, setCircular] = React.useState(false);
  const [year, setYear] = React.useState();
  const [year_rain_annually, setYearRain] = React.useState();
  const [year_rain_monthly, setMonthRain] = React.useState();
  const [predicted_rain, setPredictedRain] = React.useState();

  const [message, fetchCall] = useEditHttp();
  const [yearRain, fetchPostCall] = usePostHttp();
  const [messageGet, fetchGetCall] = useGetHttp();

  const [yearData, setGraphData] = React.useState();
  const [regions, setRegions] = React.useState();
  const [display, setDisplay] = React.useState(false);
  const [avgValues,setAvgValues] = React.useState();

  const handleFab = event => {
    setDisplay(!display);
  }
  const handleChange = async event => {
    setValues(event.target.value);
    const payload = {
      region: event.target.value 
    };
    const rainData = await fetchPostCall(
      `/graph/yearly_rain/`,
      JSON.stringify(payload)
    );

    const payload2 = {
      region: 'SUBDIVISION_' +event.target.value 
    };
    const predictedRain = await fetchPostCall(
      `/graph/predicted_rain/`,
      JSON.stringify(payload2)
    );

    console.log(predictedRain);

    setYearRain(rainData);
    setPredictedRain(predictedRain);
    console.log(rainData.Rainfall);
  };

  const handleChangeYear = async event => {
    setYear(event.target.value);
    const payload = {
      Region: values,
      Year: event.target.value
    };
    const monthlyRainData = await fetchPostCall(
      `/graph/monthly_rainfall`,
      JSON.stringify(payload)
    );
    let temp = [];
    Object.values(monthlyRainData.Monthly_Rain).map(item => temp.push(item));
    let temp2 = [];
    temp.map(item => item.map(result => temp2.push(result)));
    console.log(temp2);
    setMonthRain(temp2);
    console.log([year_rain_monthly]);
  };

  React.useEffect(() => {
    fetchCall(`/graph/regions`);
    setRegions(message);
    fetchGetCall(`/graph/range`);
    setAvgValues(messageGet);
  }, []);
  console.log(avgValues);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
              <CloudOff />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize: '18px!important'}}>Below 500mm</p>
            </CardHeader>
            <CardBody>
              <span style={{color: 'black'}}>HARYANA & DELHI </span> , <span> </span>
              <span style={{color: 'black'}}>WEST RAJASTHAN</span>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
              <CloudQueue />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize: '18px!important'}}>500 - 1000 mm</p>
           
            </CardHeader>
            <CardBody>
            <span style={{color: 'black'}}>UTTAR PRADESH</span>, <span> </span>
              <span style={{color: 'black'}}>PUNJAB</span> , <span> </span>
              <span style={{color: 'black'}}>SAURASHTRA & KUTCH</span>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
               <CloudCircle />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize: '18px!important'}}>1000 - 1500 mm</p>
            
            </CardHeader>
            <CardBody>
            <span style={{color: 'black'}}>ORISSA</span>, <span> </span>
             <span style={{color: 'black'}}>VIDARBHA</span>, <span> </span>
             <span style={{color: 'black'}}>CHHATTISGARH</span>, <span> </span>
             <span style={{color: 'black'}}>BIHAR</span>, <span> </span>

            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
               <Cloud />
              </CardIcon>
              <p className={classes.cardCategory} style={{fontSize: '18px!important'}}>Above 1500mm</p>
            </CardHeader>
            <CardBody>
            <span style={{color: 'black'}}>ARUNACHAL PRADESH</span>, <span> </span>
            <span style={{color: 'black'}}>KONKAN & GOA</span>, <span> </span>
            <span style={{color: 'black'}}>ASSAM & MEGHALAYA</span>, <span> </span>
            </CardBody>
          
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer style={{ justifyContent: "center", textAlign: "center" }}>
        <GridItem
          xs={6}
          style={{
            display: "flex",
            // justifyContent: "center",
            marginBottom: "20px!important"
          }}
        >
          {/* <h3 style={{color: 'rgba(0,0,0,0.9)', fontWeight: 500}}>Select Your Region To Predict Rainfall</h3> */}
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ minWidth: 400, marginBottom: 30 }}
          >
            <InputLabel htmlFor="outlined-age-simple">
              Select Region To Predict Rainfall
            </InputLabel>
            <Select
              value={values}
              onChange={handleChange}
              // labelWidth={labelWidth}
              inputProps={{
                name: "Region",
                id: "outlined-age-simple"
              }}
            >
              {message &&
                message.map(item => <MenuItem value={item}>{item}</MenuItem>)}
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={6}>{values && <p>Showing Results For  {values}  Region</p>}</GridItem>
        <GridItem xs={10} style={{ textAlign: "center" }}>
          {circular && <CircularProgress className={classes.progress} />}
        </GridItem>
        {!circular && year_rain_annually && (
          <GridItem xs={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "2003",
                      "2004",
                      "2005",
                      "2006",
                      "2007",
                      "2008",
                      "2009",
                      "2010",
                      "2011",
                      "2012",
                      "2013",
                      "2014",
                      "2015",
                      "2016",
                      "2017",
                      "2018"
                    ],
                    series: [year_rain_annually.Rainfall]
                  }}
                  type="Line"
                  options={{
                    lineSmooth: Chartist.Interpolation.cardinal({
                      tension: 0
                    }),
                    low: Math.min(...year_rain_annually.Rainfall),
                    high: Math.max(...year_rain_annually.Rainfall) + 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                    chartPadding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    },
                    height: 450
                  }}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody style={{ display: "flex" }}>
                <h4
                  className={classes.cardTitle}
                  style={{ flex: 1, marginTop: 10 }}
                >
                  Previous Rainfall of last 15 years
                </h4>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  style={{ minWidth: 250 }}
                >
                  <InputLabel htmlFor="outlined-age-simple">
                    View Single Year Analysis
                  </InputLabel>
                  <Select
                    value={year}
                    onChange={handleChangeYear}
                    // labelWidth={labelWidth}
                    inputProps={{
                      name: "Region",
                      id: "outlined-age-simple"
                    }}
                  >
                    <MenuItem value={2000}>2003</MenuItem>
                    <MenuItem value={2001}>2004</MenuItem>
                    <MenuItem value={2002}>2005</MenuItem>
                    <MenuItem value={2003}>2006</MenuItem>
                    <MenuItem value={2004}>2007</MenuItem>
                    <MenuItem value={2005}>2008</MenuItem>
                    <MenuItem value={2006}>2009</MenuItem>
                    <MenuItem value={2007}>2010</MenuItem>
                    <MenuItem value={2008}>2011</MenuItem>
                    <MenuItem value={2009}>2012</MenuItem>
                    <MenuItem value={2010}>2013</MenuItem>
                    <MenuItem value={2011}>2014</MenuItem>
                    <MenuItem value={2012}>2015</MenuItem>
                    <MenuItem value={2013}>2016</MenuItem>
                    <MenuItem value={2014}>2017</MenuItem>
                    <MenuItem value={2015}>2018</MenuItem>
                  </Select>
                </FormControl>
              </CardBody>
            </Card>
          </GridItem>
        )}
       
        {year_rain_annually && year_rain_monthly && (
          <GridItem xs={6}>
            <Card chart>
              <CardHeader color="primary">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "Mai",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec"
                    ],
                    series: [year_rain_monthly]
                  }}
                  type="Bar"
                  options={{
                    axisX: {
                      showGrid: false
                    },
                    low: 0,
                    high: Math.max(...year_rain_monthly) + 10,
                    height: 450,
                    chartPadding: {
                      top: 0,
                      right: 5,
                      bottom: 0,
                      left: 0
                    }}}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Rainfall Analysis of the year {year + 3}
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        )}

        {!circular && predicted_rain && (
                  <GridItem xs={12}>
                    <Card chart>
                      <CardHeader color="warning">
                        <ChartistGraph
                          className="ct-chart"
                          data={{ labels: [
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "Mai",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                            "Oct",
                            "Nov",
                            "Dec"
                          ],
                          series: [[predicted_rain['months_JAN'][0],
                          predicted_rain['months_FEB'][0],
                          predicted_rain['months_MAR'][0],
                          predicted_rain['months_APR'][0],  
                          predicted_rain['months_MAY'][0],
                          predicted_rain['months_JUN'][0],
                          predicted_rain['months_JUL'][0],
                          predicted_rain['months_AUG'][0],
                          predicted_rain['months_SEP'][0],
                          predicted_rain['months_OCT'][0],
                          predicted_rain['months_NOV'][0],
                          predicted_rain['months_DEC'][0],   ]]}}
                          
                          type="Bar"
                          options={emailsSubscriptionChart.options}
                          responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                          listener={emailsSubscriptionChart.animation}
                        />
                      </CardHeader>
                      <CardBody style={{margin: '12px 0px',alignItems: 'center'}}>
                        <h4 className={classes.cardTitle} >
                          Rainfall Prediction of the year 2020
                        </h4>
                      </CardBody>
                    </Card>
                  </GridItem>
                )}
      </GridContainer>
      <Fab color="primary" aria-label="add" className={classes2.fab} onClick={handleFab}>
        <AddIcon />
      </Fab>
      { display && <iframe
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/66399058-a9e5-496a-9f33-3a3268e4a7b3"
        className={classes2.chat}
      ></iframe>}

      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}
    </div>
  );
}
