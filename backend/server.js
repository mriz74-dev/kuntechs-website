import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Database from 'better-sqlite3'
import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Initialize database
const db = new Database(path.join(__dirname, 'contacts.db'))

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Submit contact form
app.post('/api/contact', (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body

    // Validate input
    if (!firstName || !lastName || !email || !phone || !company || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO contacts (firstName, lastName, email, phone, company, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(firstName, lastName, email, phone, company, message)

    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Contact form submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting contact:', error)
    res.status(500).json({ error: 'Failed to submit contact form' })
  }
})

// Get all contacts
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC').all()
    res.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ error: 'Failed to fetch contacts' })
  }
})

// Export contacts to Excel
app.get('/api/contacts/export/excel', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY createdAt DESC').all()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Contacts')

    // Add headers
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'First Name', key: 'firstName', width: 15 },
      { header: 'Last Name', key: 'lastName', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Company', key: 'company', width: 20 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Submitted', key: 'createdAt', width: 20 },
    ]

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' },
    }

    // Add data rows
    contacts.forEach((contact) => {
      worksheet.addRow(contact)
    })

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.xlsx"')

    workbook.xlsx.write(res).then(() => {
      res.end()
    })
  } catch (error) {
    console.error('Error exporting contacts:', error)
    res.status(500).json({ error: 'Failed to export contacts' })
  }
})

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(frontendPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
})
