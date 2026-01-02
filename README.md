# 🎯 AI E-Commerce Vision — ShopZap

**AI E-Commerce Vision (ShopZap)** is a modern AI-powered e-commerce web app built with **Next.js**, **React**, **Tailwind CSS**, and the **Vercel AI SDK**.  
It delivers an intelligent shopping experience with features like product search, personalized recommendations, AI chat support, and responsive UI — deployed on **Vercel**.

🔗 Live Demo: https://ai-ecommerce-vision.vercel.app/

---

## 🚀 Features

### 🛍️ Core Shopping
- Responsive product catalog with categories
- Product detail pages
- Add to cart & cart summary
- Checkout UI (UI only — backend logic optional)

### 🤖 AI-Driven Experience
- AI Chat / Assistant for customer support
- Natural language product search
- Personalized suggestions
- Context-aware recommendations

### 📦 Tech Stack
- **Next.js (App Router)**
- **Vercel AI SDK** for conversational and generative AI features :contentReference[oaicite:0]{index=0}
- **React** & **Tailwind CSS**
- (Optional) **Database** integration via API (e.g., Prisma + Neon)

---

## 📁 Project Structure


📦 app
┣ 📂 api
┃ ┗ 📂 ai
┃ ┗── route.js # AI chat / tool API
┣ 📜 page.jsx # Main UI (home + shop)
┣ 📜 cart.jsx # Cart UI
┗📜 product/[id].jsx # Product details

📦 components
┣── Navbar.jsx
┣── ProductCard.jsx
┣── Footer.jsx
┗── AIChat.jsx

📦 lib
┣── aiConfig.js # Vercel AI SDK config
┗── productTools.js # Tools for AI / DB

📦 styles
┗── globals.css

📦 prisma/ (optional)
┗── schema.prisma


---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/ai-ecommerce-vision.git
cd ai-ecommerce-vision

2️⃣ Install dependencies
npm install
# or
pnpm install
# or
yarn

3️⃣ Add Environment Variables

Create a .env.local file:

NEXT_PUBLIC_VERCEL_ENV=production
AI_PROVIDER_API_KEY=your_api_key
DATABASE_URL=your_db_connection (optional)


The AI features require API keys from your LLM provider (e.g., OpenAI, Google Gemini via Vercel AI). 
Medium

4️⃣ Run locally
npm run dev
# or
pnpm dev
# or
yarn dev


Visit http://localhost:3000

🧠 AI Chat Integration

This project uses Vercel AI SDK to power the chat & intelligent search features. It handles tool calls and prompts at the edge for low-latency responses. 
Medium

Edit the system prompt:

// app/api/ai/route.js
export const config = {
  runtime: "edge",
};

export async function POST(request) {
  // … AI logic using Vercel AI SDK
}


Customize it based on your product database and use case.

📦 Deployment

This app is optimized for deployment on Vercel:

Push code to GitHub

Connect repo in Vercel dashboard

Add environment variables in Vercel

Deploy — Vercel auto builds & serves

🧩 Environment Variables
Key	Description
AI_PROVIDER_API_KEY	API Key for your AI model provider
NEXT_PUBLIC_BASE_URL	Frontend base URL
DATABASE_URL	DB connection (if using Prisma)
🙌 Contributing

Contributions are welcome!

Fork the repo

Create a new branch

Open a Pull Request

📄 License

MIT License © [Ajay Badugu]
