import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import Marker from "../components/marker"

// const Marker = ({ property }) => <div className="marker">{property.title}</div>

const PropertiesStyle = styled.div`
  .marker {
    cursor: pointer;
  }
`

export const query = graphql`
  query Properties {
    allSanityProperty {
      nodes {
        title
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
  static defaultProps = {
    center: {
      lat: 30.759539,
      lng: -99.222336,
    },
    zoom: 11,
  }
  // _onChildClick = (key, childProps) => {
  //   console.log(childProps)
  // }
  // _onClick = ({ x, y, lat, lng, event }) => {
  //   console.log(this)
  //   this.hide()
  // }
  render() {
    const { properties } = this.props
    return (
      <Layout>
        <PropertiesStyle>
          <Container>
            <h1>Properties</h1>
            <div style={{ height: "100vh", width: "100%" }}>
              <GoogleMapReact
                // onChildClick={this._onChildClick}
                bootstrapURLKeys={{
                  key: "AIzaSyCIIP4Jn_3Fp7PoBE8at2LopBRymst4MEY",
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                {properties.map((property, index) => (
                  <Marker
                    lat={property.location.lat}
                    lng={property.location.lng}
                    property={property}
                  />
                ))}
              </GoogleMapReact>
            </div>

            <div className="properties-teaser-container">
              {properties.map((property, index) => (
                <div key={index}>{property.title}</div>
              ))}
            </div>
          </Container>
        </PropertiesStyle>
      </Layout>
    )
  }
}

const Properties = ({ data }) => {
  const { nodes } = data.allSanityProperty
  console.log(nodes)
  return <PropertiesPostTemplate properties={nodes} />
}

export default Properties
