import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import logo from "../../images/landtx-logo-white.png"

const HeaderStyle = styled.header`
  padding: 40px 0px;
  background-color: ${variable.brown};
  .main-menu {
    display: flex;
    margin: 0px;
    padding: 0px;
    li {
      list-style: none;
      margin-left: 40px;
    }
  }
  .header-menu-logo {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 200px;
    }
    ul {
      width: calc(100% - 200px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
  }
`

export const Header = ({ mainmenu }) => {
  return (
    <HeaderStyle className="ltx-header">
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
      </Container>
    </HeaderStyle>
  )
}

export default Header
