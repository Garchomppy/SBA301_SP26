<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login | Vintage Modern Library</title>
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #fcfaf7;
            font-family: 'Inter', sans-serif;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            border: none;
            border-radius: 16px;
            background: #ffffff;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }
        h2 {
            font-family: 'Playfair Display', serif;
            color: #1a252f;
        }
        .btn-vintage-primary {
            background-color: #2c3e50;
            color: white;
            border-radius: 8px;
            padding: 12px;
        }
        .btn-vintage-primary:hover {
            background-color: #1a252f;
            color: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="container d-flex justify-content-center">
        <div class="card login-card p-5">
            <div class="text-center mb-4">
                <div class="display-6 mb-2 text-dark"><i class="bi bi-bank"></i></div>
                <h2>Member Login</h2>
                <p class="text-muted small">Access the Library Management System</p>
            </div>

            <c:if test="${not empty error}">
                <div class="alert alert-danger py-2 small border-0 text-center mb-4">
                    <i class="bi bi-exclamation-circle me-2"></i>${error}
                </div>
            </c:if>

            <form action="<c:url value='/login'/>" method="post">
                <div class="form-floating mb-3">
                    <input type="email" name="email" class="form-control border-0 bg-light" id="loginEmail" placeholder="name@example.com" required>
                    <label for="loginEmail">Email address</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="password" name="password" class="form-control border-0 bg-light" id="loginPassword" placeholder="Password" required>
                    <label for="loginPassword">Password</label>
                </div>
                
                <div class="d-grid">
                    <button type="submit" class="btn btn-vintage-primary shadow-sm fw-bold">Sign In</button>
                </div>

                <div class="text-center mt-4 pt-2 border-top">
                    <a href="<c:url value='/'/>" class="text-decoration-none text-muted small">
                        <i class="bi bi-arrow-left me-1"></i>Back to Home
                    </a>
                </div>
            </form>
        </div>
    </div>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
