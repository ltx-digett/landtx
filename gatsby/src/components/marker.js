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
  color: white;
  padding: 20px;
  width: 200px;
  left: -120px;
  position: relative;
  top: 30px;
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
        <Link to={path}>{property.title}</Link>
      </MoreInfoStyle>
    )
  }
}
export default Marker
