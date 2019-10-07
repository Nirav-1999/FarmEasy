import React, { Component } from "react";
import Slider from "../../components/Carousel/Slider";
import pic1 from "../../../src/assets/img/img/1.png";
import pic2 from "../../../src/assets/img/img/2.png";
import pic3 from "../../../src/assets/img/img/3.png";
import pic4 from "../../../src/assets/img/img/4.jpg";
import pic5 from "../../../src/assets/img/img/5.jpg";
import pic6 from "../../../src/assets/img/img/6.png";
import pic7 from "../../../src/assets/img/img/7.png";
import pic8 from "../../../src/assets/img/img/8.jpg";
import pic9 from "../../../src/assets/img/img/9.png";
import pic10 from "../../../src/assets/img/img/10.jpg";

const photos_1 = [
  `${pic1}`,
  `${pic2}`,
  `${pic3}`,
  `${pic4}`,
  `${pic5}`,
  `${pic6}`,
  `${pic7}`,
  `${pic8}`,
  `${pic9}`,
  `${pic10}`
];

export class Gallery extends Component {
  render() {
    return (
        <div>
      <Slider
        photos={photos_1}
        name="RainFall Distribution"
        props={this.props}
        link="personal-care"
        />
        </div>
    );
  }
}
