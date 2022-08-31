import useFetch from "../../hooks/useFetch";
import "./featured.css"

const Featured = () => {

    const { data, loading, error } = useFetch("/hotels/countByCity?cities=patna,muzaffarpur,goa");
    return (
        <div className="featured">
            { loading ? "Loading! Please wait" :
                <>
                    <div className="featuredItem">
                        <img src="https://static.langimg.com/thumb/msid-89087372,imgsize-203882,width-700,height-525,resizemode-75/navbharat-times.jpg" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h2>Patna, India</h2>
                            <h3>{data[0]} properties</h3>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://kashibanaras.com/wp-content/uploads/2021/10/ASSIGHAT.jpeg" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h2>Muzaffarpur, India</h2>
                            <h3>{data[1]} properties</h3>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/11/15/w900X450/Highlight_on.jpg?w=640&dpr=2.0" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h2>Goa, India</h2>
                            <h3>{data[2]} properties</h3>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Featured