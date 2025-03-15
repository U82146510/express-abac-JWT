# 🚀 Express-ABAC Authentication Example

This is an **Attribute-Based Access Control (ABAC) authentication system** built using **Express.js**, **MongoDB**, and **JSON Web Tokens (JWT)**. The project demonstrates **how to secure API routes with ABAC rules**.

## 📌 Features
- 🔐 **JWT-based authentication**
- 🛡️ **ABAC (Attribute-Based Access Control)**
- 💾 **MongoDB integration with Mongoose**
- 🚀 **Built using TypeScript**
- 🎯 **Uses `ts-node` for development**

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/express-abac.git
cd express-abac
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:
MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secret_key
PORT=5000
4️⃣ Start the Server
ts-node index.ts

Note: Ensure MongoDB is running locally or provide a remote connection string.
🔑 Authentication Flow

    User logs in → Receives a JWT token.
    Token is stored in cookies or sent in the Authorization header.
    Middleware extracts token and validates user attributes.
    ABAC rules determine if access is granted to requested resources.
