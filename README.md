# SalonFlow
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![License](https://img.shields.io/badge/license-MIT-green)

SalonFlow is a modern Beauty Salon Management System designed to simplify daily salon operations. It provides customer management, appointment scheduling, point-of-sale, inventory management, invoicing, reporting, and business settings in one integrated application.

## Features

### Authentication

* Secure user login
* JWT authentication
* Protected application routes

### Dashboard

* Business summary
* Daily statistics
* Revenue overview
* Appointment overview

### Customer Management

* Add customers
* Edit customer information
* Delete customers
* Customer history

### Employee Management

* Add employees
* Edit employee information
* Employee scheduling support

### Service Management

* Manage salon services
* Pricing
* Service duration

### Product Management

* Add products
* Product pricing
* Stock quantities

### Inventory Management

* Stock In
* Stock Out
* Inventory adjustments
* Inventory valuation
* Low stock monitoring

### Appointment Management

* Create appointments
* Edit appointments
* Cancel appointments
* Prevent scheduling conflicts

### Calendar

* Daily appointment calendar
* Previous/Next day navigation
* Appointment status badges
* Service badges
* Click-to-edit appointments

### Checkout / POS

* Create invoices
* Process customer payments
* Automatic stock deduction
* Payment tracking

### Reports

* Sales reports
* Employee sales
* Product sales
* Service sales
* Customer reports
* Inventory reports

### Settings

* Salon information
* Contact details
* Currency
* Tax settings
* Receipt footer

---
## Screenshots

### Login

![Login](screenshots/login.png)

---

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Customers

![Customers](screenshots/customers.png)

---

### Calendar

![Calendar](screenshots/calendar.png)

---

### Checkout

![Checkout](screenshots/checkout.png)

---

### Reports

![Reports](screenshots/reports.png)

# Technology Stack

## Backend

* FastAPI
* SQLAlchemy 2.0 (Async)
* PostgreSQL
* Alembic
* JWT Authentication
* Pydantic

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios

## Deployment

* Backend: Render
* Frontend: Vercel

---

# Project Structure

```text
SalonFlow-v1/

├── backend/
│   ├── app/
│   ├── alembic/
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# Main Modules

* Authentication
* Dashboard
* Customers
* Employees
* Services
* Products
* Inventory
* Appointments
* Calendar
* Checkout / POS
* Invoices
* Reports
* Settings

---

# Screenshots

Screenshots will be added in the next release.

---
## Live Demo

**Frontend (Vercel)**

https://salon-flow-v1.vercel.app/

**Backend API**

https://salonflow-v1.onrender.com/docs

---
# Installation

Please see **INSTALL.md**.

---

# User Guide

Please see **USER_GUIDE.md**.

---

# Changelog

Please see **CHANGELOG.md**.

---

# Version

Current Release:

**SalonFlow v1.0.0**

---

# License

This project is released under the MIT License.

