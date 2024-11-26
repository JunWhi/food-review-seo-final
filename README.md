# food-review-seo-final

### README for Business Review App

---

#### **Overview**

The **Business Review App** is a web application that allows users to explore, review, and manage businesses. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, the app supports CRUD operations for businesses and their reviews, with functionalities to calculate average ratings dynamically.

---

#### **Features**

- View a list of businesses.
- Add, update, and delete business entries.
- Post reviews for businesses and view average ratings.
- Edit and delete reviews.
- Dynamic update of average ratings upon adding or removing reviews.
- User-friendly UI using **EJS templates**.

---

#### **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Middleware**: Method Override, Body Parser

---

#### **Getting Started**

Follow the steps below to set up and run the app locally:

##### **1. Prerequisites**

Ensure the following are installed:
- **Node.js** (v14+)
- **MongoDB** (local or cloud-based)

##### **2. Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/business-review-app.git
   cd business-review-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

##### **3. Configuration**

1. Create a `.env` file in the project root and configure the following environment variables:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>
   PORT=7000
   ```

2. Replace `<username>`, `<password>`, `<cluster-url>`, and `<db-name>` with your MongoDB credentials.

##### **4. Run the Application**

Start the server:
```bash
node app.js
```

Visit `http://localhost:7000` in your browser to use the app.

---

#### **Folder Structure**

```
business-review-app/
│
├── models/              # Mongoose schemas for Business and Review
├── views/               # EJS templates for UI rendering
│   ├── businesses/      # Business-related views
│   └── partials/        # Reusable UI components
├── public/              # Static files (CSS, JS, images)
├── app.js               # Main application file
└── package.json         # Project metadata and dependencies
```

---

#### **Key Endpoints**

| HTTP Method | Endpoint                    | Description                      |
|-------------|-----------------------------|----------------------------------|
| GET         | `/`                         | Home page                       |
| GET         | `/business`                 | List all businesses             |
| GET         | `/business/new`             | New business form               |
| POST        | `/business`                 | Add a new business              |
| GET         | `/business/:id`             | View details of a business      |
| GET         | `/business/:id/update`      | Update business form            |
| PUT         | `/business/:id`             | Update business details         |
| DELETE      | `/business/:id`             | Delete a business               |
| POST        | `/business/:id/reviews`     | Add a review for a business     |
| DELETE      | `/business/:id/reviews/:id` | Delete a review                 |

---

#### **Future Improvements**

- Implement user authentication.
- Add a search feature for businesses.
- Enhance the frontend with CSS frameworks (e.g., Bootstrap).
- Add support for file uploads (e.g., business images).

---

#### **License**

This project is licensed under the MIT License. See `LICENSE` for more details.

---

#### **Contact**

For questions or feedback, please reach out to:

- **Name**: Ji Young Jun  
- **Email**: junwhi123@gmail.com

🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀
