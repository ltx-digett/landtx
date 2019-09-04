import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Container from "../components/container"
import * as variable from "../components/variables"

const TabsStyle = styled.div`
  .tabs {
    display: flex;
    justify-content: space-between;
    a {
      width: calc(33.333% - 10px);
      color: white;
      background-color: ${variable.rosyBrown};
      padding: 20px;
      text-decoration: none;
    }
  }
  &.tab-container-interactive {
    .interactive-tab {
      background-color: ${variable.taupe};
      color: ${variable.black};
    }
  }
  &.tab-container-overview {
    .overview-tab {
      background-color: ${variable.taupe};
      color: ${variable.black};
    }
  }
  &.tab-container-static {
    .static-tab {
      background-color: ${variable.taupe};
      color: ${variable.black};
    }
  }
  @media (max-width: ${variable.mobileWidth}) {
    .tabs {
      flex-direction: column;
      a {
        width: 100%;
        margin-bottom: 40px;
      }
    }
  }
`

export const Tabs = ({ property, active }) => {
  return (
    <TabsStyle className={"tabs " + active}>
      <Container className="tabs" id="ltx-tabs">
        <Link
          to={"property/" + property.slug.current + "#ltx-tabs"}
          className="overview-tab"
        >
          Overview
        </Link>
        <Link
          to={"property/" + property.slug.current + "/interactive-map#ltx-tabs"}
          className="interactive-tab"
        >
          Interactive Map
        </Link>
        <Link
          to={"property/" + property.slug.current + "/static-maps#ltx-tabs"}
          className="static-tab"
        >
          Static Maps
        </Link>
      </Container>
    </TabsStyle>
  )
}

export default Tabs
