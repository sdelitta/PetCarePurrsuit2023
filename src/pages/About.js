import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../CSS/About.css'

const About = () => {
  return (
    <div className="about_page">
      <Helmet>
        <title>Pet Care Purrsuit: About</title>
        <meta name="description" content="Discover the latest articles on pet care, health, tips, and more." />
        <link rel="canonical" href="https://www.petcarepurrsuit.com/about" />
        <meta property="og:title" content="Pet Care Purrsuit" />
        <meta property="og:description" content="Discover the latest articles on pet care, health, tips, and more." />
        <meta property="og:url" content="https://www.petcarepurrsuit.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="	https://www.petcarepurrsuit.com/static/media/Logo3rddraft.1db62124804ecf893ff8.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627"/>
      </Helmet>
      <div className="about_container">
        <div className="about_text">
          <h2 className="about_title">Our Mission</h2>
          <p className="about_description">
            Whether you're taking your first steps as a pet owner or already have a bustling furry family, Pet Care Purrsuit is your go-to destination for pet care advice and solution recommendations. We combine our love for animal companions with a passion for finding the latest in pet care knowledge and providing product recommendations. As a comprehensive pet care blog and adoption search platform, Pet Care Purrsuit aims to empower our readers with priceless tips, insights, and product suggestions to create the perfect environment for their beloved pets.
          </p>
          <p className="about_description">
            We delve into an array of topics, ranging from health and nutrition to training and behavior, all presented in an engaging and light-hearted manner. In addition to providing practical advice, we're committed to offering our readers a range of product recommendations through our carefully curated affiliate marketing partnerships. This ensures that our readers have access to the best solutions for their pets' needs, allowing them to make informed choices on their pet care journey.
          </p>
          <p className="about_description">
            Pet Care Purrsuit is not just a blog, it's a community dedicated to celebrating the joys of pet parenthood. So, explore our treasure trove of pet care wisdom, discover our recommended products, and join us in nurturing the special bond between you and your furry friend!
          </p>
        </div>
        <div className="about_space"></div>
      </div>
    </div>
  );
};
export default About;