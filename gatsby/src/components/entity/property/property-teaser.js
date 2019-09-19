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
  background-color: ${variable.gray};
  .prop-teaser-bottom {
    padding: 30px 30px 30px 30px;
  }
  .teaser-list {
    padding: 0px;
    margin: 0px;
    li {
      list-style: none;
      margin-bottom: 3px;
    }
  }
  h3 {
    font-size: 28px;
    margin: 0px 0px 10px 0px;
    a {
      text-decoration: none;
      color: ${variable.black};
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    margin-bottom: 15px;
  }
`

class PropertyTeaser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      autoplay: false,
    }
  }
  componentDidMount() {
    console.log(this.state)
  }
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
        <AliceCarousel
          mouseDragEnabled
          buttonsDisabled
          duration={1000}
          stopAutoPlayOnHover={false}
          autoPlay={autoplay}
          autoPlayInterval={1500}
        >
          {property.slideshow.map((slide, index) => (
            // <img src={slide.asset.url + "?w=800"} className="prop-slide" />
            <Img fluid={slide.asset.fluid} className="prop-slide" />
          ))}
        </AliceCarousel>
        <div className="prop-teaser-bottom">
          <h3>
            <Link to={"/property/" + property.slug.current}>
              {property.title}
            </Link>
          </h3>
          <ul className="teaser-list">
            {property.description && <li>{property.description}</li>}
            {property.acres && <li>{property.acres} Acres</li>}
            {property.county && <li>{property.county} County</li>}
            {property.price && <li>{formatter.format(property.price)}</li>}
            {property.status && <li>{property.status}</li>}
          </ul>
        </div>
      </PropertyTeaserStyle>
    )
  }
}

export default PropertyTeaser
