import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import MobileMenu from "../mobilemenu"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const HeaderStyle = styled.header`
  background-size: cover;
  position: relative;
  z-index: 999;
  .header-bg {
    background-color: rgba(128, 119, 90, 0.7);
  }
  .main-menu {
    display: flex;
    margin: 0px;
    padding: 0px;
    font-family: "Gothic A1", sans-serif;
    li {
      list-style: none;
      margin-left: 50px;
      transition-duration: 0.5s;
      position: relative;
      &:nth-child(1) {
        margin-left: 0px;
      }
      &:hover > ul {
        visibility: visible;
        opacity: 1;
        display: block;
        transition-duration: 0.5s;
      }
      ul {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        transition: all 0.5s ease;
        margin-top: 1rem;
        left: -15px;
        top: 0;
        display: none;
        z-index: 999999999999999;
        padding: 15px;
        width: 300px;
        li {
          background-color: rgba(255, 255, 255, 0.8);
          margin: 0px;
          padding: 10px 20px;
          border-bottom: thin solid ${variable.black};
          a {
            color: ${variable.black};
            font-size: 14px;
          }
        }
        &:hover {
          visibility: visible;
          opacity: 1;
          display: block;
        }
      }
    }
  }
  .header-menu-logo {
    padding: 30px 20px;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-size: cover;
    .logo {
      flex-grow: 1;
      max-width: 260px;
      margin-right: 20px;
    }
    img {
      width: 260px;
    }
    ul {
      width: calc(100% - 270px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        a {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media (max-width: ${variable.desktopWidth}) {
    .header-menu-logo {
      .main-menu {
        display: none;
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .header-menu-logo {
      img {
        width: 180px;
      }
      ul {
        width: calc(100% -180px);
        li {
          margin-left: 20px;
          a {
            font-size: 17px;
          }
        }
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .header-menu-logo {
      .main-menu {
        display: none;
      }
    }
  }
`

export const Header = ({ mainmenu }) => {
  const data = useStaticQuery(graphql`
    query {
      headerbgtracks: file(relativePath: { eq: "tiretracks.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "landtx-logo-white.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const headerbgtracks = data.headerbgtracks.childImageSharp.fluid
  const logo = data.logo.childImageSharp.fluid

  return (
    <HeaderStyle className="ltx-header">
      {/* <BackgroundImage fluid={headerbg}> */}
      <div className="header-bg">
        <BackgroundImage
          fluid={headerbgtracks}
          style={{ backgroundSize: "cover" }}
        >
          <Container className="header-menu-logo">
            <Link className="logo" to="/">
              <Img fluid={logo} />
            </Link>
            <ul className="main-menu">
              {mainmenu.map((menuitem, index) => (
                <li key={index}>
                  <Link
                    activeStyle={{ color: variable.black }}
                    to={menuitem.link}
                  >
                    {menuitem.name}
                  </Link>
                  {menuitem.submenu && (
                    <ul className="sub-menu">
                      {menuitem.submenu.map((submenuitem, index) => (
                        <li key={index}>
                          <Link
                            activeStyle={{ color: variable.steelBlue }}
                            to={submenuitem.link}
                          >
                            {submenuitem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <MobileMenu></MobileMenu>
          </Container>
        </BackgroundImage>
      </div>
      {/* </BackgroundImage> */}
    </HeaderStyle>
  )
}

export default Header
