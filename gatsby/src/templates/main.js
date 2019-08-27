import React from 'react'
import { graphql, Link } from "gatsby"
import { Slide } from 'react-slideshow-image';
import styled from "styled-components"
import Layout from '../components/layout';
import Container from '../components/container'
import PortableText from "@sanity/block-content-to-react"

const MainStyle = styled.div`
  .slide{
      height:500px;
      background-size:cover;
      background-repeat:no-repeat;
  }
  .body-container{
      display:flex;
      justify-content:space-between;
      padding-top:40px;
      padding-bottom:40px;
      .body{
          width:calc(75% - 40px);
      }
      .sidebar{
        width:25%;
        text-align:center;
        .blue-cta{
            width:100%;
        }
      }
  }
  `

const serializers = {
    
types: {
    code: props => (
        
        <pre data-language={props.node.language}>
            <code>{props.node.code}</code>
        </pre>
        )
    }
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

    query MainPostByID($id: String!) {
        allSanityMain(
            filter:{
                id:{eq: $id}
            }
        ) {
            nodes{
                title
                _rawBody
                sidebar{
                    _rawBody
                }
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
    _rawBody,
    sidebarBody,
  }) => {
    return (
        <Layout>
        <MainStyle>
            <Slide {...properties}>
            {slideshow.map((slide, index) =>(
                <div className="each-slide">
                <div className="slide" style={{'backgroundImage': `url(${slide.asset.url})`}}>
                </div>
              </div>
                ))}
        </Slide>
        <Container className="body-container">
            <div className="body">
            <h1>{title}</h1>
            <PortableText
                serializers={serializers}
                blocks={_rawBody}
                projectId="84iv1ine"
                dataset="production"
            />
            </div>
            <div className="sidebar">
                <Link className="blue-cta">View Property Listings</Link>
                <PortableText
                    serializers={serializers}
                    blocks={sidebarBody}
                    projectId="84iv1ine"
                    dataset="production"
                    imageOptions={{w: 320, fit: 'max'}}
                />
            </div>
        </Container>
        </MainStyle>
        </Layout>
    )
  }

const Main = ({ data }) => {
const { [0]: post } = data.allSanityMain.nodes
    return (
        <MainPostTemplate
           title={post.title}
           slideshow={post.slideshow}
           _rawBody={post._rawBody}
           sidebarBody={post.sidebar._rawBody}
        />
    )

}

export default Main

