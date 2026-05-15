# KunTechs SPA - Pre-Deployment Checklist

Complete this checklist before deploying to DokPloy and production.

## ✅ Code Quality & Verification

### Setup Verification
- [ ] Run `bash verify.sh` - all checks pass
- [ ] No TypeScript errors: `cd frontend && npx tsc --noEmit`
- [ ] No console errors in browser DevTools
- [ ] No backend errors: `node backend/server.js` starts cleanly

### Code Review
- [ ] Review company name (KunTechs) and update if needed
- [ ] Review all text content (accurate and professional)
- [ ] Review company colors (primary blue #2563EB is correct)
- [ ] Review contact information (footer is accurate)
- [ ] No placeholder text remaining
- [ ] All links are working

### Dependencies
- [ ] `npm install` completed successfully
- [ ] `cd frontend && npm install` completed successfully
- [ ] No security vulnerabilities: `npm audit` (check for critical issues)
- [ ] Frontend builds: `cd frontend && npm run build` (no errors)

## 🚀 Functionality Testing

### Local Development Testing
- [ ] `npm run dev` starts without errors
- [ ] Frontend loads at http://localhost:5173
- [ ] All 3 pages load without errors:
  - [ ] Home page (`/`)
  - [ ] Digital AI page (`/digital-ai`)
  - [ ] Contact Us page (`/contact`)

### Navigation Testing
- [ ] Click navbar "Home" → navigates to `/`
- [ ] Click navbar "Digital AI" → navigates to `/digital-ai`
- [ ] Click navbar "Contact Us" → navigates to `/contact`
- [ ] Click logo → navigates to `/`
- [ ] Browser back/forward buttons work
- [ ] URL changes correctly for each page
- [ ] No page reloads (instant navigation)

### Contact Form Testing
- [ ] All form fields are present and labeled correctly
- [ ] Real-time validation works:
  - [ ] Empty field shows error
  - [ ] Invalid email shows error
  - [ ] Short names show error
  - [ ] Valid data clears errors
- [ ] Can submit form with valid data
- [ ] Success message appears with ID
- [ ] Form clears after successful submission
- [ ] Error message appears on submit failure
- [ ] Form prevents submission while validating

### API Testing
- [ ] `curl http://localhost:3001/api/health` returns `{"status":"ok"}`
- [ ] Form submission stores data in database
- [ ] `curl http://localhost:3001/api/contacts` returns array
- [ ] `curl http://localhost:3001/api/contacts/export/excel` downloads file
- [ ] Downloaded Excel file opens correctly
- [ ] Excel has proper headers and data

### Database Testing
- [ ] Database file created at `backend/contacts.db`
- [ ] Can view submissions: `sqlite3 backend/contacts.db "SELECT * FROM contacts;"`
- [ ] Contact count is correct: `sqlite3 backend/contacts.db "SELECT COUNT(*) FROM contacts;"`
- [ ] Timestamps are correct

### Production Build Testing
- [ ] `npm run build` completes without errors
- [ ] `frontend/dist/` directory created with optimized files
- [ ] `npm start` serves both API and frontend
- [ ] Navigate to http://localhost:3001
- [ ] All pages load and work correctly
- [ ] API endpoints work on port 3001
- [ ] Form submission works in production mode

## 🐳 Docker Testing

### Docker Build
- [ ] `docker build -t kuntechs-spa:latest .` succeeds
- [ ] No build warnings or errors
- [ ] Image size is reasonable (~500MB or less)

### Docker Run
- [ ] `docker run -p 3001:3001 kuntechs-spa:latest` starts
- [ ] Container health check passes
- [ ] Navigate to http://localhost:3001
- [ ] All pages load and work
- [ ] Contact form works
- [ ] API endpoints work
- [ ] Database persists (check with volume mounting)

### Docker Compose
- [ ] `docker-compose up -d` starts successfully
- [ ] Access http://localhost:3001
- [ ] All functionality works
- [ ] `docker-compose logs` shows clean startup
- [ ] Database volume mounts correctly
- [ ] `docker-compose down` stops cleanly

## 📋 Configuration Check

### Environment Variables
- [ ] `.env.example` has all required variables
- [ ] `.env.development` is set up for local development
- [ ] `NODE_ENV=production` in production
- [ ] `PORT=3001` is set correctly
- [ ] No sensitive data in .env or code

### Configuration Files
- [ ] `Dockerfile` is correct and optimized
- [ ] `docker-compose.yml` has proper volume mounts
- [ ] `nginx.conf` has SPA routing configured
- [ ] `frontend/vite.config.ts` proxy is set to `localhost:3001`
- [ ] `backend/server.js` serves frontend from `dist/`

## 🔐 Security Check

### Code Security
- [ ] No hardcoded secrets in code
- [ ] No API keys exposed
- [ ] No console.log() with sensitive data
- [ ] SQL injection protected (using prepared statements)
- [ ] CORS properly configured
- [ ] Input validation on frontend and backend

### Deployment Security
- [ ] HTTPS will be enabled (DokPloy auto-configures)
- [ ] Database file is not exposed
- [ ] Only necessary ports are open
- [ ] No debug mode enabled in production

## 📦 Deployment Preparation

### GitHub/Git
- [ ] All files committed to git
- [ ] No uncommitted changes: `git status` is clean
- [ ] Branch is up to date with remote
- [ ] Ready to push to GitHub

### DokPloy Setup
- [ ] Read DEPLOYMENT.md completely
- [ ] Understand DokPloy workflow
- [ ] Have GitHub account ready
- [ ] Have VPS credentials ready
- [ ] Know your domain name (if using one)

### Deployment Documentation
- [ ] DEPLOYMENT.md is accurate
- [ ] All paths are correct
- [ ] All commands are tested
- [ ] Backup strategy documented
- [ ] Troubleshooting section reviewed

## 📝 Documentation Check

### User Documentation
- [ ] README.md is complete and accurate
- [ ] QUICK_START.md has all commands
- [ ] STARTUP.md covers troubleshooting
- [ ] DEPLOYMENT.md has step-by-step instructions
- [ ] All external links work
- [ ] Code examples are correct

### Code Comments
- [ ] Complex logic is commented
- [ ] API endpoints documented in code
- [ ] Database schema is clear
- [ ] No TODO items left behind

## 🧪 Final Verification

### Pre-Deployment Test
- [ ] `bash verify.sh` passes all checks
- [ ] All tests from "Functionality Testing" pass
- [ ] All tests from "Docker Testing" pass
- [ ] All tests from "Configuration Check" pass
- [ ] No errors in browser console
- [ ] No errors in backend logs

### Staging Equivalent Test
- [ ] Run Docker in production mode locally
- [ ] Access via http://localhost:3001
- [ ] Complete all user workflows:
  - [ ] Visit all pages
  - [ ] Submit contact form
  - [ ] Download Excel export
  - [ ] Test API directly
- [ ] Everything works without issues

### Final Cleanup
- [ ] Remove all test/debug data
- [ ] Clear browser cache
- [ ] Stop all local servers
- [ ] No files left uncommitted

## 🚀 Go/No-Go Decision

### Ready to Deploy? ✅
If all checkboxes are checked, you're ready:
1. Push final changes to GitHub
2. Follow DEPLOYMENT.md
3. Deploy to DokPloy
4. Test in production

### Not Ready? ⏸️
If any checkboxes are unchecked:
1. Go back and fix the issue
2. Test the fix locally
3. Re-check the item
4. Return here when ready

## 📊 Deployment Tracking

### Before Deployment
- Date started: _______________
- Last verified: _______________
- Developer: _______________

### After Deployment
- Deployment date: _______________
- Deployment time: _______________
- Deployed by: _______________
- Production URL: _______________
- Monitoring enabled: Yes / No
- Backups enabled: Yes / No

## 🎯 Post-Deployment Actions

Once deployed to production:

1. **Verify Production**
   - [ ] Access production URL
   - [ ] All pages load
   - [ ] Contact form works
   - [ ] Data is stored

2. **Setup Monitoring**
   - [ ] Enable DokPloy monitoring
   - [ ] Setup log aggregation
   - [ ] Configure alerts

3. **Setup Backups**
   - [ ] Enable automated backups
   - [ ] Test backup restoration
   - [ ] Document backup location

4. **Announce**
   - [ ] Update DNS (if using new domain)
   - [ ] Announce to users
   - [ ] Update social media
   - [ ] Send notification emails

5. **Monitor**
   - [ ] Check logs daily for first week
   - [ ] Monitor performance
   - [ ] Handle user feedback
   - [ ] Fix any issues that arise

## 🆘 Issues During Deployment?

If something goes wrong during deployment:

1. **Check STARTUP.md** - Common issues and solutions
2. **Check DEPLOYMENT.md** - Deployment-specific issues
3. **Check logs** - DokPloy and application logs
4. **Rollback if needed** - Previous version available
5. **Contact support** - DokPloy community/docs

## ✨ Success Criteria

Your deployment is successful when:
- ✅ Production URL is accessible
- ✅ All pages load without errors
- ✅ Contact form submits successfully
- ✅ Excel export works
- ✅ API endpoints respond
- ✅ Database persists data
- ✅ HTTPS/SSL is active
- ✅ No errors in logs
- ✅ Performance is acceptable
- ✅ Backups are running

---

**Checklist Version**: 1.0
**Last Updated**: May 2024
**Status**: Ready for deployment

**Good luck! 🚀**
