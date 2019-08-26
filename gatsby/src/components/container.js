import styled from "styled-components"
import * as variable from '../components/variables'
const Container = styled.div`
  width: calc(${variable.desktopWidth});
  display:block;
  padding:0px 20px;
  margin:0 auto;
  box-sizing:border-box;
  @media (max-width: ${variable.tabletWidth}) {
    width: 100%;
    padding:0px 15px;
    box-sizing:border-box;
  }
  @media (max-width: ${variable.mobileWidth}) {
    // width: 100%;
    // padding:0px 15px;
    // box-sizing:border-box;
  }
`;

export default Container