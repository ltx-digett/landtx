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
import FullStaticSlide from "../components/fullstaticslide"
import fullscreen from "../images/Magnifier.png"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
const PropertyStaticStyle = styled.div`
  .prop-brown-container {
    padding: 40px 0px;
  }
  .static {
    display: flex;
    flex-wrap: wrap;
    .static-slide {
      cursor:pointer;
      margin-bottom: 40px;
      flex-basis: calc((100%) / 3 - 14px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
      h3 {
        margin-top: 0px;
        border-radius: 0px 0px 7px 7px;
        color: #3f4335;
      }
    }
  }
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
    background-color: rgba(33, 35, 30, 0.9);
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
  @media (max-width: ${variable.mobileWidth}) {
    .static {
      flex-direction: column;
      .static-slide {
        width: 100%;
        margin:-right:0px;
      }
    }
  }
  .popclose-parent {
    filter: drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5));
    z-index: 99999999999999;
    position: absolute;
    top: 40px;
    right: 40px;
  }
  .popclose {
    height: 60px !important;
    width: 60px !important;
    clip-path: polygon(
      20% 0%,
      0% 20%,
      30% 50%,
      0% 80%,
      20% 100%,
      50% 70%,
      80% 100%,
      100% 80%,
      70% 50%,
      100% 20%,
      80% 0%,
      50% 30%
    );
    background-color: white;
    cursor: pointer;
  }
  .popupbox-content div:not(.nav):not(.indicators) {
    height: 100%;
  }
  .popupbox-content {
    padding: 0px;
    max-height:100%;
    img{
      max-height:100%;
    }
    picture{
      max-height:100%;
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
    largestatic: allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        staticmaps {
          image {
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
          caption
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
              fluid(maxWidth: 780) {
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
            fluid(maxWidth: 700, maxHeight: 440) {
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
  openPopupbox(e, slideshow) {
    const content = (
      <div>
        <FullStaticSlide slideshow={slideshow}></FullStaticSlide>
        <div className="popclose-parent">
          <div
            className="popclose"
            onClick={e => {
              this.closePopupbox(e)
            }}
          ></div>
        </div>
      </div>
    )
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {},
    })
  }
  closePopupbox(e) {
    PopupboxManager.close({
      fadeInSpeed: 10,
    })
  }
  render() {
    const { property, staticmaps, large, largestatic } = this.props

    return (
      <Layout>
        <PropertyStaticStyle>
          <PopupboxContainer />
          <PropertyTop property={property} large={large}></PropertyTop>
          <Tabs property={property} active="tab-container-static"></Tabs>
          <div className="prop-brown-container">
            <Container className="static">
              {/* <AliceCarousel
                mouseDragEnabled
                dotsDisabled
                showSlideInfo
                duration={1000}
              > */}
              {staticmaps !== null &&
                staticmaps.map((slide, index) => (
                  <div
                    className="static-slide"
                    onClick={e => {
                      this.openPopupbox(e, largestatic.staticmaps)
                    }}
                  >
                    <Img
                      fluid={slide.image.asset.fluid}
                      className="prop-slide"
                    />
                    <h3>{slide.caption}</h3>
                  </div>
                ))}
              {/* </AliceCarousel> */}
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
  const { [0]: largestatic } = data.largestatic.nodes

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
      largestatic={largestatic}
    />
  )
}

export default PropertyStatic
