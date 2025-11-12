# FarmHub Frontend

A modern, responsive web application that empowers farmers with digital tools for crop management, equipment rental, and marketplace services. FarmHub connects farmers with resources, knowledge, and opportunities to grow their agricultural businesses.

##  Features

###  Pest & Disease Diagnosis
- AI-powered crop disease detection
- Instant diagnosis with treatment recommendations
- Expert insights and guidance

###  Equipment Booking
- Browse and rent farming equipment from nearby providers
- Affordable equipment rental service
- Easy booking system

###  Marketplace
- Buy and sell farm produce directly
- No middlemen - direct farmer-to-farmer transactions
- Fair pricing and transparent marketplace

###  Additional Features
- User-friendly dashboard
- Responsive design for mobile and desktop
- Shopping cart functionality
- Product filtering and search
- Equipment filtering
- Beautiful animations and modern UI

##  Tech Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **AOS (Animate On Scroll)** - Scroll animations

##  Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

##  Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd farmhub-frontend
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## 📁 Project Structure

```
farmhub-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── UserDashboard/     # User dashboard components
│   ├── website/
│   │   ├── Components/    # Reusable components
│   │   │   ├── equipement/  # Equipment-related components
│   │   │   ├── marketplace/ # Marketplace components
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Equipement.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── MarketPlace.jsx
│   │   │   ├── PestDiagnosis.jsx
│   │   │   └── product/
│   │   └── utils/         # Utility functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global app styles
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── dist/                  # Production build output
├── eslint.config.js       # ESLint configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
└── README.md             # Project documentation
```

## Key Pages

- **Home** (`/`) - Landing page with features and testimonials
- **About** (`/About`) - Information about FarmHub and team
- **Marketplace** (`/marketplace`) - Buy and sell farm produce
- **Equipment** (`/equipement`) - Browse and rent farming equipment
- **Pest Diagnosis** (`/pest-diagnosis`) - Crop disease detection tool
- **Product Details** (`/product/:id`) - Individual product pages
- **Contact** (`/contact`) - Contact information

## Features Overview

### Shopping Cart
The application includes a fully functional shopping cart system using React Context API, allowing users to add, remove, and manage items.

### Responsive Design
Built with mobile-first approach using Tailwind CSS, ensuring a great experience on all devices.

### Animations
Smooth animations and transitions using Framer Motion for an enhanced user experience.

##  Configuration

### Vite Configuration
The project uses Vite with React plugin and Tailwind CSS. Configuration can be found in `vite.config.js`.

### Tailwind CSS
Tailwind CSS is configured via the `@tailwindcss/vite` plugin. Custom styles can be added in `src/index.css`.

## 🌐 Deployment

The project includes a `vercel.json` configuration file for deployment on Vercel. You can deploy to other platforms as well:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

##  Team

- **Iriza** - Project Founder
- **Twariki** - Project Lead
- **Emma Tiffany** - UI/UX Designer
- **Diane Ingabire** - Frontend Developer
- **Innocent** - Backend Developer

##  Contact

For more information about FarmHub, please visit the About page or contact the team.

---

Made with ❤️ for farmers