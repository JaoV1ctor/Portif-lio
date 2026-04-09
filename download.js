const https = require('https');
const fs = require('fs');

const fetchSvg = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let data = ''; res.on('data', c => data += c); res.on('end', () => resolve(data));
  });
});

(async () => {
  const result = {};
  result.firebase = await fetchSvg('https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg');
  result.node = await fetchSvg('https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg');
  // Claude modern star:
  result.claude = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.025 8.932a3.09 3.09 0 1 0 0 6.18 3.09 3.09 0 0 0 0-6.18Zm6.877 8.016l-3.328-1.577a5.534 5.534 0 0 1-2.021 1.637l1.246 3.456a.71.71 0 1 1-1.339.483l-1.258-3.489a5.578 5.578 0 0 1-2.731-.59v3.664a.71.71 0 1 1-1.422 0V16.87a5.57 5.57 0 0 1-2.482-1.303l-3.003 2.115a.71.71 0 0 1-.82-.124.71.71 0 0 1 .002-1.002l3.056-2.152a5.525 5.525 0 0 1-1.045-2.61L.742 12.75a.71.71 0 0 1-.502-.857.71.71 0 0 1 .844-.52l3.655.954a5.531 5.531 0 0 1 .305-2.79H1.47a.71.71 0 1 1 0-1.422h3.69A5.567 5.567 0 0 1 7.23 5.496l-2.684-2.54a.71.71 0 1 1 .974-1.03l2.748 2.602a5.534 5.534 0 0 1 2.502-1.22V.453a.71.71 0 1 1 1.423 0v2.853c.961.121 1.866.452 2.656.96l2.196-2.88a.71.71 0 1 1 1.134.86l-2.22 2.91a5.525 5.525 0 0 1 1.761 1.966l3.473-1.258a.71.71 0 1 1 .484 1.338l-3.528 1.278a5.524 5.524 0 0 1 .6 2.72l3.5-.022a.71.71 0 1 1 .009 1.42l-3.562.024c-.161 1.016-.549 1.95-1.121 2.768l3.352 1.588a.71.71 0 1 1-.59 1.294v-.004Z" fill="#D97757"/></svg>';
  
  // Custom simple cursor logo (just putting it back or doing standard modern gray cursor)
  result.cursor = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L2 10l8.5 2L12 24l2-8.5L22 14 12 0z" fill="#999"/><path d="M12 0L2 10l8.5 2L12 24V0z" fill="#FFF"/></svg>'; 
  // Wait, cursor is just an angled polygon. The logo is a black/white diamond cube-like thing.
  
  fs.writeFileSync('temp_icons.json', JSON.stringify(result, null, 2));
  console.log("Written!");
})();
