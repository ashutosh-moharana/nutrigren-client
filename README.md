# NutriGren Web App

A responsive ecommerce experience for the NutriGren micro-bakery. The UI ships with a minimal green art direction, small curated catalog (4–5 products), Razorpay-ready checkout, address capture, and post-purchase order history.

## Features

- Curated product grid with skeleton states, product detail pages, and CTA-rich hero sections.
- Auth flow with email/password and Google OAuth plus persistent session state.
- Three-step checkout (summary → address → payment) powered by a shared context to survive refreshes.
- Razorpay integration ready for test/live keys, with Cash on Delivery fallback.
- Order history + profile pages gated behind protected routes.
- Mobile-first layouts, glassmorphism accents, and reusable UI primitives (`Button`, `Card`, `Badge`).

## Quick Start

```bash
# client
cd client
npm install
npm run dev

# server (separate terminal)
cd server
npm install
npm run dev
```

Visit http://localhost:5173 for the UI (proxy origin configurable via `CLIENT_URL` on the server).

## Environment Variables

Create `.env` files in both `client` and `server` folders.

### client/.env

```
VITE_API_URL=http://localhost:5000
VITE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx (optional, used for front-end fallback)
```

### server/.env

```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection
JWT_SECRET=super-secret-key
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx
GOOGLE_REDIRECT_URI=http://localhost:5173
RAZORPAY_KEY_ID=rzp_test_xxxxx        # leave empty to stay in demo mode
RAZORPAY_KEY_SECRET=xxxxx             # leave empty to stay in demo mode
```

> If Razorpay keys are missing the API runs in demo mode: checkout will show an inline warning and online payments stay disabled until keys are provided.

## Testing & QA

1. Run `npm run dev` in both folders.
2. Manually verify:
   - Catalog loads skeletons then products.
   - Login/Register persists session, dropdown exposes Orders/Profile.
   - Checkout summary → address → payment works for COD (order shows under `/orders`).
   - Razorpay button displays warning when keys are absent.
3. Lighthouse mobile + desktop checks on `npm run build && npm run preview` for performance.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router, React Hook Form.
- **Backend:** Express 5, MongoDB/Mongoose, Razorpay SDK, JWT auth, Google OAuth.

Feel free to tweak color tokens in `src/index.css` or extend Tailwind via `tailwind.config.js` to suit future branding updates.***
