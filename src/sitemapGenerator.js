const client = require('./contentful');
const fs = require('fs');

const generateSitemap = async () => {
    // Fetch data from Contentful
    const entries = await client.getEntries({ content_type: 'pageBlogPost', include: 2 });

    // Map the entries to their URLs
    const urls = entries.items.map(item => {
        return `https://petpurrsuit-23168.web.app/blog-post/${item.sys.id}`;
    });

    // Manually add URLs
    const additionalUrls = [
        'https://petpurrsuit-23168.web.app/',
        'https://petpurrsuit-23168.web.app/blog',
        'https://petpurrsuit-23168.web.app/about',
        'https://petpurrsuit-23168.web.app/search',
        'https://petpurrsuit-23168.web.app/animal-details',
        'https://petpurrsuit-23168.web.app/user-profile',
        // Add more URLs as needed...
    ];

    // Combine Contentful URLs and manually added URLs
    const allUrls = [...urls, ...additionalUrls];

    // Generate XML
    let xml = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    allUrls.forEach(url => {
        xml += `  <sitemap>\n    <loc>${url}</loc>\n  </sitemap>\n`;
    });
    xml += '</sitemapindex>';

    // Write to sitemap.xml
    fs.writeFileSync('public/sitemap.xml', xml);

    try {
        fs.writeFileSync('public/sitemap.xml', xml);
    } catch (err) {
        console.error('Error writing sitemap.xml: ', err);
    }
};

generateSitemap();