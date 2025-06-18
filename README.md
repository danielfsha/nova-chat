# Nova Chat

Nova Chat is a modern, full-stack AI-powered chat application built with Next.js, React, and a suite of cloud services. It supports real-time messaging, AI integrations, authentication, file uploads, and more.

---

## Features

- **AI Chat**: Interact with AI models (Google Generative AI, Groq, BYOK, etc.)
- **Authentication**: Secure login with Google OAuth and custom auth
- **Persistent Chats**: All messages and threads are stored in PostgreSQL (via Supabase) - Todo
- **File Uploads**: Upload images, PDFs, and more (Cloudflare R2)
- **Payments**: Stripe integration for premium features
- **Search**: Powerful thread and message search
- **Responsive UI**: Mobile-first, accessible, and themeable (light/dark)
- **Voice Input**: Voice-to-text support for chat input

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API routes, Supabase (PostgreSQL)
- **AI Integrations**: Google Generative AI, Groq, BYOK
- **Auth**: NextAuth, Google OAuth
- **Storage**: Cloudflare R2
- **Payments**: Stripe
- **Other APIs**: EXA, Firecrawl, Daytona

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nova-chat.git
cd nova-chat
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and fill in the required values.  
**Example:**

```properties
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
BYOK_API_ENCRYPTION_KEY="..."
GOOGLE_GENERATIVE_AI_API_KEY="..."
GROQ_API_KEY="..."
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
EXA_API_KEY="..."
FIRECRAWL_API_KEY="..."
DAYTONA_API_KEY="..."
DAYTONA_API_URL="..."
CLOUDFLARE_S3_BUCKET_API_KEY="..."
CLOUDFLARE_S3_BUCKET_NAME="..."
CLOUDFLARE_S3_BUCKET_LOCATION="..."
```

> **Never commit your `.env` file to version control.**

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
nova-chat/
├── app/                # Next.js app directory (pages, layouts, etc.)
├── components/         # React components (Chat, Sidebar, Loader, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and libraries
├── public/             # Static assets
├── styles/             # Tailwind and global CSS
├── .env                # Environment variables (not committed)
├── package.json
└── README.md
```

---

## Deployment

Nova Chat can be deployed to any platform that supports Node.js and Next.js, such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS](https://aws.amazon.com/)
- [DigitalOcean](https://www.digitalocean.com/)

**Environment variables must be set in your deployment platform.**

---

## Security

- **Keep your `.env` file private.**
- **Never expose API keys or secrets in client-side code.**
- **Use HTTPS in production.**

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

---

## License

[MIT](LICENSE)

---

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Stripe](https://stripe.com/)
- [Cloudflare R2](https://www.cloudflare.com/products/r2/)
- [Google Cloud AI](https://cloud.google.com/ai)
- [Groq](https://groq.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contact

For support or business inquiries, please
