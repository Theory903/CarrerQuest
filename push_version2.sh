#!/bin/bash
cd /Users/abhishekjha/CarrerQuest

echo "=== Step 1: Removing node_modules from staging ==="
git reset -- Webapp/server/node_modules Webapp/node_modules node_modules 2>&1 || true

echo "=== Step 2: Staging all files ==="
git add -A 2>&1 | head -5

echo "=== Step 3: Committing ==="
git commit -m "Version 2" 2>&1

echo "=== Step 4: Creating tag ==="
git tag -a v2.0 -m "Version 2.0" 2>&1

echo "=== Step 5: Pushing to main ==="
git push origin main 2>&1

echo "=== Step 6: Pushing tag ==="
git push origin v2.0 2>&1

echo "=== Verification ==="
echo "Latest commit:"
git log --oneline -1
echo "Tags:"
git tag -l
echo "Status:"
git status -sb
