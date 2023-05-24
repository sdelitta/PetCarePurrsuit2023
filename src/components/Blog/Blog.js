import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../../contentful';
import './Blog.css';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(date);
    return formattedDate;
  };

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          const entries = await client.getEntries({ content_type: 'pageBlogPost', include: 2 });
          setPosts(entries.items);
      
          const featuredPosts = await client.getEntries({ content_type: 'pageLanding', include: 2 });
          setFeatured(featuredPosts.items);
        };
      
        fetchPosts();
        console.log(posts);
    }, []);
      
    return (
        <div className="blog">
            <div className="featured">
                <div className="featured_section_title">
                    <h1>Featured</h1>
                </div>
                {featured.length > 0 && (
                    <Link to={`/blog-post/${featured[0].fields.featuredBlogPost.sys.id}`} key={featured[0].fields.featuredBlogPost.sys.id}>
                        <div className="blog_preview featured_preview">
                            <img
                                className="featured_image"
                                src={featured[0].fields.featuredBlogPost.fields.featuredImage.fields.file.url}
                                alt={featured[0].fields.featuredBlogPost.fields.title}
                            />
                            <div className="featured_content">
                                {/* <div className="featured_author">
                                <div className="featured_author_image_wrapper">
                                    <img
                                    className="featured_author_image"
                                    src={featured[0].fields.featuredBlogPost.fields.author.fields.avatar.fields.file.url}
                                    alt={featured[0].fields.featuredBlogPost.fields.author}
                                    />
                                </div>
                                <p className="featured_author">{featured[0].fields.featuredBlogPost.fields.author.fields.name}</p>
                                </div> */}
                                <h1 className="featured_title">{featured[0].fields.featuredBlogPost.fields.title}</h1>
                                <div className="featured_subtitle">
                                <p>{featured[0].fields.featuredBlogPost.fields.shortDescription}</p>
                                </div>
                                <div className="featured_date">
                                <p>{formatDate(featured[0].fields.featuredBlogPost.fields.publishedDate)}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

            </div>
            <div className="latest">
                <div className="latest_section_title">
                    <h3>Latest articles</h3>
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
};

export default Blog;
