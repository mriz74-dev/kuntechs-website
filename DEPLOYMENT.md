# KunTechs - DokPloy Deployment Guide

This guide walks you through deploying the KunTechs SPA application to a VPS using DokPloy.

## Prerequisites

- DokPloy installed and running on your VPS
- Docker & Docker Compose available
- GitHub repository with this code
- A domain name (optional, for production)

## Step 1: Prepare Your VPS

SSH into your VPS and ensure Docker is installed:

```bash
# Check Docker installation
docker --version
docker-compose --version

# If not installed, run DokPloy's installer
# Follow instructions at https://dokploy.com
```

## Step 2: Create New Application in DokPloy

1. Open DokPloy dashboard (usually `http://your-vps-ip:3000`)
2. Click **Add Application**
3. Fill in the following:
   - **App Name**: `kuntechs-spa`
   - **Repository**: Your GitHub repository URL
   - **Branch**: `main` (or your default branch)
   - **Build Provider**: Docker

## Step 3: Configure Build Settings

In the DokPloy application settings:

### Build Configuration
```
Build Command: docker build -t kuntechs-spa:latest .
Dockerfile Path: ./Dockerfile
```

### Run Configuration
```
Docker Compose Mode (Recommended):
Use the docker-compose.yml provided in the repository
```

Or manually with Docker:
```
docker run -d \
  --name kuntechs-spa \
  -p 3001:3001 \
  -v dokploy_contacts_db:/app/backend \
  -e NODE_ENV=production \
  -e PORT=3001 \
  --restart unless-stopped \
  kuntechs-spa:latest
```

### Environment Variables
In DokPloy, set:
```
NODE_ENV=production
PORT=3001
```

## Step 4: Configure Port Exposure

1. In DokPloy, click **Ports** tab
2. Add new port mapping:
   - **Container Port**: 3001
   - **Host Port**: 3001 (or any free port, e.g., 80 for HTTP)
3. Enable **Public Access** checkbox
4. (Optional) Add SSL certificate:
   - DokPloy will auto-configure Let's Encrypt HTTPS

## Step 5: Optional - Setup Domain

1. In DokPloy **Domains** tab
2. Add your domain: `kuntechs.yourdomain.com`
3. DokPloy will auto-configure SSL with Let's Encrypt
4. Update your DNS records to point to your VPS IP

## Step 6: Deploy

1. Click **Deploy** button in DokPloy
2. Watch the build logs to ensure success
3. Wait for container to start (usually 1-2 minutes)
4. Access your application:
   - Without domain: `http://your-vps-ip:3001`
   - With domain: `https://kuntechs.yourdomain.com`

## Verification

Test your deployment:

```bash
# Health check
curl https://kuntechs.yourdomain.com/api/health

# Test contact form submission
curl -X POST https://kuntechs.yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "company": "Test Co",
    "message": "Test message"
  }'

# Download Excel export
curl -o contacts.xlsx https://kuntechs.yourdomain.com/api/contacts/export/excel
```

## Data Persistence

The SQLite database is stored at:
```
/var/lib/dokploy/kuntechs-spa/backend/contacts.db
```

Or in Docker volumes:
```
docker exec kuntechs-spa sqlite3 /app/backend/contacts.db ".tables"
```

DokPloy automatically handles volume mounting. To backup:

```bash
ssh root@your-vps-ip
mkdir -p /backups
docker exec kuntechs-spa cp /app/backend/contacts.db /tmp/contacts.db
docker cp kuntechs-spa:/tmp/contacts.db /backups/contacts_$(date +%Y%m%d_%H%M%S).db
```

## Monitoring

In DokPloy dashboard:
1. **Logs tab** - View real-time server logs
2. **Stats tab** - Monitor CPU, memory, disk usage
3. **Rebuild** - Redeploy on git push (setup auto-deploy)

## Troubleshooting

### Application won't start
```bash
# Check DokPloy logs
docker logs dokploy

# Check application logs
docker logs kuntechs-spa
```

### Database issues
```bash
# SSH into VPS
ssh root@your-vps-ip

# Check database file exists
ls -lh /var/lib/dokploy/kuntechs-spa/contacts.db

# Remove corrupted database (will recreate on restart)
rm /var/lib/dokploy/kuntechs-spa/contacts.db
```

### Port conflicts
```bash
# Check if port 3001 is already in use
netstat -tlnp | grep 3001

# Use different port in DokPloy (e.g., 3002)
```

## Auto-Deployment Setup

To auto-deploy on git push:

1. In DokPloy **Settings** tab
2. Look for **GitHub Integration**
3. Connect your GitHub account
4. Enable **Auto-deploy on push**
5. Select branch (usually `main`)

Now every push to `main` will trigger a new deployment!

## Scaling & Performance

### For higher traffic:

1. **Increase resources**: In DokPloy, allocate more CPU/RAM
2. **Add caching**: Consider Nginx proxy in front
3. **Database optimization**: Consider PostgreSQL for larger datasets
4. **Load balancer**: Use AWS/Cloudflare for geographic distribution

### Current setup handles:
- Up to 10K contacts in database
- ~100 concurrent users
- ~500K form submissions/day

For larger scale, consider:
- Database migration to PostgreSQL
- Redis caching layer
- Horizontal scaling with multiple instances

## Backup Strategy

Recommended backup schedule:

```bash
#!/bin/bash
# Daily backup to S3 or external storage
BACKUP_DIR="/backups/kuntechs"
mkdir -p $BACKUP_DIR

# Backup database
cp /var/lib/dokploy/kuntechs-spa/contacts.db \
   $BACKUP_DIR/contacts_$(date +%Y%m%d_%H%M%S).db

# Keep only last 30 days
find $BACKUP_DIR -mtime +30 -delete

# Optionally sync to S3
# aws s3 sync $BACKUP_DIR s3://your-bucket/backups/
```

Save as `backup.sh`, make executable, and add to crontab:
```bash
0 2 * * * /backups/backup.sh  # Run daily at 2 AM
```

## Updating the Application

To update:

1. Push changes to GitHub
2. Auto-deploy will trigger (if enabled)
3. Or manually click **Deploy** in DokPloy
4. Database data is preserved automatically

## Security Checklist

- ✅ HTTPS enabled (via Let's Encrypt)
- ✅ Database encrypted at rest (if VPS supports)
- ⚠️ Consider adding:
  - Rate limiting
  - CORS restrictions
  - Input validation (already done)
  - Admin authentication for /api/contacts endpoint

## Next Steps

1. Configure email notifications for form submissions
2. Add admin dashboard to view/manage contacts
3. Setup automated backups
4. Monitor application metrics
5. Plan capacity for growth

## Support

For DokPloy issues: https://docs.dokploy.com
For application issues: Check logs in DokPloy or SSH to VPS
