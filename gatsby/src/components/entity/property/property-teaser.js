import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../../layout"
import Container from "../../container"
import * as variable from "../../variables"

const PropertyTeaserStyle = styled.div`
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
`

class PropertyTeaser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
    }
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
    return (
      <div>
        <PropertyTeaserStyle
          className="prop-teaser"
          onMouseEnter={this.onMouseEnter}
        >
          <h2>{property.title}</h2>
        </PropertyTeaserStyle>
      </div>
    )
  }
}

export default PropertyTeaser
