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
import TextField from "@material-ui/core/TextField";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";
import { crops } from "../../variables/crops";
import Chip from "@material-ui/core/Chip";
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
export default function Feed() {
  const classes = useStyles();
  const classes2 = useStyles2();
  const [values, setValues] = React.useState();
  const [regions, setRegions] = React.useState();
  const [color, setColor] = React.useState("Rainfall");
  const [circular, setCircular] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [find, setFind] = React.useState("Rainfall");
  const [message, fetchCall] = useEditHttp();
  const [newCrops, setCrops] = React.useState();
  const [input, setInput] = React.useState();
  const handleChange = event => {
    setValues(event.target.value);
    const temp = [];
    Object.values(crops).map(item => {
      if (item.min_rain < rain && rain < item.max_rain) {
        temp.push(item.crop);
      }
    });
    setCrops(temp);
  };

  const handleFab = event => {
    setDisplay(!display);
  };

  const handleChangeInput = event => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    let value = input;
    console.log(value.split(" ").join("-"));
    setFind(
      value
        .trim()
        .split(" ")
        .join("-")
    );
    fetch(
      `https://newsapi.org/v2/everything?q=${find}-in-india&apiKey=e98bd0f1799942cb96a52b78134fa751`
    )
      .then(res => res.json())
      .then(data => setRegions(data));
  };

  const handleClick = obj => {
    setFind(obj);
    setColor(obj);
    fetch(
      `https://newsapi.org/v2/everything?q=${obj}-in-india&apiKey=e98bd0f1799942cb96a52b78134fa751`
    )
      .then(res => res.json())
      .then(data => setRegions(data));
    console.log(regions);
  };

  React.useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=rain-in-india&apiKey=e98bd0f1799942cb96a52b78134fa751`
    )
      .then(res => res.json())
      .then(data => setRegions(data));
    console.log(regions);
  }, []);
  return (
    <div>
      <GridContainer style={{ justifyContent: "center", textAlign: "center" }}>
        {/* <GridItem xs={12}>
          <div
            class="gcse-search"
            style={{ visibility: "hidden!important" }}
          ></div>
        </GridItem> */}
      </GridContainer>
      <Helmet>
        <script
          async
          src="https://cse.google.com/cse.js?cx=013071202003806884029:5zihfoylkih"
        ></script>
      </Helmet>
      <GridContainer>
        <GridItem>
          <TextField
            id="standard-name"
            label="Search Latest News"
            // className={classes.textField}
            style={{ width: 400 }}
            value={input}
            onChange={handleChangeInput}
            margin="normal"
          />
        </GridItem>
        <GridItem style={{ alignSelf: "flex-end" }}>
          <Chip
            variant="contained"
            label="submit"
            onClick={handleSubmit}
          ></Chip>
        </GridItem>
      </GridContainer>
      {/* <br /> */}
      <p>Related Searches</p>
      <div>
        <Chip
          label="Rainfall"
          onClick={handleClick.bind(this, "Rainfall")}
          color={color === "Rainfall" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
        <Chip
          label="Farmers"
          onClick={handleClick.bind(this, "Farmers")}
          color={color === "Farmers" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
        <Chip
          label="Agriculture"
          onClick={handleClick.bind(this, "Agriculture")}
          color={color === "Agriculture" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
        <Chip
          label="Crop Diseases"
          onClick={handleClick.bind(this, "Crop-Diseases")}
          color={color === "Crop-Diseases" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
        <Chip
          label="Crop Protection"
          onClick={handleClick.bind(this, "Crop-Protection")}
          color={color === "Crop-Protection" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
        <Chip
          label="Irrigation"
          onClick={handleClick.bind(this, "Irrigation")}
          color={color === "Irrigation" ? "Primary" : ""}
          style={{ marginRight: 10 }}
        />
      </div>

      <h4>Viewing Latest News on {find}</h4>
      <GridContainer>
        {regions &&
          regions.articles.map(item => (
            // eslint-disable-next-line react/jsx-key
            <GridItem xs={12} sm={12} md={6}>
              <Card style={{ height: 520 }}>
                <CardHeader>
                  <a href={item.url}>
                    {" "}
                    <img
                      src={item.urlToImage}
                      style={{ width: "100%", height: 250 }}
                    />{" "}
                  </a>
                  <p style={{ float: "right" }}>src: {item.source.name}</p>
                  {/* <img src={crops[`${item}`].url}  style={{width: 100, height: 100}}/> */}
                </CardHeader>
                <CardBody>
                  <h5
                    style={{
                      marginTop: "-10px",
                      color: "black!important",
                      fontWeight: 500,
                      background: "transparent"
                    }}
                  >
                    {item.title}
                  </h5>
                  {/* <p>{item.description}</p> */}
                  <p>{item.content}</p>
                </CardBody>
              </Card>
            </GridItem>
          ))}
      </GridContainer>

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
