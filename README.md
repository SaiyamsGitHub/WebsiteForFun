# Blank Website

A Next.js website for fun, optimized for production.

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

### Method 1: Standard Node.js Deployment

Build and start the production server:

```bash
npm run build
npm run start
```

### Method 2: Docker Deployment

Build and run using Docker:

```bash
# Build the Docker image
docker build -t blank-website .

# Run the container
docker run -p 3000:3000 blank-website
```

Or use Docker Compose for easier management:

```bash
docker-compose up -d
```

## Technologies Used

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Production-optimized Docker setup
- Security headers
- SEO optimization
- PWA support
