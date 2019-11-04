import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import SEO from "../components/seo"
import { Link } from "gatsby"

const Style404 = styled.div`
  .body-container-container {
    background-color: rgba(33, 35, 30, 0.9);
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Style404>
      <div className="body-container-container">
        <Container>
          <h1>Hold on there, partner.</h1>
          <p>
            Looks like you’ve found a creek that has run dry. Please ride on
            over to our latest <Link to="/properties">property listings</Link>{" "}
            to find yourself a great ranch with plenty of water for you and that
            beautiful, thirsty horse of yours. Love that saddle blanket, by the
            way.
          </p>
        </Container>
      </div>
    </Style404>
  </Layout>
)

export default NotFoundPage
