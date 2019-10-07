import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import pdf from '../../assets/pdfPrintOut.pdf';
export default function Download() {
  const [from, setFrom] = React.useState();
  const [to, setTo] = React.useState();
  const [filePath, setFilePath] = React.useState();
  const handleChangeFrom = event => {
    setFrom(event.target.value);
  };
  const handleChangeTo = event => {
    setTo(event.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      from: from,
      to: to
    };
    const res = await fetch(`/graph/pdf/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(data);
    setFilePath(data.filepath);
  };
  return (
    <div>
      <h3>Download PDF for annual rainfall</h3>
      <GridContainer>
        <GridItem>
          <TextField
            id="standard-name"
            label="Enter start Year"
            // className={classes.textField}
            style={{ width: 400 }}
            value={from}
            onChange={handleChangeFrom}
            margin="normal"
          />
        </GridItem>
        <GridItem>
          <TextField
            id="standard-name"
            label="Enter End Year"
            // className={classes.textField}
            style={{ width: 400 }}
            value={to}
            onChange={handleChangeTo}
            margin="normal"
          />
        </GridItem>
        <GridItem style={{ alignSelf: "flex-end" }}>
            <Button variant="contained" onClick={handleSubmit}>
            <a
              href={pdf}
              
            >
              Download
          </a>
            </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
