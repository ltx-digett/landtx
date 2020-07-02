import React from "react"
import { graphql, Link } from "gatsby"
import { Fade } from "react-slideshow-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"
import * as variable from "../components/variables"
import BackgroundImage from "gatsby-background-image"
import RawImage from "../components/rawImage"
import { Helmet } from "react-helmet"
import arrow from "../images/arrow.png"
import ScrollUpButton from "react-scroll-up-button"
import Scrollspy from "react-scrollspy"

const MainStyle = styled.div`
  .body-container-container {
    background-color: rgba(33, 35, 30, 0.9);
  }
  .team {
    .body-outer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .rawimage {
        width: calc(30%);
      }
      .group {
        width: calc(70% - 40px);
        h2 {
          margin-top: 0px;
        }
      }
    }
  }
  .territory {
    ul {
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      height: 400px;
      li {
        padding: 20px 20px 20px 0px;
        list-style: none;
        box-sizing: border-box;
      }
    }
  }
  .body {
    a {
      color: ${variable.steelBlue};
      &:hover {
        color: ${variable.marine};
      }
    }
  }
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    overflow-y: scroll;
    align-self: flex-start;
    height: 600px;
    ul {
      padding: 0px;
      margin: 0px;
      li {
        list-style: none;
        a {
          color: ${variable.marine};
          margin-bottom: 8px;
          display: block;
          font-size: 17px;
        }
        &.is-current {
          a {
            color: ${variable.red};
          }
        }
      }
    }
  }
  .react-slideshow-container {
    position: relative;
    z-index: -1;
  }
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
      width: calc(100%);
      h1 {
        margin-top: 0px;
      }
      h2 {
        margin: 60px 0px 0px 0px;
      }
      p {
        margin: 10px 0px;
      }
    }
    .has-sidebar {
      width: calc(60% - 40px);
    }
    .sidebar {
      width: 40%;
      .gatsby-image-wrapper {
        max-width: 265px;
        margin: 0 auto;
      }
      #properties-cta {
        a {
          width: 100%;
          margin-bottom: 50px;
          text-align: center;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          display: block;
          background: ${variable.steelBlue};
        }
      }
      #contact {
        text-align: center;
        background-color: ${variable.taupe};
        padding: 40px 20px;
        border-radius: 5px;
        color: ${variable.black};
        img {
          width: 265px;
        }
      }
    }
  }
  .form-group {
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 10px 10px;
      border-radius: 5px;
      border: 0px;
    }
    textarea {
      width: 100%;
      border-radius: 5px;
      border: 0px;
    }
    &.opt {
      input {
        width: auto;
        margin-right: 10px;
      }
    }
  }
  .btn {
    background-color: ${variable.steelBlue};
    -webkit-appearance: none;
    color: white;
    border: 0px;
    padding: 10px 20px;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
    border-radius: 5px;
  }
  .main-slide {
    position: relative;
  }
  .main-slide-text-inner {
    max-width: 50%;
    text-shadow: 1px 1px ${variable.black};
    width: calc(100% - 300px);
  }
  .main-slide-text {
    position: absolute;
    bottom: 0px;
    width: 100%;
    color: white;
    .main-slide-text-title {
      padding: 20px 0px;
      background: rgba(63, 67, 53, 0.5);
      h2 {
        margin-top: 0px;
      }
    }
    .main-slide-text-title {
      padding: 20px 0px;
      background: rgba(63, 67, 53, 0.6);

      a {
        width: auto;
        text-align: center;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        background: ${variable.steelBlue};
        display: table;
        width: 250px;
        border-radius: 5px;
      }
    }
    .main-slide-button-container {
      display: flex;
      justify-content: flex-end;
    }
  }
  .main-slide-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: ${variable.tabletWidth}) {
    .main-slide-text-inner {
      max-width: 100%;
    }
    .slide {
      height: 500px;
    }
    .territory {
      ul {
        height: 600px;
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .territory {
      ul {
        flex-direction: row;
        height: auto;
      }
    }
    .team {
      .body-outer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .rawimage {
          width: calc(100%);
        }
        .group {
          width: calc(100%);
          h2 {
            margin-top: 40px;
          }
        }
      }
    }
    .main-slide-container {
      flex-direction: column;
    }
    .main-slide-text-inner {
      width: 100%;
      margin-bottom: 10px;
    }
    .main-slide-text-title {
      a {
        align-self: flex-start;
      }
    }
    .slide {
      height: 400px;
    }
    .body-container {
      padding-left: 0px;
      padding-right: 0px;
      flex-direction: column;
      padding-top: 40px;
      .sidebar {
        margin: 40px 0px;
        .sticky {
          position: relative;
          top: unset;
          height: auto !important;
        }
      }
      .body {
        width: 100%;
        padding: 0px 15px;
      }
      .sidebar {
        width: 100%;
        #properties-cta {
          a {
            margin-bottom: 0px;
          }
          p {
            margin: 0px;
            padding: 0px;
          }
        }
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
      <div className="rawimage">
        <RawImage id={props.node.asset.id} />
      </div>
    ),
    group: props => (
      <div className="group">
        <PortableText serializers={serializers} blocks={props.node.group} />
      </div>
    ),
    blocks: props => (
      <div id={props.node.blockid && props.node.blockid}>
        {console.log(props)}
        <PortableText
          serializers={serializers}
          blocks={props.node.body}
          projectId="84iv1ine"
          dataset="production"
          imageOptions={{ w: 700, fit: "max" }}
        />
      </div>
    ),
  },
}

const properties = {
  duration: 7000,
  transitionDuration: 1500,
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
        textover
        _rawBody(resolveReferences: { maxDepth: 10 })
        _rawSidebar(resolveReferences: { maxDepth: 10 })
        overview {
          title
          _key
        }
        _rawOverview
        slideshow {
          asset {
            url
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
class MainPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== "undefined") {
      this.state = {
        innerHeight: window.innerHeight - 100,
      }
    } else {
      this.state = {
        innerHeight: 600,
      }
    }
  }

  render() {
    const {
      title,
      slideshow,
      _rawBody,
      sidebarBody,
      metadescription,
      site,
      slug,
      rawoverview,
      overview,
      textover,
    } = this.props
    if (rawoverview != null || sidebarBody != null) {
      var sidebar = true
      var bodyclass = "has-sidebar"
    }

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {title} | {site.title}
          </title>
          <meta name="description" content={metadescription} />
          {slug == "front" && <link rel="canonical" href={site.url} />}
          {slug !== "front" && (
            <link rel="canonical" href={site.url + "/" + slug} />
          )}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          />
        </Helmet>
        <MainStyle>
          <div className="main-slide">
            {textover && (
              <div className="main-slide-text">
                <div className="main-slide-text-title">
                  <Container className="main-slide-container">
                    <div className="main-slide-text-inner">{textover}</div>
                    {slug == "front" && (
                      <Link to="/properties">View Property Listings</Link>
                    )}
                  </Container>
                </div>
              </div>
            )}
            <Fade {...properties}>
              {slideshow.map((slide, index) => (
                <div className="each-slide">
                  <BackgroundImage
                    className="slide"
                    fluid={slide.asset.fluid}
                  ></BackgroundImage>
                </div>
              ))}
            </Fade>
          </div>
          <div className="body-container-container">
            <Container className={slug + " body-container"}>
              <div className={bodyclass + " body"}>
                <h1>{title}</h1>
                <PortableText
                  serializers={serializers}
                  blocks={_rawBody}
                  projectId="84iv1ine"
                  dataset="production"
                  className="body-outer"
                />
                {slug == "contact-us" && (
                  <form
                    name="contact"
                    method="post"
                    netlify-honeypot="bot-field"
                    data-netlify="true"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden>
                      <label htmlFor="bot-field">
                        Don’t fill this out: <input name="bot-field" />
                      </label>
                    </p>
                    <div class="form-group">
                      <label for="name" class="lb-name">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="form-control"
                        data-required="true"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="address" class="lb-address">
                        Address
                      </label>
                      <textarea
                        rows="5"
                        name="address"
                        id="address"
                        class="form-control"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="phone" class="lb-phone">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="form-control"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="email" class="lb-email">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="form-control"
                        data-required="true"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="limits" class="lb-limits">
                        $ Limits
                      </label>
                      <input
                        type="text"
                        name="limits"
                        id="limits"
                        class="form-control"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="location" class="lb-location">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        class="form-control"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group">
                      <label for="features" class="lb-features">
                        Desired features
                      </label>
                      <textarea
                        rows="5"
                        name="features"
                        id="features"
                        class="form-control"
                        data-interactive="true"
                      />
                    </div>
                    <div class="form-group opt">
                      <label for="features" class="lb-features">
                        Opt in
                      </label>
                      <input type="checkbox" name="optin" value="yes" />
                      Yes, sign me up for quarterly updates!
                    </div>
                    <div>
                      <button type="submit" class="btn btn-submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
                {overview.map((overviewitem, index) => (
                  <div>
                    <div key={index} id={overviewitem._key}>
                      <h2>{overviewitem.title}</h2>
                      <PortableText
                        serializers={serializers}
                        blocks={rawoverview[index].body}
                        projectId="84iv1ine"
                        dataset="production"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {sidebar && (
                <div className="sidebar">
                  {rawoverview && (
                    <div
                      className="sticky"
                      style={{ height: this.state.innerHeight }}
                    >
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
                    </div>
                  )}
                  <PortableText
                    serializers={serializers}
                    blocks={sidebarBody}
                    projectId="84iv1ine"
                    dataset="production"
                  />
                </div>
              )}
              <ScrollUpButton />
            </Container>
          </div>
        </MainStyle>
      </Layout>
    )
  }
}
const Main = ({ data }) => {
  const { [0]: post } = data.main.nodes
  const { siteMetadata } = data.site
  return (
    <MainPostTemplate
      title={post.title}
      slideshow={post.slideshow}
      _rawBody={post._rawBody}
      overview={post.overview}
      rawoverview={post._rawOverview}
      sidebarBody={post._rawSidebar}
      metadescription={post.metadescription}
      textover={post.textover}
      site={siteMetadata}
      slug={post.slug.current}
    />
  )
}

export default Main
