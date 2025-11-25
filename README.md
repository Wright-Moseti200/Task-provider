📋 Task Provider

A web application designed to connect users who need tasks completed with reliable providers. This platform facilitates task creation, assignment, and management, creating a streamlined marketplace for services.

✨ Features

User Authentication: Secure login and registration for both Task Posters and Task Providers.

Create Tasks: Users can post new tasks with descriptions, budgets, and deadlines.

Browse Tasks: Providers can filter and search for available tasks.

Dashboard: A personalized view for users to manage their posted jobs or active assignments.

Status Updates: Track the progress of tasks (Pending, In Progress, Completed).

Responsive Design: Optimized for mobile and desktop experience using Tailwind CSS.

🛠️ Tech Stack

Frontend: React.js

Styling: Tailwind CSS

Backend: Node.js & Express.js

Database: MongoDB

State Management: React Context API

📂 Project Structure

Task-provider/
├── client/              # Frontend React Application
│   ├── src/
│   │   ├── components/  # Reusable UI components (Cards, Navbar)
│   │   ├── pages/       # Main pages (Home, Dashboard, TaskDetails)
│   │   └── context/     # Global state management
│   └── public/
├── server/              # Backend Node/Express API
│   ├── models/          # Mongoose Database Models (User, Task)
│   ├── routes/          # API Endpoints
│   ├── controllers/     # Logic for handling requests
│   └── config/          # Database connection
├── package.json         # Root dependencies
└── README.md


🚀 Getting Started

Follow these instructions to run the project locally.

Prerequisites

Node.js installed on your machine.

A MongoDB connection string (Local or Atlas).

Installation

Clone the repository:

git clone [https://github.com/Wright-Moseti200/Task-provider.git](https://github.com/Wright-Moseti200/Task-provider.git)
cd Task-provider


Install Server Dependencies:
Navigate to the server folder (or root if combined):

cd server
npm install


Install Client Dependencies:
Navigate to the client folder:

cd ../client
npm install


Environment Setup:
Create a .env file in the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run the Application:

Start Backend: npm start (inside server/)

Start Frontend: npm start (inside client/)

The app should be live at http://localhost:3000.

📸 Screenshots

(Add screenshots of your application here)

Task Feed

Create Task Modal





🤝 Contributing

Contributions are welcome!

Fork the repository.

Create a feature branch.

Commit your changes.

Push to the branch.

Open a Pull Request.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Wright-Moseti200
