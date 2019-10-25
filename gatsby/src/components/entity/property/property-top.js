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
import Img from "gatsby-image"
import { FaEnvelope } from "react-icons/fa"
import { ShareButton } from "react-custom-share"
const PropertyTopStyle = styled.div`
  background-color: #ddd9cb;
  .share {
    -webkit-appearance: none;
    border: 0px;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    padding: 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #40413d;
    background-color: transparent;
    svg {
      margin-right: 10px;
    }
  }
  .title-status {
    clear: both;
    h1 {
      width: calc(100% - 60px);
      display: inline;
      margin-right: 10px;
      color: #40413d;
    }
    .status {
      color: #40413d;
    }
  }
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
  }
  ul.details {
    padding: 0px;
    margin: 0px;
    margin-bottom: 40px;
    color: #40413d;
    li {
      list-style: none;
      margin-bottom: 10px;
      &.top-desc {
        font-family: Tinos;
        font-style: italic;
        font-weight: normal;
        font-size: 22.5px;
        margin-bottom: 25px;
      }
      a {
        color: #40413d;
        text-decoration: none;
      }
    }
  }
  .brown-cta-prop {
    color: white !important;
    padding: 15px 20px;
    text-decoration: none;
    display: block;
    background: ${variable.darkBrown};
    margin-bottom: 20px;
    text-align: center;
    border-radius: 5px;
  }
  .top-property-container {
    padding-top: 72px;
    padding-bottom: 72px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
  .broc {
    margin-top: 40px;
  }
  .more-info {
    cursor: pointer;
  }
  }
  .prop-contact-modal{
    display:none;
    background-color: rgba(59, 62, 57, 0.9) !important;
    position:fixed;
    top:0;
    width:100%;
    height:100%;
    z-index:100000000000;
  }
  .contact-form-show{
    display:block;
  }
  .address-bound{
    display:none;
    &.address-bound-show{
      display:block;
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
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      .top-details-left {
        width: 100%;
      }
      .top-details-right {
        width: 100%;
        position: relative;
      }
    }
    .title-details {
      padding: 0px 15px;
    }
  }
`

class PropertyTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      formShow: false,
      addressShow: false,
    }
  }

  openForm = () => {
    this.setState({
      formShow: true,
    })
  }

  closeForm = () => {
    this.setState({
      formShow: false,
    })
  }

  showAddress = () => {
    this.setState(prevState => ({
      showAddress: !prevState.showAddress,
    }))
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
    const { property, large } = this.props
    console.log(property)
    const shareButtonProps = {
      url: "https://landtx.netlify.com/property/" + property.slug.current,
      network: "Email",
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTopStyle>
        <div
          className={
            this.state.formShow
              ? "contact-form-show prop-contact-modal"
              : "prop-contact-modal"
          }
        >
          <div className="prop-contact-container">
            <form
              className="property-contact"
              name="property-contact"
              method="post"
              netlify-honeypot="bot-field"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="property-contact" />
              <p hidden>
                <label htmlFor="bot-field">
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </p>
              <div class="form-group">
                <label for="name" class="lb-name">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  data-required="true"
                  data-interactive="true"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email" class="lb-email">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  data-required="true"
                  data-interactive="true"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="hidden"
                  name="property"
                  id="property"
                  class="form-control"
                  data-required="true"
                  data-interactive="true"
                  value={property.title}
                  required
                />
              </div>
              <div class="form-group">
                <label for="name" class="question">
                  What is your question about this property? *
                </label>
                <textarea
                  rows="5"
                  name="question"
                  id="question"
                  class="form-control"
                  data-required="true"
                  data-interactive="true"
                  required
                />
              </div>
              <div class="form-group opt">
                <label for="name" class="opt">
                  Opt in
                </label>
                <div className="opt-in">
                  <input type="checkbox" id="opt-in" name="opt-in" />
                  <div className="opt-label">
                    Yes, sign me up for quarterly updates!
                  </div>
                </div>
              </div>
              <div class="form-group opt">
                <div className="opt-in">
                  <input
                    type="checkbox"
                    id="bound"
                    name="bound"
                    onClick={e => {
                      this.showAddress(e)
                    }}
                  />
                  <div className="opt-label">Send me a bound package</div>
                </div>
              </div>
              <div
                className={
                  this.state.showAddress
                    ? "address-bound form-group address-bound-show"
                    : "address-bound form-group"
                }
              >
                <label for="name" class="question">
                  Address to send bound package *
                </label>
                <textarea
                  rows="5"
                  name="address"
                  id="address"
                  class="form-control"
                  data-required="true"
                  data-interactive="true"
                />
              </div>
              <div>
                <button type="submit" class="btn btn-submit">
                  Submit
                </button>
              </div>
            </form>
            <div className="popclose-parent">
              <div
                className="popclose"
                onClick={e => {
                  this.closeForm(e)
                }}
              ></div>
            </div>
          </div>
        </div>

        <Container className="top-property-container">
          <div className="top-details-left">
            <div className="title-details">
              <div className="title-status">
                <h1>{property.title}</h1>
              </div>
              <ul className="details">
                {property.description && (
                  <li className="top-desc">{property.description}</li>
                )}
                {property.acres && (
                  <li>
                    {property.acres} acres in {property.county} County
                  </li>
                )}
                {property.price && <li>{formatter.format(property.price)}</li>}
                {property.status && (
                  <li className="status">{property.status} Listing</li>
                )}
                <li>
                  <ShareButton {...shareButtonProps} className="share">
                    <FaEnvelope /> Share Listing
                  </ShareButton>
                </li>
                {property.brochure && (
                  <li className="broc">
                    <a
                      className="brochure brown-cta-prop"
                      href={property.brochure.asset.url}
                    >
                      Download Property Brochure
                    </a>
                  </li>
                )}
                {property.flipbook && (
                  <li>
                    <a
                      className="flipbook brown-cta-prop"
                      href={property.flipbook}
                    >
                      Open Flipbook
                    </a>
                  </li>
                )}
                {property.status == "Active" && (
                  <li
                    className="brown-cta-prop more-info"
                    onClick={e => {
                      this.openForm(e, property.title)
                    }}
                  >
                    Ask Us For More Information
                  </li>
                )}
              </ul>
            </div>
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
                <Img fluid={slide.asset.fluid} className="prop-slide" />
              ))}
            </AliceCarousel>

            <img
              className="fullscreen"
              src={fullscreen}
              onClick={e => {
                this.openPopupbox(e, large.slideshow, property.title)
              }}
            ></img>
          </div>
        </Container>
      </PropertyTopStyle>
    )
  }
}

export default PropertyTop
