# 🛒 SmartCore

> A full-stack e-commerce and delivery management platform built with the MERN stack.

**SmartCore** is a full-stack e-commerce application designed to manage the complete online shopping and order-delivery workflow. The project includes customer management, product and inventory management, order processing, authentication, payment handling, and administrative functionality.

The project is currently **under active development** and has **not been deployed yet**.

---

## 🚧 Project Status

**Status: In Development**

SmartCore is currently being developed and refined. Core functionality is being implemented, while the architecture and integrations continue to evolve.

Deployment will be added once the application reaches a stable release.

---

## ✨ Features

### 👤 Authentication & User Management

* User registration and login
* Account verification
* Password reset and recovery
* Password change
* Profile management
* Profile picture uploads
* Account activation/deactivation
* Role-based authorization
* Secure authentication using cookies/tokens

### 🛍️ Products & Inventory

* Product management
* Product categories
* Product images
* Stock management
* Product availability
* Inventory tracking
* Admin product management

### 🛒 Orders

* Customer order creation
* Order management
* Order status tracking
* Order details
* Order assignment for delivery
* Delivery workflow
* Cash on Delivery (COD) support

### 💳 Payments

SmartCore is being designed to support multiple payment methods.

Current payment functionality includes work toward:

* M-Pesa payment integration
* Cash on Delivery
* Transaction tracking
* Linking payments to orders
* Payment status management

> Payment integrations are still being developed and tested.

### 📧 Email Services

SmartCore uses email functionality for account-related operations such as:

* Account verification
* Password reset
* Password recovery
* Account reactivation
* Other transactional emails

The email functionality is structured so that email providers and templates can be managed independently from the core application logic.

### ☁️ File & Image Management

Product and user profile images are handled through **Cloudinary**.

The application separates image-upload functionality from the rest of the business logic to make it easier to manage and maintain.

### 👨‍💼 Admin Dashboard

Administrators can manage different aspects of the platform, including:

* Customers
* Products
* Inventory
* Orders
* Payments
* Delivery operations
* User accounts
* Application statistics

### 🚚 Delivery Management

SmartCore includes functionality for managing delivery operations.

Delivery personnel can:

* View orders assigned to them
* Manage delivery-related order status
* Handle Cash on Delivery orders
* Confirm payment where applicable

---

## 🏗️ Architecture

SmartCore follows a layered backend architecture designed to keep business logic separate from HTTP handling and database operations.

```text
smartcore/
│
├── config/
│   └── Configuration and external service setup
│
├── controllers/
│   └── HTTP request/response handling
│
├── middleware/
│   └── Authentication, authorization and request middleware
│
├── models/
│   └── MongoDB/Mongoose data models
│
├── routes/
│   └── API route definitions
│
├── services/
│   └── Application and business logic
│
├── lib/
│   └── Shared utilities and helper functionality
│
├── templates/
│   └── Reusable application templates
│
└── server.js
    └── Application entry point
```

The goal of this structure is to keep controllers lightweight while moving reusable business logic into services.

---

## 🧰 Tech Stack

### Frontend

* React
* JavaScript
* TypeScript
* Tailwind CSS
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication & Security

* Token-based authentication
* HTTP-only cookies
* Role-based authorization
* Password hashing
* Account verification

### External Services

* Cloudinary — image and file management
* M-Pesa — payment integration
* Email service provider — transactional emails

### Development Tools

* Git
* GitHub
* npm
* Postman
* Visual Studio Code

---

## 🔐 User Roles

SmartCore is designed around different levels of access.

### Customer

Customers can:

* Create an account
* Manage their profile
* Browse products
* Place orders
* Track orders
* Make payments
* Manage their account

### Delivery Personnel

Delivery personnel can:

* View assigned orders
* Manage delivery operations
* Update delivery status
* Handle COD orders
* Confirm collected payments

### Administrator

Administrators have elevated permissions to:

* Manage users
* Manage products
* Manage inventory
* Manage orders
* Manage payments
* Assign deliveries
* View platform statistics
* Manage user roles and account status

---

## 🔌 API Design

SmartCore uses a RESTful API architecture.

Example API areas include:

```text
/api/auth
/api/users
/api/products
/api/orders
/api/payments
```

The API is protected using authentication and role-based authorization where required.

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB

### Clone the repository

```bash
git clone https://github.com/mwanzia-simon/smartcore.git
```

Navigate into the project:

```bash
cd smartcore
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
```

Additional environment variables may be required as more integrations are implemented.

> Never commit your `.env` file or expose API keys, secrets, or credentials in the repository.

---

## ▶️ Running the Application

Start the development server with:

```bash
npm run dev
```

Or, depending on the project's scripts:

```bash
npm start
```

The application will run locally at:

```text
http://localhost:5000
```

---

## 🧪 Testing

API endpoints can be tested during development using tools such as **Postman**.

Testing currently focuses on:

* Authentication
* Authorization
* User management
* Product management
* Orders
* Payment workflows
* External service integrations

---

## 🗺️ Roadmap

Planned improvements include:

* [ ] Complete M-Pesa payment integration
* [ ] Complete payment transaction tracking
* [ ] Finalize delivery management workflow
* [ ] Complete Cloudinary integration
* [ ] Improve inventory management
* [ ] Expand admin dashboard
* [ ] Add comprehensive API validation
* [ ] Improve automated testing
* [ ] Add production error monitoring
* [ ] Deploy frontend
* [ ] Deploy backend
* [ ] Configure production database
* [ ] Configure production environment variables

---

## 🎯 Project Goals

SmartCore is being developed to provide practical experience with:

* Full-stack application development
* MERN stack architecture
* REST API development
* Authentication and authorization
* Database design
* Third-party API integrations
* Payment processing
* File and image management
* Role-based systems
* Scalable backend architecture
* Clean and maintainable code

---

## 📚 What I'm Learning Through SmartCore

This project is more than just an e-commerce application. It is also a practical learning project where I am exploring how to design and build a complete full-stack system.

Some of the concepts I'm working with include:

* Separation of concerns
* Service-layer architecture
* Dependency management
* API design
* Secure authentication
* Authorization and permissions
* Database relationships
* External service integrations
* Error handling
* Maintainable project structure

---

## 🚀 Deployment

SmartCore is **not currently deployed**.

Deployment will be added after the application reaches a stable development milestone.

---

## 👨‍💻 Author

**Simon Mwanzia**

MERN Stack Developer & IT Student

GitHub: https://github.com/mwanzia-simon

---

## 📄 License

This project is currently being developed as a personal project.

License information will be added when the project reaches its initial release.

---

⭐ If you're interested in the project, feel free to follow its development as SmartCore continues to evolve.
