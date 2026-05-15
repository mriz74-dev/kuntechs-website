# KunTechs SPA - Quick Start Guide

## 🚀 What's Been Built

A modern, production-ready Single Page Application that replaces your Google Sites website with:

- **3 Pages**: Home, Digital AI, Contact Us
- **Contact Form**: Collects customer details with validation
- **Data Export**: Export submissions to Excel
- **Database**: All submissions stored in SQLite
- **Modern Stack**: React + TypeScript + Express
- **Ready to Deploy**: Docker container for DokPloy

## 📋 Key Files & What They Do

### Frontend (`/frontend`)
- `src/pages/Home.tsx` - Main landing page with hero section
- `src/pages/DigitalAI.tsx` - AI solutions showcase page
- `src/pages/Contact.tsx` - Contact form with validation
- `src/components/Navigation.tsx` - Top navigation bar
- `src/components/Footer.tsx` - Footer with info

### Backend (`/backend`)
- `server.js` - Express API server with 3 endpoints:
  - `POST /api/contact` - Submit form
  - `GET /api/contacts` - Fetch all submissions
  - `GET /api/contacts/export/excel` - Download as Excel file

### Configuration
- `Dockerfile` - Production image for DokPloy
- `docker-compose.yml` - Local Docker setup
- `.env.example` - Environment variables template

## 🌐 Running Locally

### Currently Running:
- Frontend: http://localhost:5173 ✅
- Backend API: http://localhost:3001 ✅

### To Start Fresh:
```bash
# Install dependencies
npm install
cd frontend && npm install

# Start dev servers
npm run dev

# Or start individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

## 📝 Contact Form Features

1. **Real-time Validation** - Instant feedback as user types
2. **Type Safety** - TypeScript + Zod validation
3. **Success Messages** - Confirms submission received
4. **Auto-clear** - Form clears after successful submission
5. **Database Storage** - All submissions saved automatically

### Form Fields:
- First Name ✓ (min 2 chars)
- Last Name ✓ (min 2 chars)
- Email ✓ (valid email format)
- Phone ✓ (min 10 digits)
- Company ✓ (required)
- Message ✓ (min 10 chars)

## 📊 API Endpoints Quick Reference

### Test Form Submission:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "message": "Interested in AI solutions"
  }'

# Response: { "success": true, "id": 1 }
```

### Get All Submissions:
```bash
curl http://localhost:3001/api/contacts

# Response: Array of all contact submissions
```

### Export to Excel:
```bash
curl http://localhost:3001/api/contacts/export/excel > contacts.xlsx

# Downloads Excel file with all submissions
```

## 🎨 Customizing the Site

### Change Colors
Edit `frontend/tailwind.config.js` or use Tailwind classes in components.
Currently uses blue (#2563EB) as primary color.

### Change Company Name
Search and replace "KunTechs" with your company name in:
- `frontend/src/components/Navigation.tsx`
- `frontend/src/components/Footer.tsx`
- `frontend/index.html`

### Change Contact Info
Edit `frontend/src/components/Footer.tsx`:
```tsx
<a href="mailto:info@yourcompany.com">info@yourcompany.com</a>
<a href="tel:+1234567890">+1 (234) 567-8900</a>
```

### Add More Pages
1. Create new file: `frontend/src/pages/YourPage.tsx`
2. Add route in `frontend/src/App.tsx`
3. Add nav link in `frontend/src/components/Navigation.tsx`

## 🗄️ Database

SQLite database created at `backend/contacts.db`

### Table Schema:
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,           -- Auto-increment ID
  firstName TEXT NOT NULL,          -- First name
  lastName TEXT NOT NULL,           -- Last name
  email TEXT NOT NULL,              -- Email address
  phone TEXT NOT NULL,              -- Phone number
  company TEXT NOT NULL,            -- Company name
  message TEXT NOT NULL,            -- Message/inquiry
  createdAt DATETIME DEFAULT NOW    -- Submission timestamp
)
```

### Direct Database Access:
```bash
# Install sqlite3 CLI
sqlite3 backend/contacts.db

# View all contacts
sqlite> SELECT * FROM contacts;

# Count submissions
sqlite> SELECT COUNT(*) FROM contacts;

# Export to CSV
sqlite> .mode csv
sqlite> .headers on
sqlite> .output contacts.csv
sqlite> SELECT * FROM contacts;
```

## 📦 Production Build

### Build Frontend:
```bash
cd frontend && npm run build

# Output: frontend/dist/ (optimized, minified)
```

### Production Deployment:
```bash
# Using Docker (recommended for DokPloy)
docker build -t kuntechs-spa .
docker run -p 3001:3001 kuntechs-spa

# Or directly with Node
npm run build:backend && npm start
```

## 🚢 Deploying to DokPloy

1. Push code to GitHub
2. In DokPloy: Add Application → Point to repo
3. Configure port 3001
4. Click Deploy
5. DokPloy builds & runs automatically
6. Access via `your-domain.com:3001` (or port you configured)

See `DEPLOYMENT.md` for detailed instructions.

## 🔍 Testing the Application

### Test Home Page:
- Visit http://localhost:5173
- Click "Get Started" - should go to Contact page
- Click "Learn More" - should go to Digital AI page

### Test Contact Form:
1. Go to Contact Us page
2. Fill in form with test data
3. Submit
4. Should show success message
5. Check database: `curl http://localhost:3001/api/contacts`

### Test Excel Export:
```bash
# Download all submissions as Excel
curl http://localhost:3001/api/contacts/export/excel > my_contacts.xlsx

# Open in Excel/Google Sheets to verify
```

## ⚙️ Environment Variables

Supported env vars:
```
NODE_ENV=production      # or 'development'
PORT=3001               # API server port
DATABASE_PATH=./contacts.db  # Optional, where to store SQLite DB
```

## 🆘 Troubleshooting

### Frontend won't load
```bash
# Kill any process on 5173
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Restart
cd frontend && npm run dev
```

### Backend returns errors
```bash
# Check backend logs
tail -f backend.log

# Restart backend
ps aux | grep "node backend" | grep -v grep | awk '{print $2}' | xargs kill -9
node backend/server.js
```

### Database issues
```bash
# Delete corrupted database (will recreate on restart)
rm backend/contacts.db

# Restart backend
node backend/server.js
```

### Port already in use
```bash
# Find what's using the port
lsof -i :3001  # or :5173

# Kill the process
kill -9 <PID>
```

## 📚 Additional Resources

- `README.md` - Full documentation
- `DEPLOYMENT.md` - DokPloy deployment guide
- Frontend: React, TanStack Router, Tailwind CSS
- Backend: Express, SQLite, ExcelJS

## 🎯 Next Steps

1. **Customize**: Add your company info, colors, content
2. **Test**: Try the contact form, export to Excel
3. **Deploy**: Follow DEPLOYMENT.md for DokPloy
4. **Monitor**: Setup logging & backups
5. **Scale**: Add features as needed

## 📞 Support

- Check logs: `tail -f backend.log`
- Test API: `curl http://localhost:3001/api/health`
- View database: `sqlite3 backend/contacts.db`
