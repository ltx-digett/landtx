import React from 'react'
import { graphql, Link } from "gatsby"
import { Slide } from 'react-slideshow-image';
import styled from "styled-components"

const MainStyle = styled.div`
  .slide{
      height:500px;
      background-size:cover;
      background-repeat:no-repeat;
  }
  `

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }

export const query = graphql`

    query MainPostByID($id: String!) {
        allSanityMain(
            filter:{
                id:{eq: $id}
            }
        ) {
            nodes{
                title
                slideshow {
                    asset {
                      url
                    }
                  }
            }
        }

    }

`

export const MainPostTemplate = ({
    title,
    slideshow,
  }) => {
    return (

        <MainStyle>
            <h1>{title}</h1>
            <Slide {...properties}>
            {slideshow.map((slide, index) =>(
                <div className="each-slide">
                <div className="slide" style={{'backgroundImage': `url(${slide.asset.url})`}}>
                </div>
              </div>
                ))}
        </Slide>
        </MainStyle>
    )
  }

const Main = ({ data }) => {
const { [0]: post } = data.allSanityMain.nodes
    return (
        <MainPostTemplate
           title={post.title}
           slideshow={post.slideshow}
        />
    )

}

export default Main

