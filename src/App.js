import React, { Component, Fragment } from "react";
import img1 from "./assets/images/68493.svg";
import img2 from "./assets/images/coniglio_rabbit_small.svg";
import img3 from "./assets/images/beauty-bloom-blue-67636.jpg";
import img4 from "./assets/images/Services2.jpg";

class App extends Component {
  render() {
    return (
      <Fragment>
        Art
        <img src={img1} />
        <img src={img2} />
        <img src={img3} />
        <img src={img4} />
      </Fragment>
    );
  }
}

export default App;
