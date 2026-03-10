<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Library & Student Management | Vintage Modern</title>
    <!-- Bootstrap 5 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <!-- Google Fonts: Playfair Display for headers -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #fcfaf7; /* Warm vintage creme */
            font-family: 'Inter', sans-serif;
            color: #2c3e50;
        }
        h1, h2, h3 {
            font-family: 'Playfair Display', serif;
            color: #1a252f;
        }
        .vintage-card {
            border: none;
            border-radius: 12px;
            background: #ffffff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            transition: transform 0.2s;
        }
        .vintage-card:hover {
            transform: translateY(-2px);
        }
        .table-vintage thead {
            background-color: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
        }
        .section-icon {
            color: #6c757d;
            margin-right: 10px;
        }
        .btn-vintage-primary {
            background-color: #2c3e50;
            color: white;
            border-radius: 8px;
            padding: 8px 20px;
        }
        .btn-vintage-primary:hover {
            background-color: #1a252f;
            color: #f8f9fa;
        }
    </style>
</head>
<body class="py-5">
    <div class="container">
        <header class="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom">
            <div class="text-start">
                <h1 class="display-5 mb-0"><i class="bi bi-bank section-icon"></i>Library Management</h1>
                <p class="text-muted mb-0">A modern take on academic administration</p>
            </div>
            <div>
                <a href="<c:url value='/login'/>" class="btn btn-outline-dark px-4 rounded-pill">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                </a>
            </div>
        </header>

        <div class="row g-4">
            <!-- Student Management Section -->
            <div class="col-lg-12">
                <div class="card vintage-card p-4 mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2><i class="bi bi-people section-icon"></i>Student Directory</h2>
                        <span class="badge bg-light text-dark border">${studentList.size()} Active Students</span>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle table-vintage">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Student Info</th>
                                    <th>Marks</th>
                                    <th class="text-end">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach var="s" items="${studentList}">
                                    <tr>
                                        <td class="fw-bold text-muted">${s.id}</td>
                                        <td>
                                            <div class="fw-semibold">${s.firstName} ${s.lastName}</div>
                                            <div class="small text-muted">${s.email}</div>
                                        </td>
                                        <td>
                                            <div class="progress" style="height: 8px; width: 100px;">
                                                <div class="progress-bar bg-dark" role="progressbar" style="width: ${s.marks}%" aria-valuenow="${s.marks}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <small class="text-muted">${s.marks}/100</small>
                                        </td>
                                        <td class="text-end">
                                            <span class="badge rounded-pill bg-light text-success border">Verified</span>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Book Management Section -->
            <div class="col-lg-7">
                <div class="card vintage-card p-4 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3><i class="bi bi-book section-icon"></i>Catalog</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle table-vintage">
                            <thead>
                                <tr>
                                    <th>Title & Author</th>
                                    <th>ISBN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach var="b" items="${bookList}">
                                    <tr>
                                        <td>
                                            <div class="fw-semibold">${b.title}</div>
                                            <div class="small text-muted">${b.author}</div>
                                        </td>
                                        <td><code class="text-dark">${b.isbn}</code></td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Registration Form Section -->
            <div class="col-lg-5">
                <div class="card vintage-card p-4 h-100 bg-light border">
                    <h3 class="mb-4">Quick Action</h3>
                    <form action="<c:url value='/manageStudent'/>" method="post">
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input type="number" name="id" class="form-control border-0 shadow-sm" id="studentId" placeholder="ID (Leave blank for Auto)">
                                    <label for="studentId">Student ID (Auto-increment)</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input type="email" name="email" class="form-control border-0 shadow-sm" id="studentEmail" placeholder="name@example.com">
                                    <label for="studentEmail">Email address</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-3">
                                    <input type="password" name="password" class="form-control border-0 shadow-sm" id="studentPassword" placeholder="Password">
                                    <label for="studentPassword">Access Credentials</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <input type="text" name="firstName" class="form-control border-0 shadow-sm" id="fName" placeholder="First Name">
                                    <label for="fName">First Name</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating mb-3">
                                    <input type="text" name="lastName" class="form-control border-0 shadow-sm" id="lName" placeholder="Last Name">
                                    <label for="lName">Last Name</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-floating mb-4">
                                    <input type="number" name="marks" class="form-control border-0 shadow-sm" id="marks" placeholder="Marks">
                                    <label for="marks">Academic Marks</label>
                                </div>
                            </div>
                            <div class="col-12 d-grid gap-2">
                                <button name="action" value="add" class="btn btn-vintage-primary"><i class="bi bi-plus-lg me-2"></i>Register Student</button>
                                <button name="action" value="update" class="btn btn-outline-dark border-2"><i class="bi bi-pencil-square me-2"></i>Update Records</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <footer class="mt-5 pt-4 border-top text-center text-muted">
            <small>&copy; 2026 Academic Information System | Vintage Modern Interface</small>
        </footer>
    </div>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>