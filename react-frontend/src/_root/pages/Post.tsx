import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Comment {
  id: number;
  content: string;
  commentedTime: string;
  account: {
    firstname: string;
    lastname: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  postedTime: string;
  updatedTime: string;
  account: {
    firstname: string;
  };
  comments: Comment[];
}

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [numLikes, setNumLikes] = useState<number>(0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();
        setPost(data.post);
        setNumLikes(data.numLikes);
        setUserLiked(data.userLiked || false);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/${id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
      });
      if (!response.ok) throw new Error("Failed to add comment");

      const updatedPost = await response.json();
      setPost(updatedPost.post);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session management
      });
  
      if (!response.ok) throw new Error("Failed to toggle like");
  
      const data = await response.json();
  
      // Update the number of likes and like state based on the response
      setNumLikes(data.numLikes);
      setUserLiked(data.userLiked); // This will toggle the button state
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleEdit = () => navigate(`/posts/edit/${id}`);
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}/delete`, {
        method: "DELETE",
        credentials: "include", // Include session cookies
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
  
      alert("Post deleted successfully!");
      navigate("/"); // Redirect to home page after successful deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      {post && (
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="flex justify-end mb-4 mr-3">
              <Button variant="link" onClick={handleEdit} className="mr-3">
                Edit
              </Button>
              <Button variant="link" onClick={handleDelete}>
                Delete
              </Button>
            </div>

            <p className="mt-4 pb-10 pt-1 text-2xl">{post.body}</p>

            <h5 className="text-gray-500 text-sm">Written by {post.account.firstname}</h5>
            <h5 className="text-gray-500 text-sm">Created on {post.postedTime}</h5>
            <h5 className="text-gray-500 text-sm">Updated on {post.updatedTime}</h5>
          

            <div className="mt-8">
              <h2 className="text-base font-bold">Comments</h2>
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="border p-4 rounded-md">
                    <h3 className="font-bold">
                      {comment.account.firstname} {comment.account.lastname}
                    </h3>
                    <p>{comment.content}</p>
                    <h5 className="text-gray-500">Written on {comment.commentedTime}</h5>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddComment} className="mt-8">
              <h2 className="text-base font-bold">Add a Comment</h2>
              <Input
                type="text"
                placeholder="Write your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mt-2"
              />
              <Button type="submit" className="mt-4">
                Submit
              </Button>
            </form>



            <div className="mt-8 flex items-center gap-4">
              {/* Number of likes with heart symbol */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={userLiked ? "red" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mr-2 cursor-pointer"
                  onClick={handleLike} // Allow clicking the heart to toggle like
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-lg font-bold">{numLikes}</span>
              </div>

              {/* Like/Unlike button */}
              <Button
                onClick={handleLike}
                className={`mt-2 border-2 px-4 py-2 rounded-lg border-red-500 text-red-500 hover:bg-opacity-10 transition-colors`}
              >
                {userLiked ? "Like" : "Like"}
              </Button>
            </div>



          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostPage;
