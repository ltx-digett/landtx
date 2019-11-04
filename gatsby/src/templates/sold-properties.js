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
        {console.log(props)}
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

const SoldPropertiesStyle = styled.div`
  .sold-block {
    h2 {
      font-size: 34px;
      margin-top: 70px;
      &:nth-child(1) {
        margin-top: 0px;
      }
    }
    h3 {
      strong {
        font-weight: 400;
      }
    }
  }
  .properties-teaser-container-container {
    padding-top: 40px;
    overflow: hidden;
  }
  .marker {
    cursor: pointer;
  }
  background-color: rgba(33, 35, 30, 0.9);
  h1 {
    margin-top: 0px;
    padding: 0px 15px;
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
    block: allSanityBlocks(
      filter: { id: { eq: "ba571684-7541-5df2-b202-62983726558b" } }
    ) {
      nodes {
        title
        _rawBody
      }
    }
    property: allSanityProperty(
      filter: { status: { eq: "Sold" } }
      sort: { fields: soldDate, order: DESC }
    ) {
      nodes {
        title
        id
        price
        status
        acres
        county
        description
        soldDate(formatString: "MMMM Y")
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

class SoldPropertiesPostTemplate extends React.Component {
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
    console.log(props)
    var id = props.id
    var selections = this.state.selections

    selections = id
    // console.log(props)
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
    const { properties, googleMapsKey, site, block } = this.props
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sold Properties | {site.title}</title>
          <meta
            property="og:description"
            content="Investment, recreational, ranch and farmland in an area comprising 45 counties in central Texas."
          />
          <link rel="canonical" href={site.url + "/sold-properties"} />
        </Helmet>
        <SoldPropertiesStyle>
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
              {properties.map(
                (property, index) =>
                  property.location && (
                    <Marker
                      lat={property.location.lat}
                      lng={property.location.lng}
                      property={property}
                      onToggle={this.onChildToggle}
                      selected={this.state.selections}
                    />
                  )
              )}
            </GoogleMapReact>
          </div>
          <div className="properties-teaser-container-container">
            <Container className="properties-teaser-container">
              <h1>Sold Properties</h1>
              <div className="properties-teaser-container-flex">
                {properties.map((property, index) => (
                  <PropertyTeaser
                    key={index}
                    property={property}
                    onMouseEnter={this.onChildHover}
                    click={false}
                  />
                ))}
              </div>
              {block && (
                <div className="sold-block">
                  <PortableText
                    serializers={serializers}
                    blocks={block._rawBody}
                  />
                </div>
              )}
            </Container>
          </div>
        </SoldPropertiesStyle>
      </Layout>
    )
  }
}

const SoldProperties = ({ data }) => {
  const { nodes } = data.property
  const { googleMapsKey } = data.site.siteMetadata
  const { siteMetadata } = data.site
  const block = data.block.nodes[0]
  return (
    <SoldPropertiesPostTemplate
      properties={nodes}
      googleMapsKey={googleMapsKey}
      site={siteMetadata}
      block={block}
    />
  )
}

export default SoldProperties
