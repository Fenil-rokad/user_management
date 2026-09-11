# User Management

A simple **User Management CRUD application** built using **Node.js, Express.js, MySQL, and EJS**.

This project demonstrates how to perform Create, Read, Update, and Delete (CRUD) operations using Node.js with a MySQL database.

## 🚀 Features

* Create a new user
* View all users
* Edit user details
* Delete users
* UUID-based user IDs
* MySQL database integration
* EJS templates for the frontend
* Method Override for PATCH and DELETE requests
* Environment variables for database configuration

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **MySQL**
* **MySQL2**
* **EJS**
* **UUID**
* **Method Override**
* **dotenv**

## 📁 Project Structure

```text
user_management/
│
├── public/             # Static files
├── views/              # EJS templates
│
├── .env                # Environment variables (not committed)
├── .gitignore
├── index.js            # Main application file
├── schema.sql          # MySQL table schema
├── package.json
├── package-lock.json
└── README.md
```

## 🗄️ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE user_app;
```

Select the database:

```sql
USE user_app;
```

Then create the `user` table:

```sql
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(50) NOT NULL
);
```

The same schema is available in `schema.sql`.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_app
```

> **Important:** Never commit the `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`:

```gitignore
node_modules/
.env
```

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Fenil-rokad/user_management.git
```

Move into the project directory:

```bash
cd user_management
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Application

Start the server:

```bash
node index.js
```

The application will run on:

```text
http://localhost:8089
```

## 🔗 Routes

| Method | Route            | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/`              | Home page           |
| GET    | `/user`          | Display all users   |
| GET    | `/user/add`      | Show add-user form  |
| POST   | `/user`          | Create a user       |
| GET    | `/user/:id/edit` | Show edit-user form |
| PATCH  | `/user/:id`      | Update a user       |
| DELETE | `/user/:id`      | Delete a user       |

## 🔄 CRUD Operations

### Create

A new user is created using:

```text
POST /user
```

### Read

All users are retrieved using:

```text
GET /user
```

### Update

A user's information is updated using:

```text
PATCH /user/:id
```

### Delete

A user is deleted using:

```text
DELETE /user/:id
```

## 📌 Learning Goals

This project is built for learning and practicing:

* Express routing
* RESTful routes
* CRUD operations
* MySQL queries
* Parameterized SQL queries
* EJS templating
* Form handling
* HTTP methods
* UUID generation
* Environment variables
* Node.js and MySQL integration

## 👨‍💻 Author

**Fenil Rokad**

GitHub: [Fenil-rokad](https://github.com/Fenil-rokad)

---

⭐ If you found this project useful, consider giving it a star!
