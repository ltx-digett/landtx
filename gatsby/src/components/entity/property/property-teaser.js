import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import Img from "gatsby-image"

const PropertyTeaserStyle = styled.div`
  margin-bottom: 60px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${variable.taupe};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  color: ${variable.black};
  .pending-status {
    color: white !important;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: #9b0000;
    padding: 5px 0px;
    z-index: 10;
    text-align: center;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 22.5px;
    color: ${variable.black};
  }
  a {
    text-decoration: none;
    color: ${variable.black};
  }
  h3 {
    text-decoration: none;
    color: ${variable.black};
  }
  .prop-teaser-bottom {
    padding: 30px 30px 30px 30px;
  }
  .teaser-list {
    padding: 0px;
    margin: 0px;
    li {
      list-style: none;
      margin-bottom: 3px;
      font-weight: bold;
      &.teaser-desciption {
        font-family: Tinos;
        font-style: italic;
        font-weight: normal;
        font-size: 18px;
        margin-bottom: 15px;
      }
    }
  }
  h3 {
    font-size: 36px;
    margin: 0px 0px 0px 0px;
    a {
      text-decoration: none;
      color: ${variable.black};
    }
  }
  .alice-carousel__dots {
    display: flex;
    width: 100%;
    padding: 0px 20px;
    align-items: center;
    justify-content: center;
    margin: 0px 0 15px;
    li.alice-carousel__dots-item {
      margin-right: 10px;
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    margin-bottom: 15px;
  }
`
function numberWithCommas(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

class PropertyTeaser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      autoplay: false,
    }
  }
  componentDidMount() {}
  numberWithCommas(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  onMouseEnter = () => {
    // console.log(this.props.property.id)
    this.props.onMouseEnter(this.props.property)
  }

  componentDidUpdate() {
    {
      if (this.state.showInfo !== true) {
        if (this.props.selected === this.props.property.id) {
          this.setState({ showInfo: true })
        }
      }
    }
    {
      if (this.state.showInfo === true) {
        if (this.props.selected !== this.props.property.id) {
          this.setState({ showInfo: false })
        }
      }
    }
  }

  render() {
    const { property } = this.props
    const { autoplay } = this.state
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTeaserStyle
        className="prop-teaser"
        onMouseEnter={() => this.setState({ autoplay: true })}
        onMouseLeave={() => this.setState({ autoplay: false })}
      >
        {property.status == "Contract Pending" && (
          <div className="pending-status">{property.status}</div>
        )}
        <AliceCarousel
          mouseDragEnabled
          buttonsDisabled
          duration={1000}
          stopAutoPlayOnHover={false}
          autoPlay={autoplay}
          autoPlayInterval={3000}
          fadeOutAnimation
        >
          {property.slideshow.map((slide, index) =>
            // <img src={slide.asset.url + "?w=800"} className="prop-slide" />
            this.props.click == false ? (
              <Img fluid={slide.asset.fluid} className="prop-slide link" />
            ) : (
              <Link to={"/property/" + property.slug.current}>
                <Img fluid={slide.asset.fluid} className="prop-slide no" />
              </Link>
            )
          )}
        </AliceCarousel>
        {this.props.click == false ? (
          <div className="prop-teaser-bottom">
            <h3>{property.title}</h3>
            <ul className="teaser-list">
              {property.description && (
                <li className="teaser-desciption">{property.description}</li>
              )}
              {property.acres && (
                <li>{numberWithCommas(property.acres)} Acres</li>
              )}
              {property.county && <li>{property.county} County</li>}
              {property.price && <li>{formatter.format(property.price)}</li>}
              {property.soldDate && <li>Sold {property.soldDate}</li>}
            </ul>
          </div>
        ) : (
          <Link to={"/property/" + property.slug.current}>
            <div className="prop-teaser-bottom">
              <h3>{property.title}</h3>
              <ul className="teaser-list">
                {property.description && (
                  <li className="teaser-desciption">{property.description}</li>
                )}
                {property.acres && (
                  <li>{numberWithCommas(property.acres)} Acres</li>
                )}
                {property.county && <li>{property.county} County</li>}
                {property.price && <li>{formatter.format(property.price)}</li>}
              </ul>
            </div>
          </Link>
        )}
      </PropertyTeaserStyle>
    )
  }
}

export default PropertyTeaser
