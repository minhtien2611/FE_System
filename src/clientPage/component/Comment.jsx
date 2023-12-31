import {React, useEffect, useState} from "react";
import { viewProfile, createComment } from "../../api/apiServices";

export default function Comment({ product, color, setUserComment }) {
	const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
	const [user, setUser] = useState([]);
	const [comment, setComment] = useState("");

	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
		setCurrentDate(new Date());
		}, 60000); // Update every minute

		return () => clearInterval(intervalId);
	}, []);

	const formattedDate = currentDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

    useEffect(() => {
		viewProfile()
			.then(res => {
				console.log(res.data.data)
				setUser(res.data.data)
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	const handleComment = () => {
		const data = {
			product: product, 
			color: color,
			comment: comment, 
			rating: rating
		}
		console.log(data)
		createComment(data)
		.then((res) => {
			console.log(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
	}

  const StarRating = () => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button bf"
              key={index}
              className={index <=((rating && hover) || hover) ? "text-yellow-300" : "text-gray-400"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
							onDoubleClick={() => {
							setRating(0);
							setHover(0);
							}}
            >
              <svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
            </button>
          );
        })}
      </div>
    );
  };

	return (
		<div className="border-t-2 text-left">
			<div className="inline-flex gap-4 pt-4">
				<div className="grid">
					<p class="flex items-baseline">
						<span class="text-gray-600 font-bold">{user.fullName}</span>
					</p>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
						title="February 8th, 2022">{formattedDate}</time></p>
				</div>
			</div>
			<StarRating />
			<div class="flex w-full items-center justify-center ">
				<div class="mb-6 w-full grid">
					<div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
							<label for="comment" class="sr-only">Your comment</label>
							<textarea id="comment" rows="6"
								class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
								placeholder="Write a comment..." 
								onChange={(e) => setComment(e.target.value)}></textarea>
					</div>
					<div className="flex justify-end items-center">
						<button 
							onClick={() => handleComment()}
							class="py-2.5 px-4 text-xs font-medium text-center text-white bg-teal-500 rounded-lg focus:ring-4 focus:ring-primary-400 hover:bg-primary-300">
							Post comment
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}