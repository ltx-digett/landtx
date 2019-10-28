import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import * as variable from "../components/variables"
import { Slide } from "react-slideshow-image"
import Img from "gatsby-image"
import { Fade } from "react-slideshow-image"

const FullSlideStyle = styled.div`
  button {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 9999999999;
  }
`

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
  autoplay: false,
}

class FullSlide extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      showInfo: false,
    }
  }

  componentDidMount() {
    this.ref.current.goTo(this.props.index - 1)
  }
  componentDidUpdate() {
    this.ref.current.goTo(this.props.index - 1)
  }

  render() {
    return (
      <div>
        <FullSlideStyle>
          <Fade {...properties} ref={this.ref}>
            {this.props.slideshow.map((slide, index) => (
              <div key={index} className="each-slide-full">
                <div className="slide-full">
                  <Img fluid={slide.asset.fluid} />
                </div>
              </div>
            ))}
          </Fade>
        </FullSlideStyle>
      </div>
    )
  }
}

export default FullSlide
