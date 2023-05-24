import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../contentful'; // adjust this import based on your project structure

function BlogByCategory() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.getEntries({
      content_type: 'blogPost', // replace with your content type id
      'fields.category.fields.title': category // adjust this according to your data structure
    })
      .then(response => {
        setPosts(response.items);
      })
      .catch(console.error);
  }, [category]);

  return (
    <div>
      <h2>Posts in category: {category}</h2>
      {posts.map(post => (
        <div key={post.sys.id}>
          <h3>{post.fields.title}</h3>
          {/* You can render other fields from your post here */}
        </div>
      ))}
    </div>
  );
}

export default BlogByCategory;