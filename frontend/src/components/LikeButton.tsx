// LikeButton.tsx
import React, { useState, useEffect } from "react";

interface LikeButtonProps {
  articleId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Load the saved like state from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(`like-${articleId}`);
    if (storedData) {
      const { liked, likeCount } = JSON.parse(storedData);
      setLiked(liked);
      setLikeCount(likeCount);
    }
  }, [articleId]);

  const handleLike = () => {
    const newLiked = !liked;
    // Update like count: increment if liking, decrement if unliking
    const newCount = newLiked
      ? likeCount + 1
      : likeCount > 0
      ? likeCount - 1
      : 0;
    setLiked(newLiked);
    setLikeCount(newCount);
    localStorage.setItem(
      `like-${articleId}`,
      JSON.stringify({ liked: newLiked, likeCount: newCount })
    );
  };

  return (
    <button
      onClick={handleLike}
      className="p-2 bg-white/20 hover:bg-white/30 rounded transition-colors"
      aria-label="Like article"
    >
      {liked ? "❤️" : "🤍"} {likeCount}
    </button>
  );
};

export default LikeButton;
