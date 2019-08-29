import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import * as variable from "../components/variables"
import { Slide } from "react-slideshow-image"

const FullSlideStyle = styled.div``

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
}

class FullSlide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }

  render() {
    return (
      <div>
        <FullSlideStyle>
          <Slide {...properties}>
            {this.props.slideshow.map((slide, index) => (
              <div key={index} className="each-slide-full">
                <div className="slide-full">
                  <img src={slide.asset.url} />
                </div>
              </div>
            ))}
          </Slide>
        </FullSlideStyle>
      </div>
    )
  }
}

export default FullSlide
