import Articles from "../Articles/Articles";
import ProfilesList from "../Profiles/ProfilesList";
import "./Home.css"

const Home = () => {
    return ( 
        <div className="grid col-3 content--container">
            <Articles />
            <ProfilesList />
        </div>
    );
}
 
export default Home;