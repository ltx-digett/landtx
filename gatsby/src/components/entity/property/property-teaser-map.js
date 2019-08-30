import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

const PropertyTeaserStyle = styled.div`
  padding: 10px;
  position: relative;
  .teaser-list {
    padding: 0px;
    margin: 0px;
    li {
      list-style: none;
    }
  }
`

class PropertyTeaser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }
  numberWithCommas(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  render() {
    const { property } = this.props
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTeaserStyle className="prop-teaser">
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
        <h3>
          <Link to={"/property/" + property.slug.current}>
            {property.title}
          </Link>
        </h3>
        <ul className="teaser-list">
          {property.acres && <li>{property.acres} Acres</li>}
          {property.county && <li>{property.county} County</li>}
          {property.price && <li>{formatter.format(property.price)}</li>}
          {property.status && <li>{property.status}</li>}
        </ul>
      </PropertyTeaserStyle>
    )
  }
}

export default PropertyTeaser
