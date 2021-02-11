import Articles from "../Articles/Articles";
import Profiles from "../Profiles/Profiles";
import "./Home.css"
const Home = () => {
    return ( 
        <div className="grid col-3 content--container">
            <Articles />
            <Profiles />
        </div>
    );
}
 
export default Home;