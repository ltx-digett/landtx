import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "./layout"
import Container from "./container"
import * as variable from "./variables"
import { Fade } from "react-slideshow-image"
import Img from "gatsby-image"
import static1 from "../images/static1.webp"

const FullStaticSlideStyle = styled.div`
  .images-wrap {
    div {
      // width: 100% !important;
      // max-width: 100%;
    }
  }
  .slide-full-static {
    text-align: center;
  }
  .full-static-caption {
    position: absolute;
    bottom: 0px;
    z-index: 100;
    width: 100%;
    margin-top: 0px;
    border-radius: 0px 0px 7px 7px;
    color: #3f4335;
    background-color: #bab195;
    padding: 15px;
    font-weight: 400;
  }
`

const properties = {
  duration: 5000,
  autoplay: false,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
}

class FullStaticSlide extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      showInfo: false,
    }
  }
  componentDidMount() {
    // if (this.props.index != 1) {
    //   this.ref.current.goTo(this.props.index)
    // }
    console.log(this.props.index)
    this.ref.current.goTo(this.props.index)
  }
  componentDidUpdate() {
    this.ref.current.goTo(this.props.index)
  }
  render() {
    return (
      <div>
        <FullStaticSlideStyle>
          <Fade {...properties} ref={this.ref}>
            {this.props.slideshow.map((slide, index) => (
              <div key={index} className="each-slide-full">
                <div className="slide-full slide-full-static">
                  {/* <Img fluid={slide.image.asset.fluid} /> */}
                  <img src={slide.image.asset.url} />
                  {/* <h3 className="full-static-caption">{slide.caption}</h3> */}
                </div>
              </div>
            ))}
          </Fade>
        </FullStaticSlideStyle>
      </div>
    )
  }
}

export default FullStaticSlide
