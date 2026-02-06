#!/bin/bash

# BD Traffic Signs Website Test Script
# Checks if all required files exist and are properly configured

echo "======================================"
echo "BD Traffic Signs Website Test Script"
echo "======================================"
echo ""

WEBSITE_DIR="/home/mnx/bd-traffic-signs/website"
ERRORS=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check if directory exists
if [ ! -d "$WEBSITE_DIR" ]; then
    echo -e "${RED}ERROR: Website directory not found!${NC}"
    exit 1
fi

cd "$WEBSITE_DIR"

echo "1. Checking required files..."
echo "------------------------------"

# Required files
required_files=(
    "index.html"
    "css/style.css"
    "css/responsive.css"
    "js/main.js"
    "README.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} Found: $file"
    else
        echo -e "${RED}✗${NC} Missing: $file"
        ((ERRORS++))
    fi
done

echo ""
echo "2. Checking assets..."
echo "---------------------"

# Check images
image_files=(
    "assets/images/figure_benchmark_comparison.png"
    "assets/images/figure_training_metrics.png"
    "assets/images/figure_model_comparison.png"
    "assets/images/figure_complete_results.png"
    "assets/images/figure_class_distribution.jpg"
    "assets/images/figure_training_samples.jpg"
)

for file in "${image_files[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo -e "${GREEN}✓${NC} Found: $file ($size)"
    else
        echo -e "${RED}✗${NC} Missing: $file"
        ((ERRORS++))
    fi
done

echo ""

# Check papers
paper_files=(
    "assets/papers/RESEARCH_PAPER.pdf"
    "assets/papers/PREPRINT.pdf"
    "assets/papers/CSE_499B_FINAL_REPORT.pdf"
)

for file in "${paper_files[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo -e "${GREEN}✓${NC} Found: $file ($size)"
    else
        echo -e "${YELLOW}!${NC} Missing: $file (optional)"
        ((WARNINGS++))
    fi
done

echo ""
echo "3. Checking HTML content..."
echo "---------------------------"

# Check for placeholder text that should be updated
if grep -q "your-username" index.html; then
    echo -e "${YELLOW}!${NC} Warning: Found 'your-username' - update GitHub links"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} GitHub links appear to be updated"
fi

if grep -q "your.email@example.com" index.html; then
    echo -e "${YELLOW}!${NC} Warning: Found placeholder email - update contact info"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} Email appears to be updated"
fi

echo ""
echo "4. File size check..."
echo "---------------------"

total_size=$(du -sh . | cut -f1)
echo "Total website size: $total_size"

# Check if any files are too large
large_files=$(find assets -type f -size +10M 2>/dev/null)
if [ -n "$large_files" ]; then
    echo -e "${YELLOW}!${NC} Warning: Large files detected (>10MB):"
    echo "$large_files"
    echo "Consider compressing these files for better performance."
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} No excessively large files detected"
fi

echo ""
echo "5. Syntax checks..."
echo "-------------------"

# Check HTML syntax (basic)
if grep -q "</html>" index.html && grep -q "</body>" index.html; then
    echo -e "${GREEN}✓${NC} HTML appears to be properly closed"
else
    echo -e "${RED}✗${NC} HTML may have syntax errors"
    ((ERRORS++))
fi

# Check CSS syntax (basic)
if grep -q "}" css/style.css; then
    echo -e "${GREEN}✓${NC} CSS syntax appears valid"
else
    echo -e "${YELLOW}!${NC} Warning: CSS may have issues"
    ((WARNINGS++))
fi

# Check JavaScript syntax (basic)
if grep -q "}" js/main.js; then
    echo -e "${GREEN}✓${NC} JavaScript syntax appears valid"
else
    echo -e "${YELLOW}!${NC} Warning: JavaScript may have issues"
    ((WARNINGS++))
fi

echo ""
echo "======================================"
echo "Test Summary"
echo "======================================"
echo -e "Errors:   ${RED}$ERRORS${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Website is ready to deploy.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Test locally: python -m http.server 8000"
    echo "2. Review DEPLOYMENT_CHECKLIST.md"
    echo "3. Deploy to GitHub Pages or Netlify"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Some warnings found. Review and fix before deploying.${NC}"
    exit 0
else
    echo -e "${RED}✗ Errors found! Fix these before deploying.${NC}"
    exit 1
fi
