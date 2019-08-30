import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import fullscreen from "../../../images/fullscreen-icon.png"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
import FullSlide from "../../fullslide"

const PropertyTopStyle = styled.div`
  .top-property-container {
    padding-top: 100px;
    padding-bottom: 100px;
    display: flex;
    justify-content: space-between;
    .top-details-left {
      width: 40%;
    }
    .top-details-right {
      width: calc(60% - 40px);
      position: relative;
    }
    .fullscreen {
      width: 50px;
      height: 50px;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.5);
      bottom: 40px;
      padding-left: 2px;
      left: 20px;
      position: absolute;
    }
    .indicators {
      position: relative;
      bottom: 45px;
    }
  }
  .popupbox-content div:not(.nav):not(.indicators) {
    height: 100%;
  }
  .popupbox-content {
    .indicators {
      margin-top: 10px;
      height: 7px;
    }
  }

  @media (max-width: ${variable.tabletWidth}) {
    .top-property-container {
      padding-top: 50px;
      padding-bottom: 50px;
      .top-details-left {
        width: 50%;
      }
      .top-details-right {
        width: calc(50% - 20px);
        position: relative;
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .top-property-container {
      padding-top: 40px;
      padding-bottom: 40px;
      flex-direction: column;
      .top-details-left {
        width: 100%;
      }
      .top-details-right {
        width: 100%;
        position: relative;
      }
    }
  }
`

class PropertyTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }
  openPopupbox(e, slideshow, title) {
    const content = <FullSlide slideshow={slideshow}></FullSlide>
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {
        titleBar: {
          enable: true,
          text: title + " Images",
        },
      },
    })
  }
  render() {
    const { property } = this.props
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTopStyle>
        <PopupboxContainer />
        <Container className="top-property-container">
          <div className="top-details-left">
            <h1>{property.title}</h1>
            <ul>
              {property.acres && (
                <li>
                  {property.acres} acres in {property.county} County
                </li>
              )}
              {property.price && <li>{formatter.format(property.price)}</li>}
              {property.status && <li>{property.status}</li>}
            </ul>
          </div>
          <div className="top-details-right">
            <AliceCarousel
              autoPlay
              mouseDragEnabled
              buttonsDisabled
              autoPlayInterval={5000}
            >
              {property.slideshow.map((slide, index) => (
                <img src={slide.asset.url + "?w=800"} className="prop-slide" />
              ))}
            </AliceCarousel>

            <img
              className="fullscreen"
              src={fullscreen}
              onClick={e => {
                this.openPopupbox(e, property.slideshow, property.title)
              }}
            ></img>
          </div>
        </Container>
      </PropertyTopStyle>
    )
  }
}

export default PropertyTop
