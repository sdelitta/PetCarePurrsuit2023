import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import client from '../../contentful';
import './BlogPost.css';
import './Blog.css'
import { formatDate } from "./Blog.js";

const BlogPost = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const [post, setPost] = useState(null);
  const [lastFloatDirection, setLastFloatDirection] = useState('left');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const entry = await client.getEntry(id, { content_type: 'pageBlogPost' });
        console.log("Entry:", entry);
        setPost(entry);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  console.log("Post:", post);
  if (!post) return <div>Loading...</div>;

  const options = (() => {
    let lastFloatDirection = 'left';
  
    return {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { title, file } = node.data.target.fields;
          const { url } = file;
  
          if (file.contentType.includes('image')) {
            const currentFloatDirection = lastFloatDirection === 'left' ? 'right' : 'left';
            lastFloatDirection = currentFloatDirection;
            return <img src={url} alt={title} className={`floating-image ${currentFloatDirection}`} />;
          }
        },
        [INLINES.EMBEDDED_ASSET]: (node) => {
          const { title, file } = node.data.target.fields;
          const { url } = file;
  
          if (file.contentType.includes('image')) {
            const currentFloatDirection = lastFloatDirection === 'left' ? 'right' : 'left';
            lastFloatDirection = currentFloatDirection;
            return <img src={url} alt={title} className={`floating-image ${currentFloatDirection}`} />;
          }
        },
        [INLINES.HYPERLINK]: (node, children) => {
          return <a href={node.data.uri} target="_blank" rel="noopener noreferrer">{children}</a>
        },
      },
    };
  })();  

  return (
    <div className="blog_post">
      <Helmet>
        <title>{post.fields.title}</title>
        <meta name="description" content={post.fields.shortDescription} />
        <meta property="og:title" content={post.fields.title} />
        <meta property="og:description" content={post.fields.shortDescription} />
        <meta property="og:image" content={`http:${post.fields.featuredImage.fields.file.url}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627"/>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="featured">
        <div className="featured_preview">
          <img
            className="featured_image"
            src={post.fields.featuredImage.fields.file.url}
            alt={post.fields.title}
          />
          <div className="featured_content">
            {/* <div className="featured_author">
              <div className="featured_author_image_wrapper">
                <img
                  className="featured_author_image"
                  src={post.fields.author.fields.avatar.fields.file.url}
                  alt={post.fields.author.fields.name}
                />
              </div>
              <p className="featured_author">{post.fields.author.fields.name}</p>
            </div> */}
            <h1 className="featured_title">{post.fields.title}</h1>
            <div className="featured_date">
              <p>{formatDate(post.fields.publishedDate)}</p>
            </div>
            <p className="featured_subtitle">{post.fields.shortDescription}</p>
          </div>
        </div>
      </div>
      <div className="blog_content">
        {documentToReactComponents(post.fields.content, options)}
      </div>
    </div>
  );
};

export default BlogPost;