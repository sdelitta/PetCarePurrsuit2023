import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../../contentful';
import { Helmet } from 'react-helmet-async';
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
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredPosts] = useState([])
    const [searchIndex, setSearchIndex] = useState({});


    useEffect(() => {
        const fetchPosts = async () => {
            const entries = await client.getEntries({ 
                content_type: 'pageBlogPost', 
                include: 2, 
                order: '-fields.publishedDate' 
            });
            const posts = entries.items;
            setPosts(posts);
            
            const featuredPosts = await client.getEntries({ 
                content_type: 'pageLanding', 
                include: 2 
            });
            setFeatured(featuredPosts.items);
      
          
          const searchIndex = {};
          for (const post of posts) {
            const tags = post.metadata.tags.map(tag => tag.sys.id.toLowerCase());
            for (const tag of tags) {
              for (let i = 1; i <= tag.length; i++) {
                const substring = tag.substring(0, i);
                if (searchIndex[substring]) {
                  if (!searchIndex[substring].includes(post)) {
                    searchIndex[substring].push(post);
                  }
                } else {
                  searchIndex[substring] = [post];
                }
              }
            }
          }          
            setSearchIndex(searchIndex);
        };      
        fetchPosts();
    }, []);


const handleSearch = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearch(searchInput);

    const searchTerms = searchInput.split(' ').filter(term => term !== '');
    let results = [];

    for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i];
        const termResults = searchIndex[term] || [];
        if (i === 0) {
            // For the first term, just take all the results
            results = termResults;
        } else {
            // For subsequent terms, take the intersection of the current results and the term results
            results = results.filter(result => termResults.includes(result));
        }
    }

    setFilteredPosts(results);
};
    
    return (
        <div className="blog">
                <Helmet>
                    <title>Pet Care Purrsuit</title>
                    <meta name="description" content="Discover the latest articles on pet care, health, tips, and more." />
                    <link rel="canonical" href="https://www.petcarepurrsuit.com/blog" />
                    <meta property="og:title" content="Pet Care Purrsuit" />
                    <meta property="og:description" content="Discover the latest articles on pet care, health, tips, and more." />
                    <meta property="og:url" content="https://www.petcarepurrsuit.com/blog" />
                    <meta property="og:type" content="website" />
                    {/* Assuming you have a default image for the blog page */}
                    <meta property="og:image" content="	https://www.petcarepurrsuit.com/static/media/Logo3rddraft.1db62124804ecf893ff8.png" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="627"/>
                </Helmet>
            <div className="featured">
                <div className="featured_section_title">
                    <h1>Featured</h1>
                </div>
                {featured.length > 0 && (
                    <Link to={`/blog-post/${featured[0].fields.featuredBlogPost.sys.id}`} key={featured[0].fields.featuredBlogPost.sys.id}>
                        <div className=" blog_preview featured_preview">
                            <img
                                className="featured_image"
                                src={featured[0].fields.featuredBlogPost.fields.featuredImage.fields.file.url}
                                alt={featured[0].fields.featuredBlogPost.fields.title}
                            />
                            <div className="featured_content">                                
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

            <div className="search-bar">
                <input 
                    type="text" 
                    value={search} 
                    onChange={handleSearch} 
                    placeholder="Search articles..." 
                    className="search-input"
                />
                {filteredResults.length > 0 && (
                    <div className="search-results">
                        <ul>
                            {filteredResults.map((post) => (
                                <li key={post.sys.id}>
                                    <Link to={`/blog-post/${post.sys.id}`}>
                                        {post.fields.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="latest">
                <div className="latest_section_title">
                    <h3>Latest articles</h3>
                </div>
                <div className="row latest_cards_container">
                    {posts.slice(0, 6).map((post) => (
                        <Link to={`/blog-post/${post.sys.id}`} key={post.sys.id} className="col-lg-6 col-md-4 col-sm-12 latest_card_link">
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