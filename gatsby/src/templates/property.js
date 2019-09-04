import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import * as variable from "../components/variables"
import "react-popupbox/dist/react-popupbox.css"
import PropertyTop from "../components/entity/property/property-top"
import Tabs from "../components/tabs"
import fitvids from "fitvids"
const PropertyStyle = styled.div`
  .prop-brown-container {
    background-color: ${variable.taupe};
  }
  .overview {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 40px;
    .property-left {
      width: 60%;
    }
    .property-right {
      width: calc(40% - 100px);
      padding-top: 40px;
      a {
        color: ${variable.marine};
        margin-bottom: 10px;
        display: block;
        font-size: 22px;
      }
    }
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    align-self: flex-start;
  }
  .sidebar-body {
    text-align: center;
    margin-top: 60px;
    img {
      max-width: 220px;
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .overview {
      flex-direction: column-reverse;
      .property-left {
        width: 100%;
      }
      .property-right {
        width: 100%;
      }
    }
    .sticky {
      position: relative;
      top: unset;
    }
  }
  .disclaimer {
    padding-top: 40px;
    &:before {
      content: "";
      width: 75%;
      display: block;
      margin: 0 auto;
      border-top: thin solid ${variable.brown};
      margin-bottom: 50px;
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
    image: props =>
      props.node.asset !== undefined && (
        <img src={props.node.asset.url + "?w=700"} />
      ),
    youtube: props => <iframe src={props.node.url}></iframe>,
    blocks: props => (
      <div>
        <PortableText
          className="sidebar-body"
          serializers={serializers}
          blocks={props.node.body}
          projectId="84iv1ine"
          dataset="production"
          imageOptions={{ w: 320, fit: "max" }}
        />
      </div>
    ),
  },
}

export const query = graphql`
  query PropertyPostByID($id: String!) {
    allSanityProperty(filter: { id: { eq: $id } }) {
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
          }
        }
        overview {
          title
          _key
        }
        _rawOverview
        disclaimer {
          _rawBody
        }
      }
    }
  }
`

class PropertyPostTemplate extends React.Component {
  componentDidMount() {
    fitvids()
  }
  render() {
    const {
      property,
      _rawSidebar,
      rawoverview,
      overview,
      disclaimer,
    } = this.props

    return (
      <Layout>
        <PropertyStyle>
          <PropertyTop property={property}></PropertyTop>
          <Tabs property={property} active="tab-container-overview"></Tabs>
          <div className="prop-brown-container">
            <Container className="overview">
              <div className="property-left">
                {overview.map((overviewitem, index) => (
                  <div>
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
                <div className="disclaimer">
                  <PortableText
                    serializers={serializers}
                    blocks={disclaimer}
                    projectId="84iv1ine"
                    dataset="production"
                  />
                </div>
              </div>
              <div className="property-right sticky">
                {overview.map((overviewitem, index) => (
                  <div key={index}>
                    <a key={index} href={"#" + overviewitem._key}>
                      {overviewitem.title}
                    </a>
                  </div>
                ))}
                <PortableText
                  serializers={serializers}
                  blocks={_rawSidebar}
                  projectId="84iv1ine"
                  dataset="production"
                />
              </div>
            </Container>
          </div>
        </PropertyStyle>
      </Layout>
    )
  }
}
const Property = ({ data }) => {
  const { [0]: post } = data.allSanityProperty.nodes
  console.log(post)
  return (
    <PropertyPostTemplate
      overview={post.overview}
      rawoverview={post._rawOverview}
      slideshow={post.slideshow}
      _rawSidebar={post._rawSidebar}
      interactivemap={post.interactivemap}
      staticmaps={post.staticmaps}
      disclaimer={post.disclaimer._rawBody}
      property={post}
    />
  )
}

export default Property
