import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NewPostPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/posts/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          body,
          postedTime: new Date().toISOString(), // Automatically set the current time
          account: { id: 1 }, // Replace with actual account data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create a new post");
      }

      const createdPost = await response.json();
      console.log("Post created successfully:", createdPost);

      // Navigate to the homepage or the created post
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto py-10">
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Write a New Post</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Share your thoughts by creating a new post.
        </p>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center mt-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-4 max-w-md">
        {/* Title */}
        <div>
          <label htmlFor="new-post-title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="new-post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="mt-2 shad-input"
          />
        </div>

        {/* Body */}
        <div>
          <label htmlFor="new-post-body" className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <Textarea
            id="new-post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your post content here..."
            className="mt-2 shad-input"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="shad-button_primary">
          Publish Post
        </Button>
      </form>
    </div>
  );
};

export default NewPostPage;
