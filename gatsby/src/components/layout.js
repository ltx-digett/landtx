import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Header from 'figdog-theme/src/components/regions/header'


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
      <div>
        <Header 
        topMenuLinks={data.site.siteMetadata.topMenuLinks}
        />
        <div className="main">
          {children}
        </div>
      </div>  
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
