import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import FullSlide from "../components/fullslide"
import * as variable from "../components/variables"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
import fullscreen from "../images/fullscreen-icon.png"
import Img from "gatsby-image"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"
import Iframe from "react-iframe"

const PropertyStyle = styled.div`
  .top-property-container {
    padding-top:100px;
    display: flex;
    justify-content: space-between;
    .top-details-left{
      width:40%:
    }
    .top-details-right{
      width:calc(60% - 40px);
      position:relative;
    }
    .fullscreen{
      width:50px;
      height:50px;
      cursor:pointer;
      background-color:rgba(255,255,255,0.5);
      bottom:40px;
      padding-left:2px;
      left:20px;
      position:absolute;
    }
    .indicators{
      position: relative;
      bottom: 45px;
    }
  }
  .tabs{
    display:flex;
    justify-content:space-between;
    a{
      width:calc(33.333% - 10px);
      color:white;
      background-color:${variable.brown};
      padding:20px;
      text-decoration:none;
      &.active{
        background-color:${variable.taupe};
        color:${variable.black};
      }
    }
  }
  .prop-brown-container{
    background-color:${variable.taupe};
  }
  .overview{
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 40px;
    .property-left{
      width: calc(75% - 40px);
    }
    .property-right{
      width: 25%;
      a{
        color:${variable.marine}
      }
    }
  }
  // iframe{
  //   width:100%;
  //   height:500px;
  // }
`

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  arrows: true,
  indicators: true,
}

export const query = graphql`
  query PropertyPostInteractiveByID($id: String!) {
    allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        slug {
          current
        }
        title
        acres
        county
        _rawSidebar
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

class PropertyPostTemplate extends React.Component {
  state = {
    modal: true,
  }
  openPopupbox(e, slideshow, title) {
    const content = <FullSlide slideshow={slideshow}></FullSlide>
    PopupboxManager.open({
      content,
      fadeInSpeed: 10,
      config: {
        titleBar: {
          enable: true,
          text: title + " Images",
        },
      },
    })
  }
  render() {
    const {
      slug,
      title,
      overview,
      rawoverview,
      acres,
      county,
      slideshow,
      _rawSidebar,
      interactivemap,
      staticmaps,
    } = this.props
    return (
      <Layout>
        <PopupboxContainer />
        <PropertyStyle>
          <Container className="top-property-container">
            <div className="top-details-left">
              <h1>{title}</h1>
              <div className="acres-county">
                {acres} acres in {county} County
              </div>
            </div>
            <div className="top-details-right">
              <AliceCarousel mouseDragEnabled>
                {slideshow.map((slide, index) => (
                  <img
                    src={slide.asset.url + "?w=800"}
                    className="prop-slide"
                  />
                ))}
              </AliceCarousel>

              <img
                className="fullscreen"
                src={fullscreen}
                onClick={e => {
                  this.openPopupbox(e, slideshow, title)
                }}
              ></img>
            </div>
          </Container>
          <Container className="tabs" id="ltx-tabs">
            <Link
              to={"property/" + slug + "#ltx-tabs"}
              className="overview-tab"
            >
              Overview
            </Link>
            <Link
              to={"property/" + slug + "/interactive-map#ltx-tabs"}
              className="interactive-tab active"
            >
              Interactive Map
            </Link>
            <Link
              to={"property/" + slug + "/static-maps#ltx-tabs"}
              className="static-tab"
            >
              Static Maps
            </Link>
          </Container>
          <div className="prop-brown-container">
            <div className="interactive">
              {console.log(interactivemap)}
              <Iframe
                url={interactivemap}
                width="100%"
                height="450px"
                display="initial"
                position="relative"
              />
            </div>
          </div>
        </PropertyStyle>
      </Layout>
    )
  }
}
const Property = ({ data }) => {
  const { [0]: post } = data.allSanityProperty.nodes
  return (
    <PropertyPostTemplate
      slug={post.slug.current}
      title={post.title}
      overview={post.overview}
      rawoverview={post._rawOverview}
      acres={post.acres}
      county={post.county}
      slideshow={post.slideshow}
      _rawSidebar={post._rawSidebar}
      interactivemap={post.interactivemap}
      staticmaps={post.staticmaps}
    />
  )
}

export default Property
