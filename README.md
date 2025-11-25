# 📋 Task Provider

<div align="center">

**A modern web application connecting task posters with reliable service providers**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com/)


</div>

---

## 🌟 About

Task Provider is a streamlined marketplace platform that bridges the gap between users who need tasks completed and skilled providers ready to deliver. Whether you're looking to outsource a project or find your next gig, Task Provider makes the process seamless and efficient.

## ✨ Features

<table>
<tr>
<td>

### 🔐 User Authentication
- Secure login and registration
- Separate roles for Task Posters & Providers
- JWT-based authorization

</td>
<td>

### 📝 Task Management
- Create tasks with detailed descriptions
- Set budgets and deadlines
- Real-time status tracking

</td>
</tr>
<tr>
<td>

### 🔍 Smart Discovery
- Browse available tasks
- Filter and search functionality
- Category-based organization

</td>
<td>

### 📊 Personal Dashboard
- Manage posted jobs
- Track active assignments
- View task history

</td>
</tr>
<tr>
<td>

### 📈 Status Tracking
- Pending tasks
- In Progress monitoring
- Completed task history

</td>
<td>

### 📱 Responsive Design
- Mobile-first approach
- Tailwind CSS styling
- Optimized for all devices

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **State Management** | React Context API |
| **Authentication** | JWT (JSON Web Tokens) |

</div>

## 📂 Project Structure

```
Task-provider/
│
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/    # Reusable UI components (Cards, Navbar, etc.)
│   │   ├── pages/         # Main pages (Home, Dashboard, TaskDetails)
│   │   ├── context/       # Global state management
│   │   └── App.js         # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Node/Express API
│   ├── models/           # Mongoose Database Models (User, Task)
│   ├── routes/           # API Endpoints
│   ├── controllers/      # Request handling logic
│   ├── middleware/       # Authentication & validation
│   ├── config/           # Database connection
│   └── server.js         # Entry point
│
├── package.json          # Root dependencies
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or Atlas account)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Wright-Moseti200/Task-provider.git
   cd Task-provider
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

5. **Run the Application**

   **Terminal 1 - Start Backend:**
   ```bash
   cd server
   npm start
   ```

   **Terminal 2 - Start Frontend:**
   ```bash
   cd client
   npm start
   ```

6. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

   The backend API will be running on:
   ```
   http://localhost:5000
   ```

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Rating and review system
- [ ] Advanced search filters
- [ ] Mobile application (React Native)
- [ ] Admin dashboard

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Wright Moseti**

- GitHub: [@Wright-Moseti200](https://github.com/Wright-Moseti200)
- Project Link: [Task Provider](https://github.com/Wright-Moseti200/Task-provider)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Wright Moseti

</div>
