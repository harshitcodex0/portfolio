import GlassButton from "../GlassButton.jsx";
import LiquidButton from "../LiquidButton.jsx";

const ShowcaseSection = () => {
    return (
        <div id="work" className={"app-showcase"}>
            <div className="w-full">
                
                <GlassButton heading="PROJECTS"/>

                <div className="showcase-layout">
                    {/*Left Side*/}
                    <div className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/project1.png" alt="project1" />
                        </div>
                        <div className="text-content">
                            <h2>The Crafted Pour is a liquor and cocktail discovery
                                platform where users can explore premium spirits,
                                learn how to craft classic cocktails, and create
                                their own unique cocktail recipes.</h2>
                        </div>
                    </div>

                    
                    {/*Right Side*/}

                </div>
            </div>
        </div>
    )
}
export default ShowcaseSection
