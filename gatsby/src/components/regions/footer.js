import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../container"
import * as variable from "../variables"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const FooterStyle = styled.footer`
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
    .footer-left {
      width: 50%;
      color: white;
      ul {
        padding: 0px;
        li {
          list-style: none;
        }
      }
    }
    .footer-right {
      color: white;
      width: 50%;
      text-align: right;
      ul {
        padding: 0px;
        li {
          list-style: none;
        }
      }
    }
  }
  .digett {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 20px 0px;
  }
  .copy {
    color: white;
    margin-bottom: 20px;
  }
  @media (max-width: ${variable.mobileWidth}) {
    .footer-container {
      flex-direction: column;
      .footer-left {
        text-align: center;
      }
      .footer-right {
        text-align: center;
      }
    }
  }
`

export const Footer = ({ mainmenu }) => {
  const data = useStaticQuery(graphql`
    query {
      footerbg: file(relativePath: { eq: "bg-topo.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      digettlogo: file(relativePath: { eq: "digett_white.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const footerbg = data.footerbg.childImageSharp.fluid
  const digettlogo = data.digettlogo.childImageSharp.fixed

  return (
    <FooterStyle className="ltx-footer">
      <BackgroundImage fluid={footerbg} style={{ backgroundSize: "cover" }}>
        <div className="footer-bg">
          <Container className="footer-container">
            <div className="footer-left">
              <ul>
                <li>Read About LANDTX</li>
                <li>View our Property Listings </li>
                <li>Read our Market Activity Reports </li>
                <li>More Resources </li>
                <li>Contact LANDTX</li>
              </ul>
            </div>
            <div className="footer-right">
              <ul>
                <li>Culver/LANDTX, Inc.</li>
                <li>PO Box 860</li>
                <li>954 San Antonio St.</li>
                <li>Mason, TX 76856</li>
                <li>Phone (325) 294-4616</li>
                <li>Fax: (325) 294-4618</li>
              </ul>
            </div>
          </Container>
          <Container>
            <div className="digett">
              <div className="copy">
                © 2019 - Culver/LANDTX, Inc. - All Rights Reserved
              </div>
              <a href="https://www.digett.com">
                <Img fixed={digettlogo} />
              </a>
            </div>
          </Container>
        </div>
      </BackgroundImage>
    </FooterStyle>
  )
}

export default Footer
