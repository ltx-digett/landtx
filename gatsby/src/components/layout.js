import "core-js/es/map"
import "core-js/es/set"
import "raf/polyfill"
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import Header from "../components/regions/header"
import Footer from "../components/regions/footer"
import styled from "styled-components"
import * as variable from "./variables"
import "./layout.css"
import arrow from "../images/arrow.png"
import { Helmet } from "react-helmet"

const GlobalStyles = styled.div`
  color: ${variable.black};
  h1 {
    font-size: 44px;
  }
  iframe {
    border: 0px;
  }
  .blue-cta {
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    display: block;
    background: linear-gradient(180deg, ${variable.marine} 0%, #4b7ca5 100%);
    &:after {
      content: "d";
      color: transparent;
      width: 15px;
      height: 15px;
      margin-left: 10px;
      background-image: url(${arrow});
      background-size: contain;
      background-repeat: no-repeat;
      display: inline-flex;
      align-items: center;
    }
  }
  a {
    color: ${variable.steelBlue};
  }
  @media (max-width: ${variable.mobileWidth}) {
    h1 {
      font-size: 34px;
    }
  }
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            mainmenu {
              name
              link
              submenu {
                name
                link
              }
            }
          }
        }
      }
    `}
    render={data => (
      <GlobalStyles>
        <Helmet>
          <html lang="en" />
        </Helmet>
        <Header mainmenu={data.site.siteMetadata.mainmenu} />
        <div className="main">{children}</div>
        <Footer></Footer>
      </GlobalStyles>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
