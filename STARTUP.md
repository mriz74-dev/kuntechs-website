# KunTechs SPA - Startup & Troubleshooting Guide

## 🚀 Starting the Application

### Development Mode (Recommended for Testing)

#### Quick Start
```bash
# Install dependencies (one time)
npm install
cd frontend && npm install

# Start both frontend and backend
npm run dev
```

Then open: **http://localhost:5173**

#### What This Does
- **Frontend**: Vite dev server on http://localhost:5173 with hot reload
- **Backend**: Express API on http://localhost:3001
- **Database**: SQLite created automatically at `backend/contacts.db`

#### Start Individual Servers
```bash
# Terminal 1: Start frontend only
npm run dev:frontend

# Terminal 2: Start backend only
npm run dev:backend
```

### Production Build & Testing

#### Build Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/ (optimized, ready for deployment)
```

#### Run Production Locally
```bash
# Build frontend first
npm run build

# Then start backend (serves both API and SPA)
npm start
```

Open: **http://localhost:3001**

## 📋 Testing the Application

### 1. Test Navigation (SPA Routing)

Open http://localhost:5173 and verify:

- [ ] **Home Page** displays correctly
- [ ] Click **"Learn More"** → navigates to `/digital-ai` 
- [ ] Click **"Get Started"** → navigates to `/contact`
- [ ] Click **"Digital AI"** in navbar → `/digital-ai`
- [ ] Click **"Contact Us"** in navbar → `/contact`
- [ ] Click **"Home"** in navbar → `/`
- [ ] Click logo → `/`

### 2. Test Contact Form

Go to Contact Us page and verify:

- [ ] Form has all fields (First Name, Last Name, Email, Phone, Company, Message)
- [ ] **Real-time validation**:
  - Leave field empty → red error
  - Type invalid email → red error
  - Type valid data → no error
- [ ] **Submit form** with valid data:
  - Should see green success message
  - Form should clear automatically
  - ID should appear in success message
- [ ] **Submit with invalid data** → error message appears

### 3. Test Backend API

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Should return: {"status":"ok"}
```

### 4. Test Form Submission (via API)

```bash
# Create test submission (without jq)
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","phone":"1234567890","company":"TestCo","message":"This is a test message"}'
```

**Expected response:**
```json
{
  "success": true,
  "id": 1,
  "message": "Contact form submitted successfully"
}
```

### 5. Test Get All Submissions

```bash
curl http://localhost:3001/api/contacts
```

**Expected response:** Array of contact objects with all submissions

### 6. Test Excel Export

```bash
# Download Excel file
curl http://localhost:3001/api/contacts/export/excel -o my_contacts.xlsx

# Open my_contacts.xlsx in Excel or Google Sheets
```

Should see:
- [ ] Header row with column names
- [ ] All submitted contact records
- [ ] Formatted with colors
- [ ] Timestamps for each submission

## 🔍 Verify SPA Is Working Correctly

### Check Frontend Build
```bash
ls -la frontend/dist/
# Should see:
# - index.html (main SPA entry point)
# - assets/ folder (JavaScript and CSS)
```

### Verify Router Configuration
Open browser console (F12) at http://localhost:5173:
- No JavaScript errors in console
- Network tab shows `/api/` calls going to localhost:3001
- HTML contains `<div id="root"></div>`

### Check Backend Serving Frontend
```bash
# This should serve the SPA
curl http://localhost:3001/ | grep "root"

# Should see: <div id="root"></div>
```

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules frontend/node_modules package-lock.json
npm install
cd frontend && npm install
npm run dev
```

### Issue: Frontend shows 404 or old HTML

**Solution:**
Old HTML files were removed. If seeing old content:

```bash
# Clear browser cache
# Press Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Mac)
# Or use hard refresh: Ctrl+Shift+R (Chrome) / Cmd+Shift+R (Mac)

# Verify old files are gone
ls *.html  # Should show nothing

# Restart servers
npm run dev
```

### Issue: API endpoints return 404

**Solution:**
```bash
# Verify backend is running
ps aux | grep "node.*backend"

# If not running, start it
npm run dev:backend

# Test health endpoint
curl http://localhost:3001/api/health
```

### Issue: Database errors

**Solution:**
```bash
# If database is corrupted or locked:
rm backend/contacts.db

# Restart backend - it will recreate the database
npm run dev:backend
```

### Issue: Port already in use

**Solution:**
```bash
# Find what's using the port
lsof -i :3001  # or :5173

# Kill the process (replace PID with actual number)
kill -9 <PID>

# Or use different ports
PORT=3002 npm run dev:backend
PORT=5174 npm run dev:frontend
```

### Issue: Hot reload not working

**Solution:**
```bash
# Vite should auto-reload on file changes
# If not working:

# 1. Check Vite is running
ps aux | grep vite

# 2. Restart Vite
npm run dev:frontend

# 3. Check for file system watcher limits (Linux)
cat /proc/sys/fs/inotify/max_user_watches
# If less than 100000, increase it:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 🐳 Docker Testing

### Build Docker Image
```bash
docker build -t kuntechs-spa:latest .
```

### Run Docker Container
```bash
docker run -p 3001:3001 kuntechs-spa:latest
```

Open: **http://localhost:3001**

### Test Container
```bash
# Health check
curl http://localhost:3001/api/health

# View logs
docker logs -f kuntechs-spa

# Access database
docker exec -it kuntechs-spa sqlite3 /app/backend/contacts.db "SELECT * FROM contacts;"
```

## 📊 Database Direct Access

### View Database Contents
```bash
sqlite3 backend/contacts.db

# Inside sqlite3 shell:
> SELECT * FROM contacts;
> SELECT COUNT(*) FROM contacts;
> .schema contacts
> .quit
```

### Export to CSV
```bash
sqlite3 backend/contacts.db -csv "SELECT * FROM contacts;" > contacts.csv
```

### Clear All Data (for testing)
```bash
sqlite3 backend/contacts.db "DELETE FROM contacts;"
```

## ✅ Full Verification Checklist

Before deployment, verify all these work:

- [ ] `npm run dev` starts both frontend and backend
- [ ] http://localhost:5173 loads the home page
- [ ] Navigation between pages works (/, /digital-ai, /contact)
- [ ] Contact form shows validation errors
- [ ] Contact form submits successfully
- [ ] API `/api/contacts` returns submissions
- [ ] API `/api/contacts/export/excel` downloads file
- [ ] API `/api/health` returns status
- [ ] Database has contact records in `backend/contacts.db`
- [ ] Docker image builds without errors
- [ ] Docker container runs and serves SPA
- [ ] Production build works: `npm run build && npm start`

## 🚀 Ready for Deployment

Once all verification passes:

1. Push code to GitHub:
```bash
git add .
git commit -m "Fix: SPA routing and production setup"
git push origin main
```

2. Follow **DEPLOYMENT.md** for DokPloy setup

3. Monitor deployment in DokPloy dashboard

## 📞 Need Help?

- Check this file first for common issues
- View logs: `tail -f backend.log` or browser console (F12)
- Check database: `sqlite3 backend/contacts.db ".tables"`
- View API: `curl http://localhost:3001/api/health`
