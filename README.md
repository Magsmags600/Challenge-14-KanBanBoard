# Kanban Board with Secure Authentication

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
This project is a web-based Kanban board application designed to offer task management with secure authentication. Users can create, view, and manage tasks within an organized board interface. The application implements secure user authentication using JSON Web Tokens (JWT) to ensure data protection and session management.

## Features
- **Secure Login Page**: A login interface with fields for username and password.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Error Handling**: Displays error messages when login credentials are incorrect.
- **Persistent Sessions**: Stores JWT in client-side local storage for seamless user sessions.
- **Session Management**: Automatically logs out users after a period of inactivity.
- **Access Control**: Redirects unauthenticated users to the login page when they attempt to access the Kanban board.
- **Logout Functionality**: Clears the JWT from local storage and redirects users to the login page upon logging out.

## Technologies Used
- **Frontend**:
  - HTML, CSS, JavaScript
  - React.js (or any modern frontend framework)
- **Backend**:
  - Node.js
  - Express.js
- **Authentication**:
  - JSON Web Tokens (JWT)

- **Other**:
  - Local Storage for client-side token management

## Installation
# Install server dependencies
cd server
npm install

# Usage

Login: Access the login page and enter your username and password.
Authentication: Upon successful login, the JWT is generated and stored in local storage.
Access the Kanban Board: After logging in, you will be redirected to the Kanban board page.
Error Handling: If invalid credentials are entered, an error message is displayed.
Session Management: If you remain inactive for a defined period, your session will expire, and you will be redirected to the login page.
Logout: Click the logout button to remove the JWT from local storage and return to the login page.

# Project Structure
kanban-board-auth/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md

# Install client dependencies
cd ../client
npm install

## links 
# use these user/passwords:   
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },

- https://challenge-14-kanbanboard.onrender.com
- https://github.com/Magsmags600/Challenge-14-KanBanBoard
