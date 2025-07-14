const axios = require('axios');
const { JSDOM } = require('jsdom');

const getSummary = async (url) => {
  try {
    const encoded = encodeURIComponent(url);
    const response = await axios.get(`https://r.jina.ai/http://${encoded}`);
    return response.data;
  } catch (e) {
    return 'Summary temporarily unavailable.';
  }
};

const fetchMetaData = async (url) => {
  try {
    const page = await axios.get(url);
    const dom = new JSDOM(page.data);
    const document = dom.window.document;

    const title = document.querySelector('title') || {};
    const faviconEl = document.querySelector("link[rel~='icon']");
    const titleText = title.textContent || 'No title';
    const favicon = faviconEl?.href || new URL('/favicon.ico', url).href;
    const summary = await getSummary(url);

    return { title: titleText, favicon, summary };
  } catch (err) {
    console.error('Meta fetch failed:', err.message);
    return { title: 'Unknown', favicon: '', summary: 'Unavailable' };
  }
};

module.exports = fetchMetaData;
