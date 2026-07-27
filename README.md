Vecerl Link: https://route53-clone-u6bk-31f91zz1x-aryan-tyagi.vercel.app/login
Use these credentials to log in:
Email: admin@example.com
Password: password123

# AWS Route53 Clone

![Next.js](https://img.shields.io/badge/Next.js-TypeScript-black)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688)
![SQLite](https://img.shields.io/badge/Database-SQLite-blue)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38BDF8)
![License](https://img.shields.io/badge/Assignment-AWS%20Route53-orange)

A functional clone of the **AWS Route53 Management Console** built using **Next.js**, **FastAPI**, and **SQLite**.

The objective of this project is to recreate the overall **AWS Route53 user experience**, including Hosted Zone management, DNS Record management, navigation, forms, search, filtering, modals, and persistent storage.

This project focuses on replicating the Route53 management workflow rather than implementing real DNS provisioning.

---

# Table of Contents

- Overview
- Features
- Technology Stack
- Project Architecture
- Project Structure
- Authentication
- Hosted Zone Management
- DNS Record Management
- Database Schema
- API Overview
- Installation
- Running the Project
- Usage Guide
- Assignment Scope

---

# Overview

This application recreates the AWS Route53 web interface using a modern full-stack architecture.

The frontend is developed using **Next.js with TypeScript**, while the backend is implemented using **FastAPI**. Persistent data storage is handled using **SQLite** with SQLAlchemy ORM.

The application allows users to manage Hosted Zones and DNS Records through a clean interface inspired by the AWS Management Console.

---

# Features

## Authentication

- Mock Login
- Mock Logout
- Session Persistence using Local Storage

### Demo Credentials

```
Email: admin@example.com
Password: password123
```

---

## Hosted Zones

- View Hosted Zones
- Search Hosted Zones
- Create Hosted Zone
- Edit Hosted Zone
- Delete Hosted Zone

---

## DNS Records

- View DNS Records
- Search DNS Records
- Filter DNS Records
- Create DNS Record
- Edit DNS Record
- Delete DNS Record

### Supported Record Types

- A
- AAAA
- CNAME
- TXT
- MX
- NS
- PTR
- SRV
- CAA

---

## User Interface

- AWS Route53 inspired layout
- Sidebar Navigation
- Top Navigation
- Breadcrumb Navigation
- Responsive Tables
- Search
- Filters
- Confirmation Modals
- Create/Edit Modals
- Toast Notifications
- Loading States

---

## Placeholder Sections

The following AWS Route53 sections are included as placeholder pages:

- Dashboard
- Traffic Policies
- Health Checks
- Resolver
- Profiles

Each page displays a **Coming Soon** message as allowed by the assignment.

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Sonner

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

---

# Project Architecture

```text
Browser
      │
      ▼
Next.js Frontend
      │
      ▼
Axios API Requests
      │
      ▼
FastAPI Backend
      │
      ▼
SQLAlchemy ORM
      │
      ▼
SQLite Database
```

### Workflow

1. User interacts with the frontend.
2. Axios sends REST API requests.
3. FastAPI processes the request.
4. SQLAlchemy performs database operations.
5. SQLite stores or retrieves data.
6. The response is returned to the frontend and rendered.

---

# Project Structure

```
route53-clone/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── services/
│   └── styles/
│
├── backend/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── database/
│   └── main.py
│
└── README.md
```

---

# Authentication

A mocked authentication system has been implemented.

Features include:

- Login
- Logout
- Session Persistence

Authentication state is stored locally to simulate a signed-in experience.

---

# Hosted Zone Management

The application supports complete CRUD operations for Hosted Zones.

Users can:

- View all hosted zones
- Search hosted zones
- Create new hosted zones
- Edit hosted zone details
- Delete hosted zones

Changes are persisted in SQLite through FastAPI APIs.

---

# DNS Record Management

Each Hosted Zone contains DNS Records.

Users can:

- View records
- Search records
- Filter records by type
- Create records
- Edit records
- Delete records

All operations are stored persistently in SQLite.

---

# Database Schema

## Hosted Zones

| Column | Description |
|---------|-------------|
| id | Primary Key |
| name | Hosted Zone Name |
| description | Zone Description |
| created_at | Creation Timestamp |

---

## DNS Records

| Column | Description |
|---------|-------------|
| id | Primary Key |
| hosted_zone_id | Foreign Key |
| name | Record Name |
| type | Record Type |
| value | Record Value |
| ttl | Time To Live |
| created_at | Creation Timestamp |

Relationship:

```
Hosted Zone
    │
    ├── DNS Record
    ├── DNS Record
    ├── DNS Record
```

---

# API Overview

## Hosted Zones

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /hosted-zones | Get all hosted zones |
| GET | /hosted-zones/{id} | Get hosted zone |
| POST | /hosted-zones | Create hosted zone |
| PUT | /hosted-zones/{id} | Update hosted zone |
| DELETE | /hosted-zones/{id} | Delete hosted zone |

---

## DNS Records

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /hosted-zones/{id}/records | Get DNS records |
| POST | /hosted-zones/{id}/records | Create DNS record |
| PUT | /hosted-zones/{id}/records/{recordId} | Update DNS record |
| DELETE | /hosted-zones/{id}/records/{recordId} | Delete DNS record |

---

# Installation

## Clone Repository

```bash
git clone (https://github.com/AryanTyagi2005/route53-clone)
cd route53-clone
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate virtual environment

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Usage Guide

1. Open the application.

2. Login using the provided credentials.

3. View existing Hosted Zones.

4. Create a new Hosted Zone.

5. Edit or delete Hosted Zones.

6. Open a Hosted Zone.

7. Manage DNS Records.

8. Search and filter DNS Records.

9. Logout.

---

# Assignment Scope

This project recreates the AWS Route53 management experience by implementing the primary management workflows, user interface, and backend persistence.

The focus of the assignment is on Hosted Zone management, DNS Record management, navigation, forms, and persistent CRUD operations rather than actual DNS provisioning.

---

# Author

Developed as part of the **AWS Route53 Clone Assignment** using:

- Next.js
- TypeScript
- FastAPI
- SQLite
- Tailwind CSS
