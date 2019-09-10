import React from "react"
import { graphql, Link } from "gatsby"
import { Slide } from "react-slideshow-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import * as variable from "../components/variables"
import BackgroundImage from "gatsby-background-image"
import RawImage from "../components/rawImage"
import { Helmet } from "react-helmet"

const MainStyle = styled.div`
  .slide {
    height: 550px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .body-container {
    display: flex;
    justify-content: space-between;
    padding-top: 70px;
    padding-bottom: 40px;
    .body {
      width: calc(60% - 40px);
      h1 {
        margin-top: 0px;
      }
    }
    .sidebar {
      width: 40%;
      .gatsby-image-wrapper {
        max-width: 265px;
        margin: 0 auto;
      }
      .blue-cta {
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
      }
      .sidebar-body {
        text-align: center;
        background-color: ${variable.taupe};
        padding: 40px 20px;
        img {
          width: 265px;
        }
        a {
          color: ${variable.red};
        }
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .slide {
      height: 450px;
    }
    .body-container {
      .body {
        width: calc(65% - 20px);
      }
      .sidebar {
        width: 35%;
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .slide {
      height: 300px;
    }
    .body-container {
      flex-direction: column;
      padding-top: 40px;
      .sidebar {
        margin-top: 60px;
      }
      .body {
        width: 100%;
      }
      .sidebar {
        width: 100%;
      }
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
    image: props => (
      // props.node.asset !== null && <div>{console.log(props.node.asset)}

      // </div>
      <div>
        <RawImage id={props.node.asset.id} />
      </div>
    ),
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

const properties = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: true,
  indicators: false,
  arrows: false,
  // onChange: (oldIndex, newIndex) => {
  //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  // }
}

export const query = graphql`
  query MainPostByID($id: String!) {
    site: site {
      siteMetadata {
        title
        url
      }
    }
    main: allSanityMain(filter: { id: { eq: $id } }) {
      nodes {
        title
        slug {
          current
        }
        metadescription
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawSidebar(resolveReferences: { maxDepth: 10 })
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
      }
    }
  }
`

export const MainPostTemplate = ({
  title,
  slideshow,
  _rawBody,
  sidebarBody,
  metadescription,
  site,
  slug,
}) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title} | {site.title}
        </title>
        <meta property="og:description" content={metadescription} />
        <link rel="canonical" href={site.url + "/" + slug} />
      </Helmet>
      <MainStyle>
        <Slide {...properties}>
          {slideshow.map((slide, index) => (
            <div className="each-slide">
              <BackgroundImage
                className="slide"
                fluid={slide.asset.fluid}
              ></BackgroundImage>
            </div>
          ))}
        </Slide>
        <Container className="body-container">
          <div className="body">
            <h1>{title}</h1>
            <PortableText
              serializers={serializers}
              blocks={_rawBody}
              projectId="84iv1ine"
              dataset="production"
            />
          </div>
          <div className="sidebar">
            <Link className="blue-cta" to="/properties">
              View Property Listings
            </Link>
            <PortableText
              className="sidebar-body"
              serializers={serializers}
              blocks={sidebarBody}
              projectId="84iv1ine"
              dataset="production"
            />
          </div>
        </Container>
      </MainStyle>
    </Layout>
  )
}

const Main = ({ data }) => {
  const { [0]: post } = data.main.nodes
  const { siteMetadata } = data.site
  console.log(post.metadescription)
  return (
    <MainPostTemplate
      title={post.title}
      slideshow={post.slideshow}
      _rawBody={post._rawBody}
      sidebarBody={post._rawSidebar}
      metadescription={post.metadescription}
      site={siteMetadata}
      slug={post.slug.current}
    />
  )
}

export default Main
