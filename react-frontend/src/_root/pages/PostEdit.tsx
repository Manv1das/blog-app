import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Account {
  id: number;
  firstname: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  postedTime: string;
  updatedTime: string;
  account: Account;
}

const UpdatePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [updatedTime, setUpdatedTime] = useState<string>("");
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
        setTitle(data.post.title || "");
        setBody(data.post.body || "");
        setUpdatedTime(data.post.updatedTime || "");
        console.log("timmme", data.post.updatedTime)
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };


    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
          title,
          body
        }),
      });
      console.log(id)
      console.log(title)
      console.log(body)

      if (!response.ok) throw new Error("Failed to update post");

      const updatedData = await response.json();
      setUpdatedTime(updatedData.updatedTime);
      alert("Post updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center mx-auto py-10">
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Update Post</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Make changes to your post and save them.
        </p>
      </div>

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
            placeholder="Enter post body"
            className="mt-2 shad-input"
          />
        </div>

        {/* Last Edited Time */}
        <p className="text-sm text-light-2 text-center">
          Last Edited: <span className="text-primary-500 font-semibold">{updatedTime || "N/A"}</span>
        </p>

        {/* Submit Button */}
        <Button type="submit" className="shad-button_primary">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default UpdatePostPage;
