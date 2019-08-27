import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import property from "../../../sanitylandtx/schemas/property"
import * as variable from "../components/variables"
import "./marker.css"

const MoreInfoStyle = styled.div`
  background-color: white;
  padding: 20px;
  width: 200px;
`
const MarkerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    z-index: 1;
  }
`

class Marker extends React.Component {
  state = {
    showInfo: false,
  }
  markerClick = (e, property) => {
    console.log(property)
    this.setState({ showInfo: true })
    {
      this.state.showInfo
        ? this.setState({ showInfo: false })
        : this.setState({ showInfo: true })
    }
  }
  render() {
    const { property } = this.props
    console.log(this.state)
    return (
      <div>
        {this.state.showInfo ? <MoreInfo property={property} /> : null}
        <MarkerStyle
          className="pin bounce"
          onClick={e => {
            this.markerClick(e, property)
          }}
        ></MarkerStyle>
        <div className="pulse" />
      </div>
    )
  }
}

class MoreInfo extends React.Component {
  render() {
    console.log(property)
    const { property } = this.props
    const path = "/property/" + property.slug.current
    return (
      <MoreInfoStyle>
        <Link to={path}>{property.title}</Link>
      </MoreInfoStyle>
    )
  }
}
export default Marker
