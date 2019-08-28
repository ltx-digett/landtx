import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import digettlogo from "../../images/digett_white.png"

const FooterStyle = styled.footer`
  padding: 40px 0px;
  background-color: ${variable.brown};
  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .copy {
      width: 50%;
      color: white;
    }
    .digett {
      width: calc(50% - 40px);
      display: flex;
      justify-content: flex-end;
      img {
        width: 100px;
      }
    }
  }
`

export const Footer = ({ mainmenu }) => {
  return (
    <FooterStyle className="ltx-footer">
      <Container className="footer-container">
        <div className="copy">
          2019 - Culver/LANDTX, Inc. - All Rights Reserved
        </div>
        <div className="digett">
          <a href="https://www.digett.com">
            <img src={digettlogo} />
          </a>
        </div>
      </Container>
    </FooterStyle>
  )
}

export default Footer
