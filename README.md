# Blood Donation Server

live URL:

```bash
https://livelink
```

## Features

Route within the system is safeguarded through JWT token verification and authentication, guaranteeing secure access and protection against unauthorized usage.

Role Based Routing:

1. **User Model**
   Represents users of the application. It includes fields such as name, email, password, bloodType, location, availability, createdAt, and updatedAt.

2. **Request Model**
   Represents blood donation requests. It includes fields such as donorId, requesterId, phoneNumber, dateOfDonation, hospitalName, hospitalAddress, reason, requestStatus, createdAt, and updatedAt.

3. **UserProfile Model**
   Represents user profiles. It includes fields such as userId, bio, age, lastDonationDate, createdAt, and updatedAt.

The relationships between models are described as follows:

1. Each request is associated with one donor (user) and one requester (user).

2. Each user has a one-to-one relationship with their user profile.

These models and relationships form the foundation of the Blood Donation Application, facilitating user registration, blood donation requests, and user profile management.

## Technology Used

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Object Relational Mapping (ORM):** Prisma for PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation Library:** Zod

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-NaimurAlltime.git
```

2. Navigate to the project directory:

```bash
cd blood-donation-server
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure environment variables:

```bash
PORT=...
DATABASE_URL=...
JWT_SECRET=...
EXPIRES_IN=...
```

### Running the Application

1. Convert the typescript file to javascript file

```bash
npm run build
```

2. Running typescript in development environment

```bash
npm run dev
```
