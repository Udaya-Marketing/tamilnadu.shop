This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Demo catalog

The storefront currently displays sample refurbished-laptop listings from `src/data/products.ts` and does not need Saleor to browse the catalog. The product names, specifications, prices, and images are mock data; live inventory, sign-in, and checkout still require their configured backend services.

## Razorpay checkout

1. Copy `.env.example` to `.env.local`.
2. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to the keys from your Razorpay Dashboard. Use test-mode keys while developing.
3. If the Saleor checkout is priced in USD, set `RAZORPAY_USD_TO_INR_RATE` to the USD-to-INR rate you want to charge. INR checkouts are charged directly.
4. Restart the Next.js server after changing environment variables.

The key secret is only read by server routes. The server creates the Razorpay order from Saleor's checkout total, validates the checkout signature and payment status, and checks the amount before completing the Saleor order. Configure Razorpay to auto-capture payments for this flow.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Gubera_2.0_theme_2
# saleor-theme-1
# saleor-theme-1
