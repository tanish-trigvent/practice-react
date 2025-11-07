const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to scrape Google and find website ranking
async function checkRanking(keyword, targetUrl) {
  let browser;
  
  try {
    // Launch browser
    browser = await puppeteer.launch({
      headless: false, // Set to false to see what's happening
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
        '--disable-blink-features=AutomationControlled'
      ]
    });

    const page = await browser.newPage();
    
    // Enhanced bot detection avoidance
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    });
    
    // Override navigator properties to avoid detection
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false
      });
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5]
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
      });
    });
    
    // Navigate to Google search with more results
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=100`;
    console.log('Navigating to:', searchUrl);
    
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait a bit for content to load
    await page.waitForTimeout(2000);

    // Try multiple selectors as Google's HTML can vary
    let searchResultsFound = false;
    const selectors = ['#search', '#rso', 'div[data-async-context]', '.g'];
    
    for (const selector of selectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 });
        searchResultsFound = true;
        console.log(`Found results with selector: ${selector}`);
        break;
      } catch (e) {
        console.log(`Selector ${selector} not found, trying next...`);
      }
    }
    
    if (!searchResultsFound) {
      console.log('No search results found with any selector');
      // Take a screenshot for debugging
      await page.screenshot({ path: 'debug-screenshot.png' });
      throw new Error('Could not find search results. Google may have blocked the request.');
    }

    // Aggressive scrolling to load ALL results
    console.log('Aggressively scrolling to load ALL results...');
    let previousHeight = 0;
    let currentHeight = await page.evaluate('document.body.scrollHeight');
    let scrollAttempts = 0;
    const maxScrollAttempts = 20;
    
    // Keep scrolling until no more content loads or max attempts reached
    while (scrollAttempts < maxScrollAttempts) {
      // Scroll to bottom
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      
      // Wait for new content to load
      await page.waitForTimeout(1500);
      
      // Check if "More results" button exists and click it
      try {
        const moreResultsButton = await page.$('a#pnnext, button[aria-label="More results"]');
        if (moreResultsButton) {
          console.log('Found "More results" button, clicking...');
          await moreResultsButton.click();
          await page.waitForTimeout(2000);
        }
      } catch (e) {
        // No more results button found
      }
      
      // Get new height
      previousHeight = currentHeight;
      currentHeight = await page.evaluate('document.body.scrollHeight');
      
      console.log(`Scroll attempt ${scrollAttempts + 1}: Height ${currentHeight}`);
      
      // If height hasn't changed, try a few more times then break
      if (currentHeight === previousHeight) {
        scrollAttempts++;
        if (scrollAttempts >= 3) {
          console.log('No more content loading, stopping scroll');
          break;
        }
      } else {
        scrollAttempts = 0; // Reset if we found new content
      }
    }
    
    console.log(`Finished scrolling. Final height: ${currentHeight}`);
    
    // Scroll back to top to ensure all content is in DOM
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // Function to extract results from current page with enhanced detection
    const extractResults = () => {
      return page.evaluate(() => {
        const searchResults = [];
        const seenUrls = new Set();
        
        // Strategy 1: Try standard Google result containers
        const possibleSelectors = [
          'div.g',                    // Classic result div
          '.MjjYud',                  // Modern result div
          '#rso .g',                  // Results in search output
          '#search .g',               // Results in search container
          'div[data-sokoban-container]',
          '#rso > div',
          'div[jscontroller][lang]'   // Another Google structure
        ];
        
        let allElements = [];
        
        // Collect all possible result containers
        for (const selector of possibleSelectors) {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            console.log(`Selector "${selector}" found ${elements.length} elements`);
            allElements.push(...Array.from(elements));
          }
        }
        
        // Remove duplicates based on position
        const uniqueElements = Array.from(new Set(allElements));
        console.log(`Total unique elements to process: ${uniqueElements.length}`);
        
        // Strategy 2: Also try direct h3 > a approach (most reliable)
        const allLinks = document.querySelectorAll('h3 a, h3 > a, .yuRUbf a');
        console.log(`Found ${allLinks.length} links via h3/yuRUbf approach`);
        
        // Process all h3 links first (most reliable)
        allLinks.forEach((linkElement) => {
          if (linkElement && linkElement.href) {
            let href = linkElement.href;
            
            // Get the title from h3 or parent
            const h3 = linkElement.closest('h3') || linkElement.querySelector('h3') || 
                       linkElement.parentElement?.querySelector('h3');
            const title = h3 ? h3.textContent.trim() : linkElement.textContent.trim();
            
            if (!title || title.length < 3) return; // Skip if no valid title
            
            // Handle Google redirect URLs
            if (href.includes('/url?q=')) {
              try {
                const urlParams = new URLSearchParams(href.split('?')[1]);
                const actualUrl = urlParams.get('q');
                if (actualUrl) href = actualUrl;
              } catch (e) { /* ignore */ }
            }
            
            // Filter and validate
            if (href.startsWith('http') && 
                !href.includes('google.com/search') && 
                !href.includes('webcache.googleusercontent') &&
                !href.includes('accounts.google.com') &&
                !href.includes('support.google.com') &&
                !seenUrls.has(href)) {
              
              seenUrls.add(href);
              searchResults.push({
                url: href,
                title: title,
                displayUrl: href.split('?')[0]
              });
            }
          }
        });
        
        console.log(`Extracted ${searchResults.length} valid results`);
        return searchResults;
      });
    };

    // Extract results from first page
    let allResults = await extractResults();
    console.log(`Extracted ${allResults.length} results from page 1`);

    // Try to load more pages (up to 5 pages total = 50+ results per page = 250+ results)
    const maxPages = 5;
    let currentPage = 1;
    
    while (currentPage < maxPages) {
      try {
        // Look for "Next" button
        const nextButton = await page.$('a#pnnext');
        
        if (nextButton) {
          console.log(`Navigating to page ${currentPage + 1}...`);
          await nextButton.click();
          await page.waitForTimeout(3000); // Wait for page to load
          
          // Scroll this page too
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await page.waitForTimeout(1500);
          
          // Extract results from this page
          const pageResults = await extractResults();
          console.log(`Extracted ${pageResults.length} results from page ${currentPage + 1}`);
          
          allResults = allResults.concat(pageResults);
          currentPage++;
        } else {
          console.log('No more pages available');
          break;
        }
      } catch (e) {
        console.log(`Could not load page ${currentPage + 1}:`, e.message);
        break;
      }
    }

    // Remove duplicates and assign rankings
    const uniqueUrls = new Set();
    const results = [];
    
    allResults.forEach((result) => {
      if (!uniqueUrls.has(result.url)) {
        uniqueUrls.add(result.url);
        results.push({
          ...result,
          rank: results.length + 1
        });
      }
    });
    
    console.log(`\n🔍 Total unique results extracted: ${results.length} (from ${currentPage} pages)`);
    
    // Log all extracted results for debugging
    console.log('\n=== TOP 20 EXTRACTED RESULTS ===');
    results.slice(0, 20).forEach((result, index) => {
      const domain = result.url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
      console.log(`#${result.rank} | ${domain.padEnd(30)} | ${result.title.substring(0, 50)}`);
    });
    console.log('================================\n');

    await browser.close();

    // Enhanced URL normalization and matching
    const normalizeUrl = (url) => {
      return url.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .trim();
    };

    // Extract domain from URL
    const extractDomain = (url) => {
      const normalized = normalizeUrl(url);
      const domain = normalized.split('/')[0]; // Get just the domain part
      return domain;
    };

    const normalizedTarget = normalizeUrl(targetUrl);
    const targetDomain = extractDomain(targetUrl);
    
    console.log(`\n🎯 SEARCHING FOR TARGET:`);
    console.log(`   Input URL: "${targetUrl}"`);
    console.log(`   Normalized: "${normalizedTarget}"`);
    console.log(`   Domain: "${targetDomain}"`);
    console.log(`\n📊 Comparing with ${results.length} results...\n`);

    // Find the ranking with improved matching
    let ranking = null;
    let foundResult = null;

    for (const result of results) {
      const normalizedResultUrl = normalizeUrl(result.url);
      const resultDomain = extractDomain(result.url);
      
      // Multiple matching strategies
      const exactDomainMatch = resultDomain === targetDomain;
      const domainContainsTarget = resultDomain.includes(targetDomain);
      const targetContainsDomain = targetDomain.includes(resultDomain);
      const urlStartsWithTarget = normalizedResultUrl.startsWith(normalizedTarget);
      const urlContainsTarget = normalizedResultUrl.includes(normalizedTarget);
      
      if (exactDomainMatch || domainContainsTarget || targetContainsDomain || urlStartsWithTarget || urlContainsTarget) {
        console.log(`\n✅ ✅ ✅ MATCH FOUND! ✅ ✅ ✅`);
        console.log(`   Rank: #${result.rank}`);
        console.log(`   Title: ${result.title}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Domain: ${resultDomain}`);
        console.log(`   Match Type: ${exactDomainMatch ? 'EXACT DOMAIN' : domainContainsTarget ? 'CONTAINS TARGET' : 'OTHER'}`);
        console.log(`================================\n`);
        
        ranking = result.rank;
        foundResult = result;
        break;
      }
    }
    
    if (!ranking) {
      console.log(`\n❌ ❌ ❌ NO MATCH FOUND ❌ ❌ ❌`);
      console.log(`   Searched for: "${targetDomain}"`);
      console.log(`   In ${results.length} results across ${currentPage} pages`);
      console.log(`   Please check if the domain appears in the list above`);
      console.log(`================================\n`);
    }

    return {
      success: true,
      keyword,
      targetUrl,
      ranking,
      foundResult,
      totalResults: results.length,
      pagesSearched: currentPage,
      allResults: results // Return ALL results so user can see full list
    };

  } catch (error) {
    console.error('Error during scraping:', error);
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

// API endpoint to check ranking
app.post('/api/check-ranking', async (req, res) => {
  try {
    const { keyword, targetUrl } = req.body;

    if (!keyword || !targetUrl) {
      return res.status(400).json({
        success: false,
        error: 'Both keyword and targetUrl are required'
      });
    }

    console.log(`Checking ranking for: ${targetUrl} with keyword: ${keyword}`);
    
    const result = await checkRanking(keyword, targetUrl);
    
    res.json(result);
  } catch (error) {
    console.error('Error in /api/check-ranking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to check ranking. Please try again.',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

