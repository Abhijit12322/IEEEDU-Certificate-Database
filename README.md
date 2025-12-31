# 🎓 Certificate Database Web Application

This web application allows users to **search and retrieve certificate details** stored in a Google Sheet. Built with **Next.js** for a modern frontend and **Flask** as the backend API, the app fetches and displays participant certificate data based on user input.


🔗 **Live Demo**: [https://web-zeta-kohl-63.vercel.app/](https://web-zeta-kohl-63.vercel.app/)

🔗 **Backend Source Code**: [https://github.com/Abhijit12322/IEEEDU-AdminCertificate.git](https://github.com/Abhijit12322/IEEEDU-AdminCertificate.git)

---

## ✅ Features

- 🔍 **Real-Time Search**: Quickly find certificate details using name, ID, or other keywords.
- 📊 **Google Sheets Backend**: Seamlessly fetches data from a connected spreadsheet.
- ⚡ **Fast and Lightweight**: Built with performance in mind using Next.js.
- 🌐 **Hosted on Vercel**: Deployed for public access with fast load times and global availability.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Flask](https://flask.palletsprojects.com/)
- **Database**: [Google Sheets](https://www.google.com/sheets/about/)
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/)

---


## ⚙️ How It Works

1. User enters a serial number or name in the search bar.
2. Frontend sends request to Flask backend at `/participants`.
3. Backend fetches records from the Google Sheet.
4. Matching results are returned and displayed in a dynamic table.

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
