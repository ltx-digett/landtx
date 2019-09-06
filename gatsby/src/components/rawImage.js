import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { getFluidGatsbyImage, getFixedGatsbyImage } from "gatsby-source-sanity"

export const rawImage = ({ id }) => {
  const sanityConfig = { projectId: "84iv1ine", dataset: "production" }
  const fluidProps = getFluidGatsbyImage(id, { maxWidth: 1024 }, sanityConfig)
  return <Img fluid={fluidProps} />
}

export default rawImage
