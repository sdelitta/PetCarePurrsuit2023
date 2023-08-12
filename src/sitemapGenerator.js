const client = require('./contentful');
const fs = require('fs');

const generateSitemap = async () => {
    // Fetch data from Contentful
    const entries = await client.getEntries({ content_type: 'pageBlogPost', include: 2 });

    // Map the entries to their URLs
    const urls = entries.items.map(item => {
        return `https://www.petcarepurrsuit.com/blog-post/${item.sys.id}`;
    });

    // Manually add URLs
    const additionalUrls = [
        'https://www.petcarepurrsuit.com',
        'https://www.petcarepurrsuit.com/blog',
        'https://www.petcarepurrsuit.com/about/',
        'https://www.petcarepurrsuit.com/donate',
        'https://www.petcarepurrsuit.com/category/Canines',
        'https://www.petcarepurrsuit.com/category/Felines',
        'https://www.petcarepurrsuit.com/category/Exotic',
        'https://www.petcarepurrsuit.com/category/Birds',
        'https://www.petcarepurrsuit.com/category/Fish',
        'https://www.petcarepurrsuit.com/category/Reptiles',
        // Add more URLs as needed...
    ];

    // // Combine Contentful URLs and manually added URLs
    const allUrls = [...urls, ...additionalUrls];

// Generate XML
let xml = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
allUrls.forEach(url => {
    xml += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
});
xml += '</urlset>';

// Write to sitemap.xml
fs.writeFileSync('public/sitemap.xml', xml);

try {
    fs.writeFileSync('public/sitemap.xml', xml);
} catch (err) {
    console.error('Error writing sitemap.xml: ', err);
}

};

generateSitemap();