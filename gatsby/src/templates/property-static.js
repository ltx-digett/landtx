import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import * as variable from "../components/variables"
import PropertyTop from "../components/entity/property/property-top"
import Tabs from "../components/tabs"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import Img from "gatsby-image"

const PropertyStaticStyle = styled.div`
  .alice-carousel__prev-btn {
    position: absolute;
    width: 25px;
    top: 55px;
    right: 100px;
    padding: 0px;
    margin: 0px;
    .alice-carousel__prev-btn-item {
      color: transparent;
      width: 25px;
      height: 25px;
      background-color: white;
      margin: 0px;
      clip-path: polygon(
        40% 0%,
        40% 20%,
        100% 20%,
        100% 80%,
        40% 80%,
        40% 100%,
        0% 50%
      );
    }
  }
  .alice-carousel__next-btn {
    position: absolute;
    width: 25px;
    top: 55px;
    right: 20px;
    padding: 0px;
    margin: 0px;
    .alice-carousel__next-btn-item {
      color: transparent;
      width: 25px;
      height: 25px;
      background-color: white;
      margin: 0px;
      clip-path: polygon(
        0% 20%,
        60% 20%,
        60% 0%,
        100% 50%,
        60% 100%,
        60% 80%,
        0% 80%
      );
    }
  }
  .alice-carousel__slide-info {
    top: 48px;
    right: 50px;
    color: white;
    background-color: transparent;
  }
  .prop-brown-container {
    background-color: ${variable.taupe};
    padding-bottom: 40px;
  }
  .static-slide {
    h3 {
      background-color: ${variable.rosyBrown};
      padding: 15px;
      color: white;
      margin-bottom: 0px;
      margin-top: 40px;
      font-weight: 400;
    }
  }
`

export const query = graphql`
  query PropertyPostStaticByID($id: String!) {
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
              fluid(maxWidth: 1200) {
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
          caption
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

class PropertyPostStaticTemplate extends React.Component {
  render() {
    const { property, staticmaps, large } = this.props

    return (
      <Layout>
        <PropertyStaticStyle>
          <PropertyTop property={property} large={large}></PropertyTop>
          <Tabs property={property} active="tab-container-static"></Tabs>
          <div className="prop-brown-container">
            <Container className="static">
              <AliceCarousel
                mouseDragEnabled
                dotsDisabled
                showSlideInfo
                duration={1000}
              >
                {staticmaps !== null &&
                  staticmaps.map((slide, index) => (
                    <div className="static-slide">
                      {console.log(slide)}
                      <h3>{slide.caption}</h3>
                      <Img
                        fluid={slide.image.asset.fluid}
                        className="prop-slide"
                      />
                    </div>
                  ))}
              </AliceCarousel>
            </Container>
          </div>
        </PropertyStaticStyle>
      </Layout>
    )
  }
}
const PropertyStatic = ({ data }) => {
  const { [0]: post } = data.content.nodes
  const { [0]: large } = data.large.nodes
  return (
    <PropertyPostStaticTemplate
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

export default PropertyStatic
