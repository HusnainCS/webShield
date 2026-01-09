# WebShield Security Scanner - Local Development

A complete web security scanning platform for local development and testing. Run both frontend and backend services locally to test website security vulnerabilities.

## 🚀 Quick Start Guide

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
Backend server will run at: http://localhost:4000

### 2. Start Frontend Server
```bash
cd frontend
npm install
npm run dev
```
Frontend will open at: http://localhost:5173

### Environment Configuration
Backend Setup (in backend/ folder)
Create a .env file with:

.env
```bash
DB_URL=mongodb://localhost:27017/webshield
JWT_SECRET=your-secret-key-here
PORT=4000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
GROQ_API=your-groq-api
```
### Core Features
User Authentication System - Secure login, registration, and profile management
Multiple Security Tools - Integrated scanning with 4 powerful tools:
Nmap - Network port and service detection
Nikto - Web server vulnerability scanning
SQLmap - SQL injection testing
SSLScan - TLS/SSL security analysis
Real-time Scan Monitoring - Live progress tracking with detailed logs
AI-Powered Analysis - Intelligent vulnerability assessment and recommendations
Dashboard & History - Track all scans and usage statistics
Report Generation - Download detailed security reports

### Required System Tools:
Nmap (brew install nmap or apt install nmap)
Nikto (brew install nikto or apt install nikto)
SQLmap (brew install sqlmap or apt install sqlmap)
SSLScan (brew install sslscan or apt install sslscan)

### Security & Ethical Guidelines
CRITICAL: USE RESPONSIBLY
This tool is designed for ethical security testing only:

## Permitted Uses:
Testing your own websites and applications
Authorized penetration testing with written permission
Educational purposes in controlled environments
Security research with proper authorization

## Strictly Prohibited:
Scanning websites without explicit permission
Attempting to breach systems you don't own
Any illegal or malicious activities
Disrupting services or causing damage
You are solely responsible for ensuring your activities are legal and ethical.


