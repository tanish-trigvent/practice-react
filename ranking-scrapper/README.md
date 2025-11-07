# 🔍 Google Ranking Checker

A full-stack web application that scrapes Google search results to find and display the ranking position of your website for specific keywords.

## 🌟 Features

- **Real-time Ranking Check**: Instantly check where your website ranks on Google for any keyword
- **Modern UI**: Beautiful, responsive interface built with React
- **Top 100 Results**: Searches through up to 100 Google search results
- **Detailed Results**: Shows the exact position, title, and URL of your website
- **Top 10 Preview**: Displays the top 10 search results for reference
- **User-Friendly**: Simple input form with loading states and error handling

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **Puppeteer** for web scraping
- **CORS** enabled for API access

### Frontend
- **React 18**
- **Axios** for API requests
- Modern CSS with gradients and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## 🚀 Installation

### 1. Clone or navigate to the project directory

```bash
cd D:\Tanish\DootBuddy\practice-react\ranking-scrapper
```

### 2. Install all dependencies

Run this command to install both backend and frontend dependencies:

```bash
npm run install-all
```

Or install them separately:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## 💻 Usage

### Option 1: Run both servers simultaneously (Recommended)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Option 2: Run servers separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Accessing the Application

Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
```

## 📖 How to Use

1. **Enter a Search Keyword**: Type the keyword you want to check rankings for (e.g., "best coffee shops in NYC")

2. **Enter Your Website URL**: Input your website URL. You can use various formats:
   - `example.com`
   - `www.example.com`
   - `https://example.com/page`

3. **Click "Check Ranking"**: The app will scrape Google search results and find your website's position

4. **View Results**: 
   - If found, you'll see the exact rank number, title, and URL
   - You'll also see the top 10 search results for reference
   - If not found, you'll get a notification that your site isn't in the top 100 results

## 🎨 Screenshots

The application features:
- A beautiful gradient purple background
- Clean white card design with rounded corners
- Responsive layout that works on all devices
- Smooth animations and hover effects
- Clear result display with ranking badges

## ⚙️ API Endpoints

### POST `/api/check-ranking`

Check the ranking of a website for a specific keyword.

**Request Body:**
```json
{
  "keyword": "your search keyword",
  "targetUrl": "your-website.com"
}
```

**Response:**
```json
{
  "success": true,
  "keyword": "your search keyword",
  "targetUrl": "your-website.com",
  "ranking": 5,
  "foundResult": {
    "rank": 5,
    "url": "https://your-website.com",
    "title": "Page Title",
    "displayUrl": "https://your-website.com"
  },
  "totalResults": 100,
  "allResults": [...]
}
```

### GET `/api/health`

Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🔧 Configuration

You can customize the port by creating a `.env` file in the root directory:

```env
PORT=5000
```

The React app is configured to proxy API requests to the backend server automatically.

## ⚠️ Important Notes

### Legal and Ethical Considerations

- **Use Responsibly**: This tool scrapes Google search results, which should be done responsibly
- **Terms of Service**: Be aware of Google's Terms of Service regarding automated access
- **Rate Limiting**: Don't make too many requests in a short period
- **For Educational/Personal Use**: This tool is intended for educational and personal use

### Technical Limitations

- **Puppeteer Browser**: The first run might take longer as Puppeteer downloads Chromium
- **Dynamic Results**: Google search results can vary based on location, personalization, and time
- **Scraping Reliability**: Google's HTML structure may change, which could affect scraping accuracy
- **Performance**: Each check takes a few seconds as it loads and parses actual Google pages

## 🐛 Troubleshooting

### Puppeteer Installation Issues

If Puppeteer fails to install or run:

```bash
# On Windows, you might need to install additional dependencies
npm install --save-dev puppeteer

# On Linux, you might need:
sudo apt-get install -y libgbm-dev
```

### Port Already in Use

If port 5000 or 3000 is already in use:

1. Change the backend port in `.env` file
2. Update the proxy in `client/package.json` to match

### CORS Issues

Make sure the backend is running before starting the frontend, as the frontend proxies API requests to the backend.

## 📁 Project Structure

```
ranking-scrapper/
├── server/
│   └── index.js          # Express server with scraping logic
├── client/
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Component styles
│   │   ├── index.js      # React entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Frontend dependencies
├── package.json          # Backend dependencies
├── .gitignore
└── README.md
```

## 🚀 Future Enhancements

Potential features to add:
- Historical ranking tracking
- Multiple keyword checking at once
- Export results to CSV
- Different search engines (Bing, Yahoo, etc.)
- Scheduled automated checks
- Email notifications
- User authentication and saved searches
- Competitor comparison

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy Ranking Checking! 🎯**

