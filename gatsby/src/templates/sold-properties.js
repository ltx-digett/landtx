import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import Marker from "../components/marker"
import PropertyTeaser from "../components/entity/property/property-teaser"
import * as variable from "../components/variables"
import { Helmet } from "react-helmet"

// const Marker = ({ property }) => <div className="marker">{property.title}</div>

const SoldPropertiesStyle = styled.div`
  .marker {
    cursor: pointer;
  }
  background-color: rgba(33, 35, 30, 0.9);
  padding-top: 60px;
  h1 {
    margin-top: 0px;
    padding: 0px 15px;
  }
  .properties-teaser-container-flex {
    display: flex;
    padding-bottom: 40px;
    flex-wrap: wrap;
    .prop-teaser {
      margin-bottom: 40px;
      width: calc((100%) / 3 - 14px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .properties-teaser-container {
      .prop-teaser {
        width: calc(50% - 15px);
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .properties-teaser-container {
      flex-direction: column;
      padding: 0px;
      .prop-teaser {
        width: calc(100%);
      }
    }
  }
`

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        googleMapsKey
        title
        url
      }
    }
    property: allSanityProperty(
      filter: { status: { eq: "Sold" } }
      sort: { fields: price, order: DESC }
    ) {
      nodes {
        title
        id
        price
        status
        acres
        county
        description
        brochure {
          asset {
            url
          }
        }
        slideshow {
          asset {
            url
            fluid(maxWidth: 400, maxHeight: 300) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`

class SoldPropertiesPostTemplate extends React.Component {
  state = {
    selections: "",
    center: {
      lat: 30.759539,
      lng: -99.222336,
    },
    zoom: 11,
  }
  static defaultProps = {
    center: {
      lat: 30.759539,
      lng: -99.222336,
    },
    zoom: 8,
  }
  onChildToggle = props => {
    var id = props.id
    var selections = this.state.selections

    selections = id
    this.setState({
      selections: selections,
    })
    this.setState({
      center: {
        lat: props.location.lat,
        lng: props.location.lng,
      },
    })
  }
  onChildHover = props => {
    console.log(props)
    var id = props.id
    var selections = this.state.selections

    selections = id
    // console.log(props)
    this.setState({
      selections: selections,
    })
    this.setState({
      center: {
        lat: props.location.lat,
        lng: props.location.lng,
      },
    })
  }

  // _onClick = ({ x, y, lat, lng, event }) => {
  //   console.log(this)
  //   this.hide()
  // }
  render() {
    const { properties, googleMapsKey, site } = this.props
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sold Properties | {site.title}</title>
          <meta
            property="og:description"
            content="Investment, recreational, ranch and farmland in an area comprising 45 counties in central Texas."
          />
          <link rel="canonical" href={site.url + "/sold-properties"} />
        </Helmet>
        <SoldPropertiesStyle>
          <Container className="properties-teaser-container">
            <h1>Sold Properties</h1>
            <div className="properties-teaser-container-flex">
              {properties.map((property, index) => (
                <PropertyTeaser
                  key={index}
                  property={property}
                  onMouseEnter={this.onChildHover}
                />
              ))}
            </div>
          </Container>
        </SoldPropertiesStyle>
      </Layout>
    )
  }
}

const SoldProperties = ({ data }) => {
  const { nodes } = data.property
  const { googleMapsKey } = data.site.siteMetadata
  const { siteMetadata } = data.site

  return (
    <SoldPropertiesPostTemplate
      properties={nodes}
      googleMapsKey={googleMapsKey}
      site={siteMetadata}
    />
  )
}

export default SoldProperties
