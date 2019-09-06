import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import Marker from "../components/marker"
import PropertyTeaser from "../components/entity/property/property-teaser"
import * as variable from "../components/variables"

// const Marker = ({ property }) => <div className="marker">{property.title}</div>

const PropertiesStyle = styled.div`
  .marker {
    cursor: pointer;
  }
  background-color: ${variable.taupe};
  .properties-teaser-container-flex {
    display: flex;
    padding-bottom: 40px;
    justify-content: space-between;
    flex-wrap: wrap;
    .prop-teaser {
      width: calc(33.333% - 15px);
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
      .prop-teaser {
        width: calc(100%);
      }
    }
  }
`

export const query = graphql`
  query {
    site {
      siteMetadata {
        googleMapsKey
      }
    }
    property: allSanityProperty {
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
    const { properties, googleMapsKey } = this.props
    return (
      <Layout>
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

          <Container className="properties-teaser-container">
            <h1>Properties</h1>
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
        </PropertiesStyle>
      </Layout>
    )
  }
}

const Properties = ({ data }) => {
  const { nodes } = data.property
  const { googleMapsKey } = data.site.siteMetadata
  return (
    <PropertiesPostTemplate properties={nodes} googleMapsKey={googleMapsKey} />
  )
}

export default Properties
