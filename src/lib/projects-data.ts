export type Project = {
  id: string;
  title: string;
  bifDescription: string;
  description: string;
  image: string;
  liveLink: string;
  clientRepo: string;
  serverRepo: string;
  overlayText: string;
  category: string;
  technology: string[];
  features: string[];
  screenshots: string[];
};

const projectData: Project[] = [
  {
    id: "e-catalog",
    title: "E-Catalog - An E-Commerce Web Application",
    bifDescription:
      "A modern e-commerce platform with cart management, secure checkout, and admin dashboard.",
    description:
      "E-Catalog is a full-stack e-commerce web application built with Next.js and TypeScript. It features advanced product filtering, a dynamic cart system, secure Stripe payment integration, and a role-based admin dashboard for managing products, orders, and users. Optimized for performance with Next.js image optimization.",
    image: "https://i.ibb.co.com/nNz63D8g/banner.png",
    liveLink: "https://e-catalog-shop.vercel.app/",
    clientRepo: "https://github.com/syedmehedi34/e-catalog",
    serverRepo: "",
    overlayText: "Explore More",
    category: "Business",
    technology: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Auth.js",
      "Stripe",
      "SSLCOMMERZ",
      "Recharts",
    ],
    features: [
      "Advanced product search and filtering by category, price range, and keyword",
      "Dynamic cart system with real-time quantity updates via Redux Toolkit",
      "Stripe payment integration and Cash on Delivery checkout option",
      "Order tracking with Pending, Paid, and Cancelled status and printable invoices",
      "Role-based admin dashboard for managing products, orders, users, and reports",
      "Dark and light mode support with Next.js image optimization",
    ],
    screenshots: [
      "https://i.ibb.co.com/vCCdY2m1/all-products-page.png",
      "https://i.ibb.co.com/FkqJkmPC/register-page.png",
      "https://i.ibb.co.com/t5QzzzW/admin-dashboard.png",
    ],
  },
  {
    id: "doc-mate",
    title: "DocMate - Doctor Appointment Booking System",
    bifDescription:
      "A role-based healthcare platform for patients, doctors, and admins to manage appointments seamlessly",
    description:
      "DocMate is a cutting-edge healthcare web application built with Next.js that connects patients with verified doctors. It features a complete role-based system where patients can browse doctors and book appointments, doctors can manage requests and patients, and admins have full control over the platform. The app includes secure authentication, personalized dashboards, dynamic doctor applications, and real-time notifications.",
    image: "https://i.ibb.co.com/Nn7BHtxr/doc-mate-header.png",
    liveLink: "https://doc-mate-service.vercel.app/",
    clientRepo: "https://github.com/syedmehedi34/DocMate",
    serverRepo: "",
    overlayText: "Explore More",
    category: "Business",
    technology: [
      "Next.js",
      "Tailwind CSS",
      "DaisyUI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Auth.js",
    ],
    features: [
      "Role-based access control for patients, doctors, and admins with separate dashboards",
      "Secure authentication using Auth.js with a credentials provider (email & password)",
      "Patients can browse verified doctors and book appointments easily",
      "Dynamic doctor application form — any user can apply to become a doctor",
      "Doctor dashboard to accept or reject appointment requests and manage patients",
      "Admin panel to approve or remove doctor and patient accounts",
      "Personalized dashboards with appointment history and status updates",
      "Real-time notifications using React Toastify and SweetAlert for CRUD actions",
      "MongoDB integration with Mongoose for schema-based data management",
      "Protected API routes with secure, JWT-based session management",
    ],
    screenshots: [
      "https://i.ibb.co.com/FLY8d7PJ/sign-up.png",
      "https://i.ibb.co.com/ch83k12Y/contacts.png",
      "https://i.ibb.co.com/yBPnWr67/dashboard-all-doctors.png",
      "https://i.ibb.co.com/9kkK7G07/all-doctors.png",
    ],
  },
  {
    id: "asset-flow",
    title: "Asset Flow [Asset Management System]",
    bifDescription:
      "A web app for managing company assets with automated tracking and reporting",
    description:
      "AssetFlow is a web app for managing company assets, allowing HR managers to assign, track, and report on returnable and non-returnable assets. Employees can request and return assets, while the system automates notifications and subscription management for improved efficiency.",
    image: "https://i.ibb.co.com/Xf1jN5B5/home.png",
    liveLink: "https://asset-flow.netlify.app/",
    clientRepo: "https://github.com/syedmehedi34/asset-flow",
    serverRepo: "",
    overlayText: "Explore More",
    category: "Business",
    technology: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Firebase",
      "Stripe",
    ],
    features: [
      "Separate HR manager and employee dashboards with role-based access",
      "Assign and track returnable and non-returnable company assets",
      "Employees can request assets and submit returns from their dashboard",
      "Automated email notifications for requests, approvals, and returns",
      "Subscription and package management with Stripe billing",
      "Reporting view for asset usage and pending requests",
    ],
    screenshots: [
      "https://i.ibb.co.com/8gMVL1HH/login.png",
      "https://i.ibb.co.com/CpJy0wXr/register.png",
    ],
  },
  {
    id: "next-blog",
    title: "Next Blog - A Blogging Website",
    bifDescription:
      "A modern blogging platform with user authentication and commenting system.",
    description:
      "Next Blog is a modern, fully-responsive blogging platform built with React, Firebase, and MongoDB. It features user authentication, wish-list management, and a commenting system. Admins can manage content, and the site is optimised for mobile, tablet, and desktop devices.",
    image: "https://i.ibb.co/QjcDRd9w/next-blog.png",
    liveLink: "https://your-next-blog.netlify.app/",
    clientRepo: "https://github.com/syedmehedi34/next-blog",
    serverRepo: "https://github.com/syedmehedi34/next-blog",
    overlayText: "Explore More",
    category: "Education",
    technology: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Firebase",
    ],
    features: [
      "Firebase authentication with email/password and Google sign-in",
      "Create, edit, and publish blog posts with a rich text editor",
      "Wish-list system for saving posts to read later",
      "Commenting system on individual posts",
      "Admin view for managing published content",
      "Fully responsive layout across mobile, tablet, and desktop",
    ],
    screenshots: [
      "https://i.ibb.co.com/Y7fWXxVk/study-hive1.png",
      "https://i.ibb.co.com/NQYgHCQ/study-hive2.png",
      "https://i.ibb.co.com/mPB9sWw/study-hive3.png",
    ],
  },
  {
    id: "gaming-groove",
    title: "Gaming Groove : A Game Review Application",
    bifDescription:
      "A platform for gamers to browse, share, and manage game reviews.",
    description:
      "Gaming Groove is a game review app where users can browse, share, and manage game reviews. It features secure login, user dashboards, and a watchlist. Built with React, Firebase, and MongoDB, it offers a responsive and easy-to-use platform for gaming enthusiasts.",
    image: "https://i.ibb.co/YBb4VYPb/gaming-groove-title.png",
    liveLink: "https://gaming-groove.surge.sh/",
    clientRepo: "https://github.com/syedmehedi34/gaming-groove-client",
    serverRepo: "",
    overlayText: "Explore More",
    category: "Entertainment",
    technology: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Firebase",
    ],
    features: [
      "Secure login and signup with Firebase authentication",
      "Browse and search game reviews by genre and rating",
      "Users can add, edit, and delete their own reviews",
      "Personal watchlist for games to try later",
      "User dashboard showing submitted reviews and watchlist",
      "Responsive UI built with React and Tailwind CSS",
    ],
    screenshots: [
      "https://i.ibb.co.com/Y7fWXxVk/study-hive1.png",
      "https://i.ibb.co.com/NQYgHCQ/study-hive2.png",
      "https://i.ibb.co.com/mPB9sWw/study-hive3.png",
    ],
  },
];

export default projectData;
