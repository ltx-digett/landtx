import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import digettlogo from "../../images/digett_white.png"
import bg from "../../images/bg-topo.png"

const FooterStyle = styled.footer`
  background-image: url(${bg});
  background-size: cover;
  .footer-bg {
    background-color: rgba(128, 119, 90, 0.7);
  }
  .footer-container {
    padding-top: 40px;
    padding-bottom: 40px;
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
      <div className="footer-bg">
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
      </div>
    </FooterStyle>
  )
}

export default Footer
