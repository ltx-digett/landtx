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

const PropertiesStyle = styled.div`
  .properties-teaser-container-container {
    background-color: rgba(33, 35, 30, 0.9);
    padding-top: 40px;
  }
  .marker {
    cursor: pointer;
  }
  h1 {
    margin-top: 0px;
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
        margin-bottom: 40px;
        width: calc((100%) / 2 - 20px);
        margin-right: 30px;
        &:nth-child(2n + 2) {
          margin-right: 0px;
        }
        &:nth-child(3n + 3) {
          margin-right: 30px;
        }
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
    property: allSanityProperty(filter: { status: { ne: "Sold" } }) {
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
            fluid {
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
        location {
          lat
          lng
        }
      }
    }
  }
`

class PropertiesPostTemplate extends React.Component {
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
          <title>Property Listings | {site.title}</title>
          <meta
            property="og:description"
            content="Investment, recreational, ranch and farmland in an area comprising 45 counties in central Texas."
          />
          <link rel="canonical" href={site.url + "/properties"} />
        </Helmet>
        <PropertiesStyle>
          <div style={{ height: "500px", width: "100%" }}>
            <GoogleMapReact
              // onChildClick={this._onChildClick}
              bootstrapURLKeys={{
                key: googleMapsKey,
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              center={this.state.center}
            >
              {properties.map((property, index) => (
                <Marker
                  lat={property.location.lat}
                  lng={property.location.lng}
                  property={property}
                  onToggle={this.onChildToggle}
                  selected={this.state.selections}
                />
              ))}
            </GoogleMapReact>
          </div>
          <div className="properties-teaser-container-container">
            <Container className="properties-teaser-container">
              <h1>Property Listings</h1>
              <div className="properties-teaser-container-flex">
                {properties.map((property, index) => (
                  <PropertyTeaser
                    key={index}
                    lat={property.location.lat}
                    lng={property.location.lng}
                    property={property}
                    onMouseEnter={this.onChildHover}
                  />
                ))}
              </div>
            </Container>
          </div>
        </PropertiesStyle>
      </Layout>
    )
  }
}

const Properties = ({ data }) => {
  const { nodes } = data.property
  const { googleMapsKey } = data.site.siteMetadata
  const { siteMetadata } = data.site

  return (
    <PropertiesPostTemplate
      properties={nodes}
      googleMapsKey={googleMapsKey}
      site={siteMetadata}
    />
  )
}

export default Properties
