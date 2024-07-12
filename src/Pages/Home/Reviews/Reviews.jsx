import Marquee from "react-fast-marquee";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import CardReview from "./CardReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://market-server-two.vercel.app/reviews")
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
          <CardReview key={review.userId} data={review}></CardReview>
        ))}
      </Marquee>
    </>
  );
};

export default Reviews;
