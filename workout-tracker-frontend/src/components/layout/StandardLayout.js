import Header from "./Header";
import Footer from "./Footer";


const StandardLayout = (props) =>{

    return(
        <>
            <Header/>
                {props.children}
            <Footer />
        </>
    );

}
export default StandardLayout;