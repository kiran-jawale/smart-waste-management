# SmartPeepal 🍃

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**SmartPeepal** is a centralized, full-stack municipal waste management platform designed to digitize sanitation operations. It bridges the communication gap between citizens, waste collectors, and municipal administrators through a transparent, data-driven web interface.

## 🚀 Features

### 🔐 Secure & Role-Based Architecture
* **Stateless Authentication:** Utilizes JWTs stored securely in HTTP-only cookies to prevent XSS vulnerabilities.
* **Hierarchical RBAC:** Strict access controls for four user types: `Citizen`, `Organisation`, `Collector`, and `Admin`.

### 🏙️ Citizen & Organization Portal
* **Grievance Redressal:** Submit detailed sanitation complaints accompanied by photographic evidence.
* **Waste Reporting:** Log localized waste accumulation categorized by type (e-waste, medical, dry, wet) and geographic Area Code.
* **Real-Time Tracking:** Monitor the resolution lifecycle of submitted reports and complaints.

### 🚛 Collector Dashboard
* **Task Allocation:** Dynamically fetch "Scheduled" waste collection tasks filtered by assigned Area Codes.
* **Status Mutation:** Update collection states instantaneously from the field (`Collected`, `Departed`).
* **Visual Verification:** Access high-resolution images of reported waste prior to deployment.

### 🛡️ Administrative Command Center
* **Global Oversight:** Monitor pan-system analytics, including total users, pending complaints, and scheduled reports.
* **User Management:** Execute full CRUD operations on user accounts, including the onboarding of new Collectors.
* **System Safeguards:** Built-in logic prevents administrative deadlocks (e.g., self-deletion lockouts).

## 🛠️ Technology Stack

* **Frontend:** React.js, Vite, Redux Toolkit, Tailwind CSS, React Router DOM.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB, Mongoose (ODM).
* **Middleware & Utilities:** Multer (File Handling), Bcrypt (Cryptography), JSON Web Token (Auth).

## ⚙️ Installation & Setup

### Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/smartpeepal.git](https://github.com/yourusername/smartpeepal.git)
cd smartpeepal
```

### 2. Environment Configuration
Create a .env file in the root directory and configure the following variables:
```PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_super_secret_access_token
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_token
REFRESH_TOKEN_EXPIRY=10d
```

### 3. Install Dependencies
Navigate to both the frontend and backend directories (if separated) or the root directory to install packages.
```
npm install
```

### 4. Run the Application
Start the backend server and frontend development environment simultaneously (assuming concurrently is configured in package.json):
```
npm run dev
```
The application will be available at http://localhost:5173 (Frontend) and http://localhost:8000 (Backend API).

## Project Structure
```
smartpeepal/
├── src/
│   ├── components/       # Reusable UI components (Buttons, Modals, Tables)
│   ├── constants/        # Application-wide constants and configurations
│   ├── contexts/         # React Context providers (ThemeContext)
│   ├── pages/            # Page-level components (Home, Dashboards, Auth)
│   ├── redux/            # Redux store, slices, and asynchronous actions
│   ├── services/         # Axios interceptors and API service layers
│   ├── App.jsx           # Root React component
│   └── main.jsx          # Entry point
├── backend/
│   ├── controllers/      # Business logic and request handling
│   ├── middlewares/      # JWT verification, Multer, Error handling
│   ├── models/           # Mongoose schemas (User, WasteReport, Complaint)
│   ├── routes/           # Express API route definitions
│   ├── utils/            # Helper functions (AsyncHandler, API Response/Error)
│   ├── app.js            # Express application setup
│   └── index.js          # Database connection and server initialization
└── public/               # Static assets and temporary image storage
```

## License
Distributed under the MIT License. See LICENSE for more information.
