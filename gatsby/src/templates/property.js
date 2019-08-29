import React from "react"
import { graphql, Link } from "gatsby"
import { Slide } from "react-slideshow-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import FullSlide from "../components/fullslide"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"
import fullscreen from "../images/fullscreen-icon.png"
import Img from "gatsby-image"
import AliceCarousel from "react-alice-carousel"
import "react-alice-carousel/lib/alice-carousel.css"

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
  query PropertyPostByID($id: String!) {
    allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        title
        acres
        county
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
      title,
      overview,
      rawoverview,
      acres,
      county,
      slideshow,
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
              {/* <Slide {...properties} className="prop-slide">
                {slideshow.map((slide, index) => (
                  <div key={index} className="each-slide">
                    <div className="slide">
                      <img src={slide.asset.url + "?w=800"} />
                    </div>
                  </div>
                ))}
              </Slide> */}
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
          <div className="overview">
            {overview.map((overviewitem, index) => (
              <div key={index}>
                <a key={index} href={"#" + overviewitem._key}>
                  {overviewitem.title}
                </a>
              </div>
            ))}
            {overview.map((overviewitem, index) => (
              <div>
                {console.log(overviewitem)}
                <h2 key={index} id={overviewitem._key}>
                  {overviewitem.title}
                </h2>
                <PortableText
                  serializers={serializers}
                  blocks={rawoverview[index].body}
                  projectId="84iv1ine"
                  dataset="production"
                />
              </div>
            ))}
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
      title={post.title}
      overview={post.overview}
      rawoverview={post._rawOverview}
      acres={post.acres}
      county={post.county}
      slideshow={post.slideshow}
    />
  )
}

export default Property
