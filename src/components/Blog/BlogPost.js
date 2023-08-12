import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Article",
    "headline": post.fields.title,
    "image": `http:${post.fields.featuredImage.fields.file.url}`,
    "datePublished": formatDate(post.fields.publishedDate),
    "author": [
      {
        "@type": "Person",
        "name": post.fields.author.fields.name,
        "url": "N/A"
      }
    ],
    "description": post.fields.shortDescription,
  };

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
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={post.fields.shortDescription} />
        <meta property="og:title" content={post.fields.title} />
        <meta property="og:description" content={post.fields.shortDescription} />
        <meta property="og:image" content={`http:${post.fields.featuredImage.fields.file.url}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627"/>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta property="fb:app_id" content="245756694726948" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8211973232545086"
        crossorigin="anonymous"></script>
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
          <div className="disclosure">
            <p>Disclosure: This article contains affiliate links, meaning when you make a purchase, I earn a small commission. Affiliate links cost you nothing to use, and helo keep mv content free. It's a win-win for us both! For more info. see the Disclosure Policy</p>
          </div>
        </div>
      </div>
      <div className="blog_content">
        {documentToReactComponents(post.fields.content, options)}
      </div>
      <div className="latest_section_title">
        <h2>Related Posts</h2>
      </div>
      {post.fields.relatedBlogPosts && post.fields.relatedBlogPosts.length > 0 && (
      <div className="latest_cards_container">
        {post.fields.relatedBlogPosts.map(relatedPost => (
          <Link to={`/blog-post/${relatedPost.sys.id}`} key={relatedPost.sys.id} className="latest_card_link">
            <div className="latest_card">
              <img
                className="latest_card_image"
                src={relatedPost.fields.featuredImage.fields.file.url}
                alt={relatedPost.fields.title}
              />
              <div className="latest_card_content">
                <p className="latest_card_title">{relatedPost.fields.title}</p>
                <div className="latest_author">
                  <div className="latest_author_image_wrapper">
                    <img
                      className="latest_author_image"
                      src={relatedPost.fields.author.fields.avatar.fields.file.url}
                      alt={relatedPost.fields.author.fields.name}
                    />
                  </div>
                  <p className="latest_author">{relatedPost.fields.author.fields.name}</p>
                  <div className="latest_date">
                    <p>{formatDate(relatedPost.fields.publishedDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
    </div>
  );
};

export default BlogPost;