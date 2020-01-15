import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Container from "../components/container"
import GoogleMapReact from "google-map-react"
import Marker from "../components/marker"
import PropertyTeaser from "../components/entity/property/property-teaser"
import * as variable from "../components/variables"
import { Helmet } from "react-helmet"
import PortableText from "@sanity/block-content-to-react"
import RawImage from "../components/rawImage"

// const Marker = ({ property }) => <div className="marker">{property.title}</div>

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
    image: props => (
      // props.node.asset !== null && <div>{console.log(props.node.asset)}

      // </div>
      <div className="rawimage">
        <RawImage id={props.node.asset.id} />
      </div>
    ),
    group: props => (
      <div className="group">
        <PortableText serializers={serializers} blocks={props.node.group} />
      </div>
    ),
    blocks: props => (
      <div id={props.node.blockid && props.node.blockid}>
        <PortableText
          serializers={serializers}
          blocks={props.node.body}
          projectId="84iv1ine"
          dataset="production"
          imageOptions={{ w: 700, fit: "max" }}
        />
      </div>
    ),
  },
}

const PropertiesStyle = styled.div`
  .properties-teaser-container-container {
    background-color: rgba(33, 35, 30, 0.9);
    padding-top: 40px;
  }
  .marker {
    cursor: pointer;
  }
  h1 {
    margin-top: 0px;
  }
  .properties-teaser-container-flex {
    display: flex;
    padding-bottom: 40px;
    flex-wrap: wrap;
    .prop-teaser {
      margin-bottom: 40px;
      width: calc((100%) / 3 - 14px);
      margin-right: 20px;
      &:nth-child(3n + 3) {
        margin-right: 0px;
      }
    }
  }
  @media (max-width: ${variable.tabletWidth}) {
    .properties-teaser-container {
      .prop-teaser {
        margin-bottom: 40px;
        width: calc((100%) / 2 - 20px);
        margin-right: 30px;
        &:nth-child(2n + 2) {
          margin-right: 0px;
        }
        &:nth-child(3n + 3) {
          margin-right: 30px;
        }
      }
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .properties-teaser-container {
      flex-direction: column;
      padding: 0px;
      .prop-teaser {
        width: calc(100%);
      }
    }
  }
`

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        googleMapsKey
        title
        url
      }
    }
    propertiesConfig: allSanityAuxiliaryPageData(
      filter: { _id: { eq: "d5a4142b-4dbc-497d-abd5-374ae75b9857" } }
    ) {
      nodes {
        pagetitle
        metadescription
        _rawBody(resolveReferences: { maxDepth: 10 })
      }
    }
    property: allSanityProperty(
      filter: { status: { ne: "Sold" }, location: { lat: { ne: null } } }
      sort: { fields: price, order: DESC }
    ) {
      nodes {
        title
        id
        price
        status
        acres
        county
        description
        flipbook
        brochure {
          asset {
            url
          }
        }
        slideshow {
          asset {
            url
            fluid(maxWidth: 400, maxHeight: 300) {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
        slug {
          current
        }
        location {
          lat
          lng
        }
      }
    }
  }
`

class PropertiesPostTemplate extends React.Component {
  state = {
    selections: "",
    center: {
      lat: 30.759539,
      lng: -99.222336,
    },
    zoom: 11,
  }
  static defaultProps = {
    center: {
      lat: 30.759539,
      lng: -99.222336,
    },
    zoom: 8,
  }
  onChildToggle = props => {
    var id = props.id
    var selections = this.state.selections

    selections = id
    this.setState({
      selections: selections,
    })
    this.setState({
      center: {
        lat: props.location.lat,
        lng: props.location.lng,
      },
    })
  }
  onChildHover = props => {
    var id = props.id
    var selections = this.state.selections

    selections = id
    this.setState({
      selections: selections,
    })
    this.setState({
      center: {
        lat: props.location.lat,
        lng: props.location.lng,
      },
    })
  }

  // _onClick = ({ x, y, lat, lng, event }) => {
  //   console.log(this)
  //   this.hide()
  // }
  render() {
    const {
      properties,
      googleMapsKey,
      site,
      propertiesConfig,
      body,
    } = this.props
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {propertiesConfig.pagetitle} | {site.title}
          </title>
          <meta name="description" content={propertiesConfig.metadescription} />
          <link rel="canonical" href={site.url + "/properties"} />
        </Helmet>
        <PropertiesStyle>
          <div style={{ height: "500px", width: "100%" }}>
            <GoogleMapReact
              // onChildClick={this._onChildClick}
              bootstrapURLKeys={{
                key: googleMapsKey,
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              center={this.state.center}
            >
              {properties.map((property, index) => (
                <Marker
                  lat={property.location.lat}
                  lng={property.location.lng}
                  property={property}
                  onToggle={this.onChildToggle}
                  selected={this.state.selections}
                />
              ))}
            </GoogleMapReact>
          </div>
          <div className="properties-teaser-container-container">
            <Container className="properties-teaser-container">
              <h1>{propertiesConfig.pagetitle}</h1>
              <div className="body-outer">
                <PortableText
                  serializers={serializers}
                  blocks={body}
                  projectId="84iv1ine"
                  dataset="production"
                  className="body-outer"
                />
              </div>
              <div className="properties-teaser-container-flex">
                {properties.map((property, index) => (
                  <PropertyTeaser
                    key={index}
                    lat={property.location.lat}
                    lng={property.location.lng}
                    property={property}
                    onMouseEnter={this.onChildHover}
                    click={true}
                  />
                ))}
              </div>
            </Container>
          </div>
        </PropertiesStyle>
      </Layout>
    )
  }
}

const Properties = ({ data }) => {
  const { nodes } = data.property
  const { googleMapsKey } = data.site.siteMetadata
  const { siteMetadata } = data.site
  const propertiesConfig = data.propertiesConfig.nodes[0]
  const body = data.propertiesConfig.nodes[0]._rawBody
  return (
    <PropertiesPostTemplate
      properties={nodes}
      googleMapsKey={googleMapsKey}
      site={siteMetadata}
      propertiesConfig={propertiesConfig}
      body={body}
      // _rawBody={post._rawBody}
    />
  )
}

export default Properties
