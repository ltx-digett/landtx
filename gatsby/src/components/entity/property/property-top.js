import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import fullscreen from "../../../images/Magnifier.png"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
import FullSlide from "../../fullslide"

const PropertyTopStyle = styled.div`
  .popclose-parent {
    filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
    z-index: 99999999999999;
    position: absolute;
    top: 40px;
    right: 40px;
  }
  .popclose {
    height: 60px !important;
    width: 60px !important;
    clip-path: polygon(
      20% 0%,
      0% 20%,
      30% 50%,
      0% 80%,
      20% 100%,
      50% 70%,
      80% 100%,
      100% 80%,
      70% 50%,
      100% 20%,
      80% 0%,
      50% 30%
    );
    background-color: white;
    cursor: pointer;
  }
  h1 {
    display: inline-block;
    margin-top: 0px;
  }
  .status {
    font-style: italic;
    margin-left: 10px;
  }
  ul.details {
    padding: 0px;
    margin: 0px;
    margin-bottom: 40px;
    li {
      list-style: none;
      margin-bottom: 10px;
      a {
        color: ${variable.black};
        text-decoration: none;
      }
    }
  }
  .blue-cta-prop {
    color: white;
    padding: 15px 20px;
    text-decoration: none;
    display: block;
    background: ${variable.steelBlue};
    margin-bottom: 20px;
    text-align: center;
  }
  .top-property-container {
    padding-top: 72px;
    padding-bottom: 72px;
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
      width: 35px;
      height: 35px;
      cursor: pointer;
      bottom: 30px;
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
    padding: 0px;
  }
  .alice-carousel__dots-item {
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.75);
    &.__active {
      background-color: rgba(255, 255, 255, 0.4) !important;
    }
  }
  .alice-carousel__dots-item:hover {
    background-color: rgba(255, 255, 255, 0.75);
  }
  .alice-carousel__dots {
    bottom: 20px;
    margin: 0px;
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
    const content = (
      <div>
        <FullSlide slideshow={slideshow}></FullSlide>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={e => {
              this.closePopupbox(e)
            }}
          ></div>
        </div>
      </div>
    )
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {},
    })
  }
  closePopupbox(e) {
    PopupboxManager.close({
      fadeInSpeed: 10,
    })
  }
  render() {
    const { property } = this.props
    console.log(property)
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
            {property.status && (
              <span className="status">{property.status}</span>
            )}
            <ul className="details">
              {property.acres && (
                <li>
                  {property.acres} acres in {property.county} County
                </li>
              )}
              {property.price && <li>{formatter.format(property.price)}</li>}
              {property.brochure && (
                <li>
                  <a className="brochure" href={property.brochure.asset.url}>
                    Download Property Brochure
                  </a>
                </li>
              )}
              <li>
                <a className="share" href="#">
                  Share Listing
                </a>
              </li>
            </ul>
            <a className="blue-cta-prop" href="">
              Request a Bound Package
            </a>
            <a className="blue-cta-prop" href="">
              Ask About this Property
            </a>
          </div>
          <div className="top-details-right">
            <AliceCarousel
              autoPlay
              mouseDragEnabled
              buttonsDisabled
              autoPlayInterval={5000}
              duration={1000}
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
