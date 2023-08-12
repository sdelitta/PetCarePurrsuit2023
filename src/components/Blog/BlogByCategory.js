import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../contentful'; 
import { formatDate } from './Blog';

function BlogByCategory() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.getEntries({
      content_type: 'pageBlogPost',
      include: 2,  // increase this value if your categories are nested more deeply
    })
      .then(response => {
        const filteredPosts = response.items.filter(post => {
          // Check if post has a category field and if any category title matches the selected category
          return post.fields.category && post.fields.category.some(categoryItem => categoryItem.fields.title === category);
        });
        setPosts(filteredPosts);
      })
      .catch(console.error);
  }, [category]);

  return (
    <div>
      <div className="latest">
        <div className="category_section_title">
          <h2>Posts in category: {category}</h2>
        </div>
        <div className="latest_cards_container">
          {posts.map((post) => (
            <Link to={`/blog-post/${post.sys.id}`} key={post.sys.id} className="latest_card_link">
              <div className="latest_card">
                <img
                  className="latest_card_image"
                  src={post.fields.featuredImage.fields.file.url}
                  alt={post.fields.title}
                />
                <div className="latest_card_content">
                  <p className="latest_card_title">{post.fields.title}</p>
                  <div className="latest_author">
                    <div className="latest_author_image_wrapper">
                      <img
                        className="latest_author_image"
                        src={post.fields.author.fields.avatar.fields.file.url}
                        alt={post.fields.author}
                      />
                    </div>
                    <p className="latest_author">
                      {post.fields.author.fields.name}
                    </p>

                    <div className="latest_date">
                      <p>{formatDate(post.fields.publishedDate)}</p>
                    </div>          
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogByCategory;
