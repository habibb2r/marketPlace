import Marquee from "react-fast-marquee";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import CardReview from "./CardReview";

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
      <SectionTitle title={"Customer Reviews"}></SectionTitle>
      <Marquee>
        {reviews.map((review) => (
          <CardReview key={review._id} data={review}></CardReview>
        ))}
      </Marquee>
    </>
  );
};

export default Reviews;
