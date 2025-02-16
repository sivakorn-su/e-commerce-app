# 🛍️ E-Commerce

A modern NestJS application for managing products and orders with CSV export capabilities.

## ✨ Features

1. 📦 **Create Product**

   - Add new products to the system with detailed information
   - Manage product inventory and details

2. 📊 **Export Products**

   - Export complete product catalog to CSV format
   - Generate reports for inventory management

3. 🛒 **Create Order**
   - Create new customer orders
   - Add multiple products to a single order
   - Track order status and details

## 🛠️ Technologies Used

- 🏗️ **NestJS**: Modern, efficient Node.js framework
- 🗄️ **MySQL**: Reliable relational database
- 🔄 **TypeORM**: Powerful database ORM
- 📄 **CSV Export**: Data export functionality
- 🔐 **JWT Authentication**: Secure API access

## 📋 Prerequisites

Before you begin, ensure you have installed:

- 📦 **Node.js** (v16 or higher)
- 🗃️ **MySQL**

Verify your installations with:

```bash
node -v
mysql -V
```

## 🚀 Installation

### 1. Clone the Repository

Download the project by clicking the link or use Git:

```bash
git clone https://github.com/yourusername/e-commerce-app.git
cd e-commerce-app
```

### 2. Environment Setup

Create your environment configuration by copying the example file:

```bash
cp .env.example .env
```

Update your `.env` file with these database settings:

```env
DB_HOST=localhost
DB_PORT=3307
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=e-commerce
DB_SYNCHRONIZE=true
```

### 3. Database Setup

Connect to MySQL and create a new database:

```bash
mysql -u root -p
```

Once connected, create the database:

```sql
CREATE DATABASE `e-commerce`;
EXIT;
```

Note: With `DB_SYNCHRONIZE=true`, TypeORM will automatically create and update database tables based on your entities. While this is convenient for development, consider setting it to `false` in production and using migrations instead.

The application will automatically:

- Connect to MySQL on port 3307
- Use root user with no password
- Create/update tables in the `e-commerce` database
