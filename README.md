# 🍔 Food Order Web Application

> A modern, complete food ordering system with real-time order management and beautiful responsive design.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-ff69b4?style=flat)](https://www.framer.com/motion/)

## 🎯 Overview

This is a full-featured food ordering web application that allows customers to browse menu items, customize their orders, and track them in real-time. The admin panel provides comprehensive order management with date filtering and status control.

## ✨ Features

### 👤 Customer Experience

- 🍕 **Multi-Category Menu**: Browse Burgers, Pizzas, and Noodles with detailed customization
- 🛒 **Smart Shopping Cart**: Add, remove, modify items with real-time price calculation
- 💳 **Flexible Payment**: Support for PromptPay QR code and Cash on Delivery
- 📱 **Order Tracking**: Real-time status updates with estimated completion time
- 📝 **Custom Notes**: Add special requests and dietary preferences
- 🎨 **Responsive Design**: Seamless experience across all devices
- 🔔 **Notifications**: Beautiful success messages and confirmations

### 👨‍💼 Admin Dashboard

- 📊 **Real-time Analytics**: Live order statistics and pending count
- 🔄 **Status Management**: Manual order progression through all stages
- 📅 **Date Filtering**: View today's orders or complete history
- 👥 **Customer Info**: Full customer details and payment method tracking
- ⏱️ **Completion Tracking**: Automatic timestamps for completed orders
- 🎯 **Order Prioritization**: Newest orders displayed first
- 🔐 **Secure Access**: Password-protected admin panel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Custom responsive components
- **Notifications**: SweetAlert2
- **Data Storage**: Local Storage
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/tubtvtm/food-web.git
   cd food-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Application Structure

### 🛣️ Routes Overview

| Route           | Description                           | Access                           |
| --------------- | ------------------------------------- | -------------------------------- |
| `/`             | 🏠 Main homepage with food categories | Public                           |
| `/order/burger` | 🍔 Burger customization page          | Public                           |
| `/order/pizza`  | 🍕 Pizza customization page           | Public                           |
| `/order/noodle` | 🍜 Noodle customization page          | Public                           |
| `/payment`      | 💳 Payment processing                 | Public                           |
| `/orders`       | 📋 Customer order history             | Public                           |
| `/admin`        | 👨‍💼 Admin panel                        | Protected (Password: `admin123`) |

### 🎛️ Order Status Flow

```
PENDING → CONFIRMED → PREPARING → READY → DELIVERED
   ⏳        ✅          👨‍🍳        📦        🚚
```

## 🎯 Order Flow

1. **Customer selects food** → Customize options
2. **Add to cart** → Review items
3. **Checkout** → Choose payment method
4. **Admin receives order** → Manual status progression
5. **Real-time updates** → Customer sees progress
6. **Order completion** → Thank you message with timestamp

## 🔧 Admin Panel

Access the admin panel at `/admin` with password: `admin123`

### Admin Features:

- View all orders in real-time
- Update order status manually
- Filter orders by date
- See customer information
- Track completion timestamps

## 📱 Responsive Design

The application is built mobile-first with:

- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Safe area support for mobile devices
- Optimized typography and spacing

## 🎨 Design System

- **Colors**: Tailwind CSS color palette
- **Typography**: Responsive text sizing
- **Animations**: Framer Motion for smooth transitions
- **Components**: Reusable, accessible UI components

## � Screenshots

### 🏠 Homepage

Beautiful landing page with food categories and modern design.

### 🍔 Order Customization

Detailed customization options for burgers, pizzas, and noodles.

### 🛒 Shopping Cart

Smart cart with real-time updates and item management.

### 👨‍💼 Admin Dashboard

Comprehensive admin panel with order management and analytics.

## 🎯 Key Highlights

- ⚡ **Lightning Fast**: Built with Next.js 14 and optimized for performance
- 📱 **Mobile First**: Responsive design that works perfectly on all devices
- 🎨 **Beautiful UI**: Clean, modern interface with smooth animations
- 🔄 **Real-time**: Live order updates and status tracking
- 🛡️ **Type Safe**: Full TypeScript implementation for reliability
- 🎭 **Animations**: Smooth transitions with Framer Motion
- 🔒 **Secure**: Protected admin routes and data validation

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import the project and deploy automatically

### Deploy to Netlify

1. Fork this repository
2. Connect to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `out`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## �🔄 Future Enhancements

- 🗄️ **Database Integration**: PostgreSQL/MongoDB for persistent data
- 🔐 **User Authentication**: NextAuth.js for secure user management
- 📧 **Email Notifications**: Order confirmations and updates
- 📦 **Inventory Management**: Stock tracking and availability
- 🌐 **Multi-language**: Support for multiple languages
- 📊 **Advanced Analytics**: Detailed reporting and insights
- 🎯 **Push Notifications**: Real-time order updates
- 💰 **Payment Integration**: Stripe, PayPal integration
- 🏪 **Multi-vendor**: Support for multiple restaurants

## 📄 License

This project is for educational purposes and demonstration of modern web development practices.

## 👨‍💻 Developer

Created with ❤️ by **tubtvtm**

- GitHub: [@tubtvtm](https://github.com/tubtvtm)
- Repository: [food-web](https://github.com/tubtvtm/food-web)

---

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Built with Next.js 14 • TypeScript • Tailwind CSS • Framer Motion
