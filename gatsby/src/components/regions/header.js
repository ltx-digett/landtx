import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import logo from "../../images/landtx-logo-white.png"
import bg from "../../images/bg-topo.png"
import tracks from "../../images/tiretracks.png"
const HeaderStyle = styled.header`
  background-image: url(${bg});
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
      margin-left: 40px;
    }
  }
  .header-menu-logo {
    padding: 30px 20px;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-image: url(${tracks});
    background-size: cover;
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
      <div className="header-bg">
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
      </div>
    </HeaderStyle>
  )
}

export default Header
