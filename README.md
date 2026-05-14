# KunTechs - Modern SPA Application

A modern, type-safe Single Page Application built with React, TypeScript, and Express. This application replaces the static Google Sites website with a fully-functional, sustainable SPA.

## Features

- **Three-Page SPA**: Home, Digital AI, and Contact Us
- **Contact Form Management**: Collect customer details with validation
- **Data Export**: Export contact submissions to Excel
- **Database Storage**: All submissions stored in SQLite
- **Type-Safe**: Full TypeScript support frontend and backend
- **Modern UI**: Built with Tailwind CSS and React
- **Docker Ready**: Ready for DokPloy VPS deployment
- **No Google Dependencies**: Completely independent platform

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js/Express** - API server
- **SQLite (better-sqlite3)** - Database
- **ExcelJS** - Excel export functionality
- **CORS** - Cross-origin requests
- **Body Parser** - Request parsing

## Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install
   ```

2. **Start development servers**
   ```bash
   npm run dev
   ```
   This runs both frontend (port 5173) and backend (port 3001) concurrently.

3. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start frontend dev server only
- `npm run dev:backend` - Start backend server only
- `npm run build` - Build frontend for production
- `npm start` - Start production server

## Project Structure

```
.
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── pages/           # Page components (Home, DigitalAI, Contact)
│   │   ├── components/      # Reusable components (Layout, Navigation, Footer)
│   │   ├── App.tsx          # Router setup
│   │   └── main.tsx         # Entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json
├── backend/                 # Express API
│   ├── server.js            # Main server file
│   └── contacts.db          # SQLite database (auto-created)
├── Dockerfile               # Production Docker image
├── docker-compose.yml       # Local Docker setup
└── package.json             # Root package configuration
```

## API Endpoints

### Form Submission
```
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Tech Company",
  "message": "I'm interested in AI solutions"
}

Response: { "success": true, "id": 1 }
```

### Get All Contacts
```
GET /api/contacts

Response: [
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Company",
    "message": "...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Export to Excel
```
GET /api/contacts/export/excel

Response: Binary Excel file (contacts.xlsx)
```

### Health Check
```
GET /api/health

Response: { "status": "ok" }
```

## Database

SQLite database (`contacts.db`) is automatically created on first run. The database contains a `contacts` table with the following schema:

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Deployment on DokPloy

### Step 1: Prepare Your VPS
1. Ensure Docker and Docker Compose are installed
2. SSH into your VPS

### Step 2: Deploy with DokPloy
1. Add a new application in DokPloy dashboard
2. Point to your GitHub repository
3. Set build command: `docker build -t kuntechs-spa .`
4. Set run command: `docker run -p 3001:3001 kuntechs-spa`
5. Expose port 3001

### Step 3: Environment Configuration
Create `.env` file on your VPS:
```
NODE_ENV=production
PORT=3001
```

### Step 4: Data Persistence
Mount a volume for the database:
```bash
docker run -p 3001:3001 -v /data/contacts.db:/app/contacts.db kuntechs-spa
```

### Alternative: Using docker-compose on VPS
```bash
docker-compose up -d
```

## Features Explained

### Contact Form
- **Real-time validation** with React Hook Form and Zod
- **Type-safe** form submission
- **Success/error feedback** to users
- **Auto-clear** on successful submission

### Data Management
- All submissions stored in SQLite database
- View all submissions via API
- Export submissions to Excel with formatted headers
- Automatic timestamps for each submission

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Modern, clean UI
- Smooth transitions and interactions

## Security Considerations

- ✅ CORS enabled for controlled access
- ✅ Input validation on frontend and backend
- ✅ SQL prepared statements (protection against SQL injection)
- ✅ Type-safe code reduces runtime errors
- ⚠️ For production, consider adding:
  - Authentication/authorization
  - Rate limiting
  - HTTPS/SSL
  - Email notifications
  - Data encryption

## Customization

### Change Colors/Branding
Edit Tailwind config in `frontend/tailwind.config.js` or modify Tailwind classes in components.

### Add More Pages
1. Create new component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Add navigation link in `frontend/src/components/Navigation.tsx`

### Modify Contact Form Fields
1. Update the form in `frontend/src/pages/Contact.tsx`
2. Update schema validation (Zod)
3. Update backend database schema in `backend/server.js`

## Troubleshooting

### Port already in use
- Frontend: `PORT=5174 npm run dev:frontend`
- Backend: `PORT=3002 npm run dev:backend`

### Database locked
- Stop all servers and delete `backend/contacts.db`
- Restart application to recreate fresh database

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Future Enhancements

- Email notifications on form submission
- User authentication and admin dashboard
- Advanced analytics and reporting
- Integration with email service (SendGrid, Mailgun)
- SMS notifications
- Webhook support
- API authentication (JWT)
- Rate limiting and abuse prevention

## License

MIT License - feel free to use and modify for your needs.

## Support

For issues or questions, create an issue in the repository or contact support.
