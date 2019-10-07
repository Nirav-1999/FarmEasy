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
import { Helmet } from "react-helmet";

import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { usePostHttp } from "../../Hooks/postHttp";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import "./style.css";
import { Button } from "@material-ui/core";
import { crops } from "../../variables/crops";
import { setSourceMapRange } from "typescript";

const useStyles = makeStyles(styles);

const rain = 500;
const useStyles2 = makeStyles(theme => ({
  fab: {
    position: "fixed",
    right: 0,
    bottom: 0,
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
    zIndex: 1000
  },
  chat: {
    position: "fixed",
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
  const [values, setValues] = React.useState();
  const [regions, setRegions] = React.useState();
  const [predicted_rain, setPredictedRain] = React.useState();

  const [circular, setCircular] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [year, setYear] = React.useState();
  const [message, fetchCall] = useEditHttp();
  const [newCrops, setCrops] = React.useState();
  const [sumRain, setSumRain] = React.useState();
  const [yearRain, fetchPostCall] = usePostHttp();

  const handleChange = async event => {
    setValues(event.target.value);
    const payload2 = {
      region: "SUBDIVISION_" + event.target.value
    };
    const predictedRain = await fetchPostCall(
      `/graph/predicted_rain/`,
      JSON.stringify(payload2)
    );

    console.log(predictedRain);

    setPredictedRain(predictedRain);
    let sum =
     predictedRain["months_JAN"][0] +
     predictedRain["months_FEB"][0] +
     predictedRain["months_MAR"][0] +
     predictedRain["months_APR"][0] +
     predictedRain["months_MAY"][0] +
     predictedRain["months_JUN"][0] +
     predictedRain["months_JUL"][0] +
     predictedRain["months_AUG"][0] +
     predictedRain["months_SEP"][0] +
     predictedRain["months_OCT"][0] +
     predictedRain["months_NOV"][0] +
     predictedRain["months_DEC"][0];

    setSumRain(sum);
    console.log(sum);
    const temp = [];
    Object.values(crops).map(item => {
      if (item.min_rain < sum && sum < item.max_rain) {
        temp.push(item.crop);
      }
    });
    setCrops(temp);
  };

  const handleFab = event => {
    setDisplay(!display);
  };

  const handleSubmitSoil = crop => {
    console.log(crop);
    let searchString = `${crop} soil`;
    let elements = window.google.search.cse.element.getAllElements();
    Object.keys(elements).forEach(element => {
      elements[element].execute(searchString);
    });
  };

  const handleSubmitRainfall = crop => {
    console.log(crop);
    let searchString = `${crop} Rainfall Required `;
    let elements = window.google.search.cse.element.getAllElements();
    Object.keys(elements).forEach(element => {
      elements[element].execute(searchString);
    });
  };

  const handleSubmitTemp = crop => {
    console.log(crop);
    let searchString = `${crop} Temperature Range`;
    let elements = window.google.search.cse.element.getAllElements();
    Object.keys(elements).forEach(element => {
      elements[element].execute(searchString);
    });
  };

  const handleSubmitDiease = crop => {
    console.log(crop);
    let searchString = `${crop} Dieases`;
    let elements = window.google.search.cse.element.getAllElements();
    Object.keys(elements).forEach(element => {
      elements[element].execute(searchString);
    });
  };

  React.useEffect(() => {
    fetchCall(`/graph/regions`);
    setRegions(message);
    console.log(crops);
  }, []);
  return (
    <div>
      <GridContainer style={{ justifyContent: "center", textAlign: "center" }}>
        <GridItem
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px!important"
          }}
        >
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ minWidth: 600, marginBottom: 30 }}
          >
            <InputLabel htmlFor="outlined-age-simple">
              Select Region For Farming
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
        <GridItem xs={6}>
          <div
            class="gcse-search"
            style={{ visibility: "hidden!important" }}
          ></div>
        </GridItem>

        <GridItem xs={12} style={{ textAlign: "center" }}>
          {circular && <CircularProgress className={classes.progress} />}
        </GridItem>
        {!circular && predicted_rain && (
          <GridItem xs={12}>
            <Card chart>
              <CardHeader color="warning">
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
                    series: [
                      [
                        predicted_rain["months_JAN"][0],
                        predicted_rain["months_FEB"][0],
                        predicted_rain["months_MAR"][0],
                        predicted_rain["months_APR"][0],
                        predicted_rain["months_MAY"][0],
                        predicted_rain["months_JUN"][0],
                        predicted_rain["months_JUL"][0],
                        predicted_rain["months_AUG"][0],
                        predicted_rain["months_SEP"][0],
                        predicted_rain["months_OCT"][0],
                        predicted_rain["months_NOV"][0],
                        predicted_rain["months_DEC"][0]
                      ]
                    ]
                  }}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody style={{ margin: "12px 0px", alignItems: "center" }}>
                <h4 className={classes.cardTitle}>
                  Rainfall Prediction of the year 2020
                </h4>
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
      <Helmet>
        <script
          async
          src="https://cse.google.com/cse.js?cx=013071202003806884029:5zihfoylkih"
        ></script>
      </Helmet>
      {/* <form
        method="get"
        title="Search Form"
        action="https://cse.google.com/cse.js?cx=013071202003806884029:5zihfoylkih"
      >
        <div class="gcse-search">
          <input
            type="text"
            id="q"
            name="q"
            title="Search this site"
            alt="Search Text"
            maxlength="256"
          />
          <input
            type="hidden"
            id="cx"
            name="cx"
            value="013071202003806884029:5zihfoylkih"
          />
          <input
            type="image"
            id="searchSubmit"
            name="submit"
            src="https://www.flaticon.com/free-icon/active-search-symbol_34148"
            alt="Go"
            title="Submit Search Query"
          />
        </div>
      </form>
      <button onClick={handleSubmit}>Submit</button> */}
      {values && newCrops && (
        <div>
          {" "}
          <h3>Suitable Crops For {values} For Annual Rainfall {sumRain} mm</h3>
          <GridContainer>
            {newCrops.map((item, id) => (
              <GridItem xs={12} sm={12} md={6} key={id}>
                <Card>
                  <CardHeader
                    style={{
                      backgroundImage: " url(" + crops[`${item}`].url + ")",
                      height: 200
                    }}
                  >
                    <h3
                      style={{
                        color: "white",
                        fontWeight: 500,
                        background: "transparent"
                      }}
                    >
                      {item}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={4}>
                        <p>Soil Required</p>
                      </GridItem>
                      <GridItem xs={4} style={{ display: "flex" }}>
                        {crops[`${item}`].soil.map(item => (
                          <p>{item}, </p>
                        ))}
                      </GridItem>
                      <GridItem xs={4}>
                        <Button onClick={handleSubmitSoil.bind(this, item)}>
                          View More
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={4}>
                        <p>Rainfall Range</p>
                      </GridItem>
                      <GridItem xs={4}>
                        {crops[`${item}`].min_rain} -{" "}
                        {crops[`${item}`].max_rain} <span>mm</span>
                      </GridItem>
                      <GridItem xs={4}>
                        <Button onClick={handleSubmitRainfall.bind(this, item)}>
                          View More
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={4}>
                        <p>Temperature Range</p>
                      </GridItem>
                      <GridItem xs={4}>
                        {crops[`${item}`].min_temp} -{" "}
                        {crops[`${item}`].max_temp}{" "}
                        <span>
                          <sup>0 </sup>C
                        </span>
                      </GridItem>
                      <GridItem xs={4}>
                        <Button onClick={handleSubmitTemp.bind(this, item)}>
                          View More
                        </Button>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={4}>
                        <p>Diseases</p>
                      </GridItem>
                      <GridItem xs={4} style={{ display: "flex" }}>
                        {crops[`${item}`].disease.map(item => (
                          <p>{item}, </p>
                        ))}
                      </GridItem>
                      <GridItem xs={4}>
                        <Button onClick={handleSubmitDiease.bind(this, item)}>
                          View More
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </GridContainer>{" "}
        </div>
      )}
      <Fab
        color="primary"
        aria-label="add"
        className={classes2.fab}
        onClick={handleFab}
      >
        <AddIcon />
      </Fab>
      {display && (
        <iframe
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/66399058-a9e5-496a-9f33-3a3268e4a7b3"
          className={classes2.chat}
        ></iframe>
      )}
    </div>
  );
}
