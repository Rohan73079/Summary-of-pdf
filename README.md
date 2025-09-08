# 📑 AI Summary Generator

An AI-powered web application that extracts text from **PDFs and images** and generates summaries in different styles and lengths using **Google Gemini API**.  
The app supports **dark/light mode, drag & drop uploads, history of summaries, download as PDF, and copy to clipboard**.

🔗 **Live Demo:** [AI Summary Generator](https://document-ai-summary-frontend.vercel.app/)  
📦 **GitHub Repo:** [Summary-of-pdf](https://github.com/Rohan73079/Summary-of-pdf)

---

## 🚀 Features

- 📂 **Upload PDF/Image** → Extracts text automatically  
- ✍️ **AI Summaries** → Short / Medium / Long  
- 📌 **Summary Styles** → Paragraph, Bullet Points, Keywords  
- 🌙 **Dark/Light Mode** → Toggle theme  
- 📜 **History** → Stores last 5 summaries (local storage)  
- 📥 **Download** → Export summary as PDF  
- 📋 **Clipboard Copy** → Copy summary with one click  
- 🖱️ **Drag & Drop** → Easy file upload  

---

## 🛠️ Tech Stack

- **Frontend** → React + Vite  
- **Styling** → TailwindCSS + Lucide Icons  
- **AI** → Google Gemini API  
- **PDF Handling** → pdf.js (extract text), jsPDF (download)  
- **State Management** → React Hooks + Local Storage  

---

## 📸 Screenshots

### 🖥️ Main Dashboard
<img width="2239" height="1200" alt="image" src="https://github.com/user-attachments/assets/dd581000-6948-41eb-93fc-6fd01de50142" />
<img width="2219" height="1198" alt="image" src="https://github.com/user-attachments/assets/d570d16b-f6c8-489d-bed9-457745169bab" />


### 🌙 Dark Mode
<img width="2239" height="1201" alt="image" src="https://github.com/user-attachments/assets/e13490cb-b5da-48db-8603-59429114dad2" />
<img width="2239" height="1207" alt="image" src="https://github.com/user-attachments/assets/6f495d80-7609-44d4-bd92-975fb45e2411" />

---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/Rohan73079/Summary-of-pdf.git
   cd Summary-of-pdf
Install dependencies

npm install


Set up Environment Variables
Create a .env file in the root folder and add your Gemini API key:

VITE_GEMINI_API_KEY=your_api_key_here


Run the development server

npm run dev


Build for production

npm run build

📡 API Usage (Gemini)

This project uses the Google Gemini API to generate summaries.

Input: Extracted text from PDF/Image

Output: Summary (short/medium/long, paragraph/bullet/keywords style)

📂 Project Structure
ai-summary-generator/
│── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main App component
│   └── main.jsx       # Entry point
│── public/            # Static assets
│── package.json
│── vite.config.js
│── README.md

🧪 Future Enhancements

🌍 Multi-language summarization

🔐 Authentication & user accounts

☁️ Cloud storage for summaries

🎤 Voice input & Text-to-Speech output

📊 Analytics dashboard for usage tracking

🤝 Contributing

Contributions are welcome! Please fork the repo and create a PR.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Rohan Kumar

GitHub: @Rohan73079

LinkedIn: nkedin.com/in/rohan-singh-16019a31a/

Live Project: Document AI Summary Generator
