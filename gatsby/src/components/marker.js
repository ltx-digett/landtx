import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import property from "../../../sanitylandtx/schemas/property"
import * as variable from "../components/variables"
import PropertyTeaser from "../components/entity/property/property-teaser-map"
import "./marker.css"

const MoreInfoStyle = styled.div`
  width: 200px;
  left: -106px;
  position: relative;
  top: 31px;
  background-color: white;
  border: 2px solid ${variable.marine};
  z-index: 99;
  img {
    width: 100%;
    height: auto;
  }
  &:after {
    content: "";
    width: 0px;
    height: 0;
    position: absolute;
    top: -18px;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-bottom: 17px solid ${variable.marine};
  }
`
const MarkerStyle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: #7ba7cc;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #e6e6e6;
    position: absolute;
    border-radius: 50%;
  }
`

class Marker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
  }
  // markerClick = (e, property) => {
  //   console.log(property)
  //   this.setState({ showInfo: true })
  //   {
  //     this.state.showInfo
  //       ? this.setState({ showInfo: false })
  //       : this.setState({ showInfo: true })
  //   }
  // }
  onToggle = () => {
    // console.log(this.props.property.id)
    this.props.onToggle(this.props.property)
  }
  componentDidUpdate() {
    // console.log(this.props)
    // {
    //   this.props.selected === this.props.property.id &&
    //     this.setState({ showInfo: true })
    // }
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
    return (
      <div>
        {this.state.showInfo ? <MoreInfo property={property} /> : null}
        <MarkerStyle
          className="pin bounce"
          onClick={this.onToggle}
        ></MarkerStyle>
        <div className="pulse" />
      </div>
    )
  }
}

class MoreInfo extends React.Component {
  render() {
    const { property } = this.props
    const path = "/property/" + property.slug.current
    return (
      <MoreInfoStyle className="more-info">
        <PropertyTeaser
          lat={property.location.lat}
          lng={property.location.lng}
          property={property}
        ></PropertyTeaser>
      </MoreInfoStyle>
    )
  }
}
export default Marker
