import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import logo from "../../images/landtx-logo-white.png"
import bg from "../../images/bg-topo.png"
import tracks from "../../images/tiretracks.png"
import MobileMenu from "../mobilemenu"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"

const HeaderStyle = styled.header`
  background-size: cover;
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
      &:nth-child(1) {
        marginpleft: 0px;
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
    img {
      width: 260px;
    }
    ul {
      width: calc(100% -270px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        a {
          color: white;
          text-decoration: none;
          font-size: 20px;
          font-weight: bold;
        }
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
      headerbg: file(relativePath: { eq: "bg-topo.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      headerbgtracks: file(relativePath: { eq: "tiretracks.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const headerbg = data.headerbg.childImageSharp.fluid
  const headerbgtracks = data.headerbgtracks.childImageSharp.fluid

  return (
    <HeaderStyle className="ltx-header">
      <BackgroundImage fluid={headerbg} style={{ backgroundSize: "cover" }}>
        <div className="header-bg">
          <BackgroundImage
            fluid={headerbgtracks}
            style={{ backgroundSize: "cover" }}
          >
            <Container className="header-menu-logo">
              <Link to="/">
                <img src={logo} />
              </Link>
              <ul className="main-menu">
                {mainmenu.map((menuitem, index) => (
                  <li key={index}>
                    <Link to={menuitem.link}>{menuitem.name}</Link>
                  </li>
                ))}
              </ul>
              <MobileMenu></MobileMenu>
            </Container>
          </BackgroundImage>
        </div>
      </BackgroundImage>
    </HeaderStyle>
  )
}

export default Header
