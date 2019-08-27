import React from "react"
import { graphql, Link } from "gatsby"
import { Slide } from "react-slideshow-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import PortableText from "@sanity/block-content-to-react"

const PropertyStyle = styled.div``

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  // onChange: (oldIndex, newIndex) => {
  //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  // }
}

export const query = graphql`
  query PropertyPostByID($id: String!) {
    allSanityProperty(filter: { id: { eq: $id } }) {
      nodes {
        title
        overview {
          title
          _key
        }
        _rawOverview
      }
    }
  }
`

export const PropertyPostTemplate = ({ title, overview, rawoverview }) => {
  return (
    <Layout>
      <PropertyStyle>
        <Container className="property-container">
          <h1>{title}</h1>
          <div className="overview">
            {overview.map((overviewitem, index) => (
              <div>
                <a key={index} href={"#" + overviewitem._key}>
                  {overviewitem.title}
                </a>
              </div>
            ))}
            {overview.map((overviewitem, index) => (
              <div>
                {console.log(overviewitem)}
                <h2 key={index} id={overviewitem._key}>
                  {overviewitem.title}
                </h2>
                <PortableText
                  serializers={serializers}
                  blocks={rawoverview[index].body}
                  projectId="84iv1ine"
                  dataset="production"
                />
              </div>
            ))}
          </div>
        </Container>
      </PropertyStyle>
    </Layout>
  )
}

const Property = ({ data }) => {
  const { [0]: post } = data.allSanityProperty.nodes
  return (
    <PropertyPostTemplate
      title={post.title}
      overview={post.overview}
      rawoverview={post._rawOverview}
    />
  )
}

export default Property
