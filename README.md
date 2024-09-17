# Mercury - Freelancers Barter System

Mercury is a platform designed to allow freelancers to barter their services, providing a way to exchange skills without monetary transactions. This project was initially conceived two years ago as a startup idea and is now open-sourced to be part of my portfolio.

## Project Overview

Mercury enables freelancers to:

- Offer services
- Search for others' services
- Exchange skills in a barter system

Although this project is not live at the moment, the backend system is fully functional and serves as a robust foundation for future development.

## Features

- **Generic Repository Pattern**: Simplifies data access logic and makes the code more maintainable.
- **Redis Caching**: Enhances performance by caching frequent data.
- **Migrations with Sequelize**: Allows seamless updates to the database schema.
- **Role-based JWT Authentication**: Secures the platform with roles and token-based access control.
- **reCAPTCHA Integration**: Protects against bots and spam.
- **Rate Limiting**: Ensures API stability by limiting the number of requests.
- **Email Sending**: Sends notifications and confirmations via email.
- **Validation**: Ensures data integrity and security.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Sequelize ORM)
- **Caching**: Redis
- **Authentication**: JWT (Role-based)
- **Deployment**: DigitalOcean Droplets, NGINX, Linux

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- Redis
- A DigitalOcean droplet or other hosting platform (optional for deployment)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mercury.git
   cd mercury
   ```
2. Install dependencies: 
    ```bash
     npm install
    ```
3. Set up environment variables in a `.env` file:
    ```bash
    RABBITMQ_URL=your-rabbitmq-url
    API_URL=your-backend-url
    ```
4. Set up the PostgreSQL database and run migrations:

   Create a database for development and production in PostgreSQL.

   Then, run the following commands to apply the migrations and seed the database:

    ```bash
    npm run build
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```
    The server will start at `http://localhost:3000`.

### Redis Setup
Make sure Redis is running locally with the correct credentials. You can verify it with:

  ```bash
    redis-cli
  ```

Ensure the connection matches the credentials in the `.env` file.

## Deployment
For deployment on production, configure the environment variables for your production database and email service, and ensure your server is running PostgreSQL and Redis.

You can use `pm2` for production:
 ```bash
  pm2 start npm --name mercury -- run start 
```

## Set Up NGINX (Optional):

If using NGINX as a reverse proxy, configure it to forward requests to your Node.js application running on port 3000 (or your specified port).

## Monitor and Maintain:

Monitor your application's performance and logs using pm2 logs and other monitoring tools. Ensure regular backups and security updates for your server environment.

## Access the Application:

Once deployed, access your Mercury application via your server's IP address or domain name (if configured).

# Additional Notes
Ensure firewall settings allow traffic on the configured ports (e.g., port 3000 for Node.js).
Secure sensitive data and credentials, especially in production environments.
Test thoroughly before deploying to production to avoid unexpected issues.
With these steps, your Mercury application should be successfully deployed and running in a production environment.
