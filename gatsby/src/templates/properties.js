import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import Marker from "../components/marker"
import PropertyTeaser from "../components/entity/property/property-teaser"

// const Marker = ({ property }) => <div className="marker">{property.title}</div>

const PropertiesStyle = styled.div`
  .marker {
    cursor: pointer;
  }
  .properties-teaser-container {
    display: flex;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .property-teaser {
    color: white;
    padding: 20px;
    border-radius: 25px;
    background: #7ba7cc;
    border: 2px solid white;
    text-align: center;
    a {
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 22px;
    }
  }
`

export const query = graphql`
  query Properties {
    allSanityProperty {
      nodes {
        title
        id
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
    zoom: 11,
  }
  onChildToggle = props => {
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
    const { properties } = this.props
    return (
      <Layout>
        <PropertiesStyle>
          <div style={{ height: "500px", width: "100%" }}>
            <GoogleMapReact
              // onChildClick={this._onChildClick}
              bootstrapURLKeys={{
                key: "AIzaSyCIIP4Jn_3Fp7PoBE8at2LopBRymst4MEY",
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
            {properties.map((property, index) => (
              <PropertyTeaser
                className="property-teaser"
                key={index}
                lat={property.location.lat}
                lng={property.location.lng}
                property={property}
                onMouseEnter={this.onChildHover}
              />
            ))}
          </Container>
        </PropertiesStyle>
      </Layout>
    )
  }
}

const Properties = ({ data }) => {
  const { nodes } = data.allSanityProperty
  return <PropertiesPostTemplate properties={nodes} />
}

export default Properties
