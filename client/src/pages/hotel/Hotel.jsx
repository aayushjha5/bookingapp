import Navbar from "../../components/Navbar/Navbar"
import Header from "../../components/Header/Header"
import MailList from "../../components/MailList/MailList"
import Footer from "../../components/Footer/Footer"
import "./hotel.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Reserve from "../../components/reserve/Reserve"


const Hotel = () => {

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "left") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };


  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  const days = (dayDifference(dates[0].endDate, dates[0].startDate));

  const navigate = useNavigate();

  const {  user } = useContext(AuthContext);

  const handleClick = ()=>{
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login");
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? 'Loading! Please wait' : (<div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("left")} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("right")} />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">Excellent Location - {data.distance}</span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper">
                <img src={photo} alt="" onClick={() => handleOpen(i)} className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>Situated in the best rated area in {data.city}, this property has an excellent location score of 9.8</span>
              <h2>
                <b>₹ {days * data.cheapestPrice * options.room}</b> ({days} night)
              </h2>
              <button onClick={handleClick}>Reserve</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
      {openModal && <Reserve  setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel