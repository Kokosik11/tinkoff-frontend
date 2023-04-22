import { FC } from "react"
import { ReviewType } from "../types"
import { ShortAvatar } from "./ShortAvatar"

export const ReviewCarousel: FC<ReviewType> = (review) => {

    return (
        <div className="review">
            <div className="review__description">
                {review.review}
            </div>

            <div className="review__details">
                <ShortAvatar firstname={review.firstname} lastname={review.lastname} />
                <div className="review__author">
                    <div className="review__name">{review.firstname} {review.lastname}</div>
                    <div className="review__role">{review.role}</div>
                </div>
            </div>
        </div>
    )
}