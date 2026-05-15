#!/bin/bash

# KunTechs SPA - Verification Script
# This script verifies the SPA is properly configured

echo "================================================================================"
echo "                    KunTechs SPA - Verification Script"
echo "================================================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} File exists: $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} File missing: $1"
        ((FAIL++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directory exists: $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} Directory missing: $1"
        ((FAIL++))
    fi
}

# Function to check if file doesn't exist (for cleanup)
check_not_exists() {
    if [ ! -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Old file removed: $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} Old file still exists: $1"
        ((FAIL++))
    fi
}

echo "1. Checking for old Google Sites files (should NOT exist)..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_not_exists "index.html"
check_not_exists "Home.html"
check_not_exists "Contact Us.html"
check_not_exists "digital-ai.html"
[ ! -d "Contact Us" ] && echo -e "${GREEN}✓${NC} Old directory removed: Contact Us" && ((PASS++)) || (echo -e "${RED}✗${NC} Old directory still exists: Contact Us" && ((FAIL++)))
[ ! -d "Home" ] && echo -e "${GREEN}✓${NC} Old directory removed: Home" && ((PASS++)) || (echo -e "${RED}✗${NC} Old directory still exists: Home" && ((FAIL++)))
[ ! -d "digital-ai" ] && echo -e "${GREEN}✓${NC} Old directory removed: digital-ai" && ((PASS++)) || (echo -e "${RED}✗${NC} Old directory still exists: digital-ai" && ((FAIL++)))
echo ""

echo "2. Checking SPA frontend files..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "frontend/src/main.tsx"
check_file "frontend/src/App.tsx"
check_dir "frontend/src/pages"
check_dir "frontend/src/components"
check_file "frontend/vite.config.ts"
check_file "frontend/tailwind.config.js"
echo ""

echo "3. Checking backend files..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "backend/server.js"
check_file "package.json"
check_file "Dockerfile"
check_file "docker-compose.yml"
echo ""

echo "4. Checking configuration files..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "nginx.conf"
check_file ".env.example"
check_file ".env.development"
check_file ".gitignore"
echo ""

echo "5. Checking documentation..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "README.md"
check_file "QUICK_START.md"
check_file "STARTUP.md"
check_file "DEPLOYMENT.md"
check_file "PROJECT_SUMMARY.md"
check_file "FIXES_APPLIED.md"
echo ""

echo "6. Checking frontend build artifacts..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_file "frontend/dist/index.html"
check_dir "frontend/dist/assets"
echo ""

echo "7. Checking Node modules installed..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
check_dir "node_modules"
check_dir "frontend/node_modules"
echo ""

echo "8. Checking for running processes..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if pgrep -f "vite" > /dev/null; then
    echo -e "${GREEN}✓${NC} Frontend dev server is running (Vite)"
    ((PASS++))
else
    echo -e "${YELLOW}ℹ${NC} Frontend dev server not running (OK if using npm start)"
fi

if pgrep -f "node.*backend" > /dev/null; then
    echo -e "${GREEN}✓${NC} Backend server is running"
    ((PASS++))
else
    echo -e "${YELLOW}ℹ${NC} Backend server not running (OK if not started yet)"
fi
echo ""

echo "9. Testing backend health endpoint..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v curl &> /dev/null; then
    HEALTH=$(curl -s http://localhost:3001/api/health 2>/dev/null)
    if echo "$HEALTH" | grep -q "ok"; then
        echo -e "${GREEN}✓${NC} Backend API is responding: $HEALTH"
        ((PASS++))
    else
        echo -e "${YELLOW}ℹ${NC} Backend not responding yet (not started)"
    fi
else
    echo -e "${YELLOW}ℹ${NC} curl not available, skipping health check"
fi
echo ""

echo "10. Checking nginx configuration..."
echo "   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if grep -q "try_files \$uri \$uri/ /index.html" nginx.conf; then
    echo -e "${GREEN}✓${NC} nginx.conf has correct SPA routing"
    ((PASS++))
else
    echo -e "${RED}✗${NC} nginx.conf missing proper SPA routing"
    ((FAIL++))
fi
echo ""

echo "================================================================================"
echo "                              SUMMARY"
echo "================================================================================"
echo ""
echo -e "Passed checks: ${GREEN}$PASS${NC}"
echo -e "Failed checks: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Your SPA is properly configured.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run: npm run dev"
    echo "  2. Open: http://localhost:5173"
    echo "  3. Test navigation between pages"
    echo "  4. Submit the contact form"
    echo "  5. Check: http://localhost:3001/api/contacts"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please review the errors above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  - Run: npm install && cd frontend && npm install"
    echo "  - Run: npm run build (to build frontend)"
    echo "  - Check: STARTUP.md for troubleshooting"
    exit 1
fi
