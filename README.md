# JWT-AUTH

**Welcome to JWT-AUTH**, a fullstack web application built with **NextJS** for the frontend and **Django** for the backend, utilizing **REST** APIs and a **Postgres** database. This project demonstrates a secure authentication system using **JSON Web Tokens (JWT)**, including features like OTP-based login, email verification based registration, email and phone verification, password reset, and social media login integration. The application starts with a login page where users can enter their email and password. Upon successful authentication, an OTP is sent to the user's email for verification. After verifying the OTP, users receive JWT tokens for accessing protected routes. The user can edit thier profile in the **Profile** page. The profile image is retrieved from Social Providers if the account is created using Social account. Otherwise a default image is set for password users.

**Superusers** and **Admins** have elevated priviliges where they can access the **Admin-dashboard** and can activate, deactivate, edit or delete an user according to thier priviliges.

For more details, visit the [GitHub repository](https://github.com/wasee-sun/JWT_AUTH_django_rest).

## Features

- **Secure Authentication**: Login with email/password and OTP verification.
- **Account Locking Mechanism**: Prevents brute force logging attack
- **JWT Tokens**: Manage access and refresh tokens for secure API access. JWT tokens are stored in Cookies (HTTP-only, Secure, SameSite=Lax). Refresh tokens are rotated to prevent session hijacking
- **CSRF Protection**: Generate and validate CSRF tokens for state-changing operations.
- **reCAPTCHA Integration**: Prevent automated abuse with Google's reCAPTCHA.
- **Email & Phone Verification**: Ensure user identity with verification links and OTPs.
- **Password Management**: Secure password reset functionality through verification links.
- **Social Login**: Authenticate via Google, Facebook, and GitHub.
- **User Management**: Create, update, and manage user accounts with role-based access control.
- **Account Activation and Deactivation**: Users can deactivate thier own accounts, (Admin and Super User have higher privileges).
- **Rate Limiting**: Costly API endpoint calls are rate limited.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/wasee-sun/JWT_AUTH_django_rest
   cd JWT_AUTH_django_rest

2. **Create a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate

3. **Create .env files**:

   Create `.env` files in the `backend` and `frontend` directories.
   These env files contain sensitive information and should not be committed to version control. They must exist before running the setup script.
   
   See the env variable names in the [env-vars.md](https://github.com/wasee-sun/JWT_AUTH_django_rest/blob/main/env-vars.md) file.

### Backend (Django) Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
3. **Apply database migrations**:
   ```bash
   python manage.py migrate
4. **Start the Django server**:
   ```bash
   python manage.py runserver

### Frontend (NextJS) Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
2. **Install dependencies**:
   ```bash
   npm install
3. **Start the Next.js development server**:
   ```bash
   npm run dev

## Usage

Key workflows include:

- **User Registration**: Create a new account and verify email.
- **Login**: Authenticate with email/password and OTP.
- **Token Refresh**: Use refresh tokens to maintain sessions.
- **Profile Management**: Update user details and upload profile images.
- **Admin Actions**: Activate/deactivate users (for admins).

## API Documentation

The API provides various endpoints for authentication and user management. Below is a summary of the key endpoints:

### Authentication Endpoints

- **GET /auth-api/get-csrf-token/**: Generates a CSRF token.
- **POST /auth-api/recaptcha-verify/**: Verifies reCAPTCHA tokens.
- **POST /auth-api/login/**: Initiates login with email and password.
- **POST /auth-api/resend-otp/**: Resends OTP for verification.
- **POST /auth-api/token/**: Issues JWT tokens after OTP verification.
- **POST /auth-api/token/refresh/**: Refreshes JWT tokens.
- **POST /auth-api/logout/**: Logs out the user by blacklisting the refresh token.

### Verification Endpoints

- **GET /auth-api/verify-email/**: Verifies email using a token.
- **POST /auth-api/verify-email/**: Sends an email verification link.
- **POST /auth-api/verify-phone/**: Sends an OTP to the user's phone.
- **PATCH /auth-api/verify-phone/**: Verifies the phone number using OTP.

### Password Reset

- **GET /auth-api/reset-password/**: Verifies the password reset link.
- **POST /auth-api/reset-password/**: Sends a password reset link.
- **PATCH /auth-api/reset-password/**: Resets the password.

### Social Login

- **POST /auth-api/social-auth/**: Authenticates via social media providers.

### User Management

- **GET /auth-api/users/**: Lists all users (paginated).
- **GET /auth-api/users/<id>/**: Retrieves a specific user.
- **POST /auth-api/users/**: Creates a new user.
- **PATCH /auth-api/users/<id>/**: Updates a user's profile.
- **DELETE /auth-api/users/<id>/**: Deletes a user (if deactivated).
- **POST /auth-api/users/<id>/activate/**: Activates a user.
- **POST /auth-api/users/<id>/deactivate/**: Deactivates a user.
- **PATCH /auth-api/users/<id>/upload_image/**: Uploads a profile image.

For detailed API documentation, including request and response formats, download the [API Documentation](https://github.com/wasee-sun/JWT_AUTH_django_rest/blob/main/Api-docs.docx).

For testing the Backend API, download the [Swagger Schema Documentation](https://github.com/wasee-sun/JWT_AUTH_django_rest/blob/main/jwt-auth-api-schema.yaml).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request with a detailed description.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/wasee-sun/JWT_AUTH_django_rest/blob/main/LICENSE) file for details.