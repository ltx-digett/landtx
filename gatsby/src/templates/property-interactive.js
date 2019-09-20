import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import * as variable from "../components/variables"
import PropertyTop from "../components/entity/property/property-top"
import Tabs from "../components/tabs"
import Iframe from "react-iframe"

const PropertyInteractiveStyle = styled.div`
  .prop-brown-container {
    background-color: ${variable.taupe};
    padding: 20px 0px;
  }
  .overview {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 40px;
    .property-left {
      width: calc(75% - 40px);
    }
    .property-right {
      width: 25%;
      a {
        color: ${variable.marine};
      }
    }
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    align-self: flex-start;
  }
  iframe {
    border: 0px;
  }
`

export const query = graphql`
  query PropertyPostInteractiveByID($id: String!) {
    large: allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        slideshow {
          asset {
            url
            fluid(maxWidth: 1920) {
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
      }
    }
    content: allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        slug {
          current
        }
        title
        acres
        county
        price
        status
        brochure {
          asset {
            url
          }
        }
        _rawSidebar(resolveReferences: { maxDepth: 10 })
        interactivemap
        staticmaps {
          image {
            asset {
              url
            }
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
        overview {
          title
          _key
        }
        _rawOverview
      }
    }
  }
`

class PropertyPostInteractiveTemplate extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      this.state = {
        innerHeight: window.innerHeight,
      }
    } else {
      this.state = {
        innerHeight: 600,
      }
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange)
  }
  handleWindowSizeChange = () => {
    this.setState({ innerHeight: window.innerHeight })
  }
  render() {
    const { property, large } = this.props
    return (
      <Layout>
        <PropertyInteractiveStyle>
          <PropertyTop property={property}></PropertyTop>
          <Tabs property={property} active="tab-container-interactive"></Tabs>
          <div className="prop-brown-container">
            <div className="interactive">
              <Iframe
                url={property.interactivemap}
                width="100%"
                height={this.state.innerHeight}
                display="initial"
                position="relative"
              />
            </div>
          </div>
        </PropertyInteractiveStyle>
      </Layout>
    )
  }
}
const PropertyInteractive = ({ data }) => {
  const { [0]: post } = data.content.nodes
  const { [0]: large } = data.large.nodes

  return (
    <PropertyPostInteractiveTemplate
      overview={post.overview}
      rawoverview={post._rawOverview}
      slideshow={post.slideshow}
      _rawSidebar={post._rawSidebar}
      interactivemap={post.interactivemap}
      staticmaps={post.staticmaps}
      property={post}
      large={large}
    />
  )
}

export default PropertyInteractive
