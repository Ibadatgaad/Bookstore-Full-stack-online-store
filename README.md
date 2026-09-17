# Book Store — React.js Website

A multi-page online bookstore front end built with **React + Vite**. It includes a home page with curated book sections, a searchable/filterable "Explore" catalog, and a fully working shopping cart with quantity controls, live totals, and a free-shipping progress bar.

## Features

- **Home Page**
  - Hero banner
  - Bestsellers section
  - "Find Your Favorite" section
  - Promotional banner
  - New Releases section
- **Explore Page**
  - Catalog of books across categories (Fiction, Mystery, Sci-Fi, Cooking, Technology, Self-Help)
  - Live search by title, author, or category
  - Category filter buttons and a sort control (price, rating, alphabetical)
  - Star ratings, "Add to Cart" with instant feedback, and an empty-results state with "Clear filters"
- **Cart Page**
  - Add/remove items and adjust quantities
  - Live subtotal, shipping, and total calculation
  - Free-shipping progress bar (free shipping over $499)
  - Empty-cart state linking back to Explore
- **Persistent Cart Badge** — item count shown in the header nav, powered by a shared cart context

## Tech Stack

- **React 19** + **Vite**
- **React Router DOM v7** for client-side routing (`/`, `/explore`, `/cart`)
- **React Bootstrap** + **Bootstrap 5** for layout and components
- React Context API (`CartContext`) for global cart state — no backend, all book/cart data is in-memory

## Project Structure

```
├── index.html                    # Vite entry HTML
├── src/
│   ├── main.jsx                   # React DOM entry point
│   ├── App.jsx                    # Routes + layout composition
│   ├── style.css                  # Global styles
│   ├── Components/
│   │   └── Layouts/
│   │       ├── Header.jsx          # Navbar with routing links + cart badge
│   │       ├── Footer.jsx          # Site footer
│   │       └── index.jsx
│   ├── Pages/
│   │   ├── Home/
│   │   │   ├── Hero.jsx
│   │   │   ├── Bestsellers.jsx
│   │   │   ├── Findfav.jsx
│   │   │   ├── Banner.jsx
│   │   │   └── Newreleases.jsx
│   │   ├── Explore/
│   │   │   ├── Explore.jsx         # Catalog, search, filter, sort
│   │   │   └── index.jsx
│   │   └── Shop/
│   │       ├── Cart.jsx            # Cart page (items, summary, checkout button)
│   │       └── CartContext.jsx     # Global cart state (add/remove/update qty, totals)
│   └── assets/                     # Images and icons
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended) and npm

### Installation

```bash
git clone https://github.com/Ibadatgaad/Bookstore-Full-stack-online-store.git
cd Bookstore-Full-stack-online-store
npm install
```

### Run Locally

```bash
npm run dev
```

Vite will start a dev server (typically at [http://localhost:5173](http://localhost:5173)) with hot module reload.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

| Command        | Description                                |
|----------------|---------------------------------------------|
| `npm run dev`  | Starts the Vite dev server                  |
| `npm run serve`| Alias for `dev`                             |
| `npm run build`| Builds the app for production               |
| `npm run preview` | Serves the production build locally       |

## Backend (Express + MongoDB)

This project now includes a full backend in `/server`: Express + Mongoose + JWT auth, with real
signup/login, a book catalog backed by MongoDB, and order creation for checkout. It's built to run
against a **local** MongoDB instance — no Atlas account or hosting required.

### Prerequisites

- MongoDB Community Edition installed and running locally (`mongod`).
  Install guide: https://www.mongodb.com/docs/manual/administration/install-community/
- Node.js v18+

### One-time setup

```bash
cd server
npm install
cp .env.example .env      # edit if you want to change the JWT secret, port, etc.
```

Make sure `mongod` is running locally (default: `mongodb://127.0.0.1:27017`), then seed the
original book catalog into MongoDB:

```bash
npm run seed
```

### Running the backend

```bash
cd server
npm run dev        # http://localhost:5000, auto-restarts on changes
# or: npm start
```

### Running the frontend

In a separate terminal, from the project root:

```bash
npm install
npm run dev         # http://localhost:5173
```

The frontend talks to the API at `http://localhost:5000/api` by default. To change that, create a
`.env` file at the project root with:

```
VITE_API_URL=http://localhost:5000/api
```

### What's now wired up

- **Explore page** — books are fetched live from MongoDB (search/filter/sort all hit the API).
- **Home page** (Bestsellers / New Releases) — also pulled from the real catalog, so cart/checkout
  IDs always match.
- **Sign Up / Log In** — real accounts, JWT stored in `localStorage`.
- **Sell Your Book** — now functional; requires login, POSTs a new book to MongoDB, and it
  immediately appears in Explore.
- **Proceed to Checkout** — now functional; requires login, collects a shipping address, and
  places a real order (prices are re-validated server-side against the DB, not trusted from the client).
- **Cart** — persists across reloads via `localStorage` (still client-side; only becomes a real
  order once checked out).

### Notes / possible next steps

- Orders are stored per-user but there's no "Order History" page yet in the UI — the data is there
  (`GET /api/orders/mine`) if you want to add one.
- No payment processor is integrated — "Place Order" just creates the order record.
- No image upload for "Sell Your Book" yet — books use the same placeholder cover system as the
  original catalog.

## License

No license specified. Add a `LICENSE` file if you'd like to define usage terms for this project.
