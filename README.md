## Chatbot with MindsDB

Using mdb.ai to fetch chat response from AI.


# DEMO
https://github.com/user-attachments/assets/43c79dfc-7f28-4496-83b1-c519df1eaae6


# Installation
1. Clone the repository:
```bash
git clone https://github.com/priyanshuverma-dev/mdb-chat.git
```

2. Install dependencies:
```bash
cd server && npm install
cd ..
cd client && npm install
```

3. Configure environment variables:

Create a .env file in the server directory and provide the following variables:
Get API from https://mdb.ai/minds
```env
MINDS_DB_API=api_key
```

Usage
Start the server:
```bash
cd server
npm run server
```

Start client:
```bash
cd client
npm run dev
```

4. Open your browser and navigate to http://localhost:5173.
5. Chat with AI

