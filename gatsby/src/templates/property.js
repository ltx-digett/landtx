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
import ScrollUpButton from "react-scroll-up-button"
import Scrollspy from "react-scrollspy"
import { Helmet } from "react-helmet"
import FullStaticSlide from "../components/fullstaticslide"
import fullscreen from "../images/Magnifier.png"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"

const PropertyStyle = styled.div`
  .prop-brown-container {
    background-color: rgba(33, 35, 30, 0.9);
  }
  .overview {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 40px;
    h2 {
      margin: 40px 0px 0px 0px;
    }
    .property-left {
      width: 60%;
    }
    p {
      margin: 10px 0px;
    }
    .property-right {
      width: calc(40% - 100px);
      padding-top: 40px;
      ul {
        padding: 0px;
        margin: 0px;
        li {
          list-style: none;
          a {
            color: white;
            margin-bottom: 8px;
            display: block;
            font-size: 17px;
          }
          &.is-current {
            a {
              color: ${variable.marine};
            }
          }
        }
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
        div:first-of-type {
          h2 {
            margin-top: 40px;
          }
        }
        div {
          p:first-of-type {
            margin-top: 10px;
          }
        }
      }

      .property-left {
        width: 100%;
      }
      .property-right {
        width: 100%;
        padding-top: 0px;
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
    max-height: 100%;
    img {
      max-height: 100%;
    }
    picture {
      max-height: 100%;
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
        />
      </div>
    ),
  },
}

export const query = graphql`
  query PropertyPostByID($id: String!) {
    site: site {
      siteMetadata {
        title
        url
      }
    }
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
        metadescription
        description
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
        }
        slideshow {
          asset {
            url
            fluid(maxWidth: 800) {
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
      large,
      metadescription,
      slug,
      site,
    } = this.props
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {property.title} | {site.title}
          </title>
          <meta name="description" content={metadescription} />
          <link rel="canonical" href={site.url + "/property/" + slug.current} />
        </Helmet>
        <PropertyStyle>
          <PopupboxContainer />
          <PropertyTop property={property} large={large}></PropertyTop>
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
                  <Scrollspy
                    items={[overviewitem._key]}
                    currentClassName="is-current"
                    className="scrollspy"
                  >
                    <li key={index}>
                      <a key={index} href={"#" + overviewitem._key}>
                        {overviewitem.title}
                      </a>
                    </li>
                  </Scrollspy>
                ))}
                <PortableText
                  serializers={serializers}
                  blocks={_rawSidebar}
                  projectId="84iv1ine"
                  dataset="production"
                />
              </div>
              <ScrollUpButton />
            </Container>
          </div>
        </PropertyStyle>
      </Layout>
    )
  }
}
const Property = ({ data }) => {
  const { [0]: post } = data.content.nodes
  const { [0]: large } = data.large.nodes
  const { siteMetadata } = data.site
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
      large={large}
      metadescription={post.metadescription}
      slug={post.slug}
      site={siteMetadata}
    />
  )
}

export default Property
