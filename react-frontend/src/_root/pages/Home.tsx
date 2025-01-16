import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: number;
  title: string;
  account: {
    firstname: string;
  };
  postedTime: string;
  updatedTime: string;
  body: string;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data); // Set the fetched posts into state
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-1">
      <h1 className="text-4xl font-bold text-center">Fooorum</h1>
      <hr className="my-4" />

      {/* Sort Options */}
      <ul className="flex space-x-4 justify-center mb-6">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Sort newest
          </Link>
        </li>
        <li>
          <Link to="/posts/sortByLikes" className="text-blue-500 hover:underline">
            Show most liked
          </Link>
        </li>
      </ul>

      {/* Actions */}
      <ul className="flex space-x-4 justify-center mb-6">
        <li>
          <Link to="/posts/create" className="text-blue-500 hover:underline">
            New Post
          </Link>
        </li>
        <li>
          <Link to="/users" className="text-blue-500 hover:underline">
            All Users
          </Link>
        </li>
      </ul>

      {/* Posts */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  <Link to={`/posts/${post.id}`} className="text-blue-500 hover:underline text-3xl">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-100 text-2xl mt-1 pb-7">{post.body}</p>
                <h5 className="text-gray-500">Written by {post.account.firstname}</h5>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>

      <hr className="my-8" />
    </div>
  );
};

export default ForumPage;
