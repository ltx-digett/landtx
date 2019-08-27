import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from '../components/regions/header'
import Footer from '../components/regions/footer'
import styled from "styled-components"
import * as variable from './variables'
import './layout.css'

const GlobalStyles = styled.div`

  .blue-cta{
    background-color:${variable.marine};
    color:white;
    padding:10px 20px;
    text-decoration:none;
    display:block;
  }

`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            mainmenu{
                name
                link
            }
          }
        }
      }
    `}
    render={data => (
      <GlobalStyles>
        <Header 
        mainmenu={data.site.siteMetadata.mainmenu}
        />
        <div className="main">
          {children}
        </div>
        <Footer></Footer>
      </GlobalStyles>  
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
