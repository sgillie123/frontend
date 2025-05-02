import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { backendUrl } from "../config"

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"} cursor-pointer`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ReviewSection = ({ productId, token }) => {
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/review/product/${productId}`)
      if (response.data.success) {
        setReviews(response.data.reviews)
        setAverageRating(response.data.stats.averageRating)
        setReviewCount(response.data.stats.count)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!token) {
      toast.error("Please login to leave a review")
      return
    }

    if (!newReview.comment.trim()) {
      toast.error("Please enter a review comment")
      return
    }

    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        {
          productId,
          rating: newReview.rating,
          comment: newReview.comment
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success("Review added successfully")
        setNewReview({ rating: 5, comment: "" })
        fetchReviews()
      } else {
        toast.error(response.data.message || "Failed to add review")
      }
    } catch (error) {
      console.error("Error adding review:", error)
      toast.error(error.response?.data?.message || "Failed to add review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < Math.floor(averageRating)} />
          ))}
        </div>
        <div>
          <span className="text-xl font-semibold">{averageRating}</span>
          <span className="text-sm text-gray-600 ml-1">out of 5</span>
          <p className="text-sm text-gray-500">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</p>
        </div>
      </div>

      {token && (
        <form onSubmit={handleSubmitReview} className="mb-8 bg-white p-6 rounded-lg shadow-sm border">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="focus:outline-none"
                >
                  <StarIcon filled={rating <= (hoverRating || newReview.rating)} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-black focus:border-black"
              rows="3"
              placeholder="Share your experience with this product..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
              <span className="font-medium text-gray-800">{review.userName}</span>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection 