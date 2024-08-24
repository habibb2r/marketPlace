import Marquee from "react-fast-marquee";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import CardReview from "./CardReview";
import ico from "../../../assets/for title/009-analytics.png";
import ict from "../../../assets/for title/008-feedback.png";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <>
      <SectionTitle
        title={"Customer Reviews"}
        ico={ico}
        ict={ict}
      ></SectionTitle>
      <Marquee>
        {reviews.map((review) => (
          <CardReview key={review._id} data={review}></CardReview>
        ))}
      </Marquee>
    </>
  );
};

export default Reviews;
