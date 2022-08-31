import { Link } from "react-router-dom";
import "./searchItem.css"

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
      <img 
      src={item.photos[0]}
       alt=""
        className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{item.title}</span>
        <span className="siFeatures">{item.features}</span>
        <span className="CancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitlew">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
       {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailsTexts">
          <span className="siPrice">₹ {item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability {">"}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem