# 📌 Monorepo: Frontend & Backend

This repository contains both the **backend** (NestJS) and **frontend** (React/Next.js).

---

## 📍 Backend (NestJS)

### 📌 Overview

The backend is built using **NestJS**, a progressive Node.js framework for building scalable applications. It provides:

- **Authentication** (JWT + Refresh Tokens)
- **Sign Up**
- **Sign In**
- **Refresh access token** : to prevent user from logging in every time access token is expired by securely saving refresh token in DB after hashing it
- **Protected route to get current user data** : by default any route will be added will be protected
- **logout**
- **Logging**
- **Database Integration (MongoDB)**

### 📌 Deployment

- This app is deployed to this base URL : https://authmodule-wy2v.onrender.com  
  but it sleeps after 15 mins of inactivity so please wait for 1 min for first req only

### 🚀 Running the Backend Locally

#### 1- Install Dependencies

```sh
cd back-end
npm install
```

#### 2- Create a .env file in the back-end/ folder and add env variables that will be shared through email

#### 3- Start the server

```sh
npm run start:dev
```

### 📌 Routes

You can view all supported routes through this postman collection : https://documenter.getpostman.com/view/20648191/2sAYdoGTRi

## 📍 Frontend (React/Next.js)

### 📌 Overview

The frontend is built using **React/Next.js**, It has:

- **Sign Up Page**
- **Sign In Page**
- **Home Page** : to show user data if user logged in and also log out

### 📌 Deployment

- This app is deployed to this base URL : https://auth-module-mu.vercel.app/

### 🚀 Running the Front end Locally

#### 1- Install Dependencies

```sh
cd front-end
npm install
```

#### 2- Create a .env.local file in the front-end/ folder and add env variables that will be shared through email

#### 3- Start the server

```sh
npm run dev
```
