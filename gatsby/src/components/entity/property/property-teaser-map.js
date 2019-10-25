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
      margin-bottom: 5px;
      color: ${variable.black};
    }
  }
  a {
    text-decoration: none;
    color: ${variable.steelBlue};
  }
  h3 {
    font-size: 16px;
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
    console.log(property)
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    })
    return (
      <PropertyTeaserStyle className="prop-teaser">
        {console.log(property)}
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
