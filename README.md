# 🎓 Certificate Database Web Application

This web application allows users to **search and retrieve certificate details** from a structured Excel sheet. Built with **Next.js** for a fast and modern frontend, the app reads directly from a `.xlsx` file to present relevant certificate data in real-time based on user input.

🔗 **Live Demo**: [https://web-zeta-kohl-63.vercel.app/](https://web-zeta-kohl-63.vercel.app/)

---

## ✅ Features

- 🔍 **Real-Time Search**: Quickly find certificate details using name, ID, or other keywords.
- 📊 **Excel-Based Database**: Reads directly from a raw `data.xlsx` file.
- ⚡ **Fast and Lightweight**: Built with performance in mind using Next.js.
- 🌐 **Hosted on Vercel**: Deployed for public access with fast load times and global availability.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Data Source**: Excel (`.xlsx`) file
- **Excel Parser**: [SheetJS (xlsx)](https://www.npmjs.com/package/xlsx)
- **Deployment**: [Vercel](https://vercel.com/)

---


## ⚙️ How It Works

1. User enters a query (name, ID, etc.) into the search bar.
2. The app reads and parses the `data.xlsx` file using a JavaScript-based Excel parser.
3. Matching entries are filtered and displayed in real-time on the web page.

---

## 📦 Installation & Development

If you want to run this project locally:

```bash
# Clone the repo
git clone https://github.com/Abhijit12322/IEEEDU-Certificate-Database.git

# Install dependencies
npm install

# Run the development server
npm run dev
