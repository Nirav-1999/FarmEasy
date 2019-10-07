import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-multi-carousel";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from '@material-ui/core/styles';
import Lightbox from './Lightbox';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";


const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 30
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  logoImg: {
    height: 400,
    width: 370,
    // minWidth: 250,
    marginBottom: 10,
    marginTop: 10,
    boxShadow: "1px 3px 8px #808080",
    borderRadius: 7,
    [theme.breakpoints.down("sm")]: {
      height: 175,
    boxShadow: "0 0 5px #808080",
    }
  },
  carousel: {
    marginBottom: 45
    // maxWidth: 500
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1400, min: 1100 },
    items: 3
  },
  tableSmall: {
    breakpoint: { max: 1100, min: 768 },    
    items: 2
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1
  }
};


function Slider(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setIndex] = useState(0);

  const modalLightBox = (index) => {
      setIsOpen(true);
      setIndex(index);
  }
  const classes = useStyles();
  const {photos,name,link} = props;
  console.log(photos);
  return (
    <div style={{ maxWidth: 1500, margin: "auto", padding: "15px 20px" }}>
      <div style={{display: 'flex', marginTop: 20, marginBottom: 10,marginRight: 20  }}>
          {name && <div style={{flexGrow: 1,marginLeft: 20}}> 
            <Typography variant="h5" style={{ marginBottom: 0, fontFamily: 'Signika, sans-serif', fontSize: 28,fontWeight: 600 }}>
            {name}
            </Typography>
            <hr
            style={{
                height: 3,
                backgroundColor: "#f58221",
                border: "none",
                borderRadius: 5,
                width: "120px",
                float: 'left'
                }}
                />
            </div>}
         
      </div>
                <GridContainer>
                    {photos.map((item,index) => (
                    <GridItem>
                <div className={classes.logoWrapper} >
                  <img src={item} className={classes.logoImg} alt="logo1" onClick={modalLightBox.bind(this,index)} />
              </div> 
                    </GridItem>
              ))}
                </GridContainer>
            
  
          <Lightbox
            setIndex={setIndex}
            photoIndex={photoIndex}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            photos={photos}
          />
    </div>
  );
}
export default Slider;
