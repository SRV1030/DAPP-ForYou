import { Container } from "semantic-ui-react";
import HeaderNav from "./elements/HeaderNav";

const Layout=(props)=>{
    return (
        <>
         <Container>
             <HeaderNav/>
            {props.children}
        </Container>
        </>
    )
}
export default Layout;