#!/bin/bash
cd /Users/abhishekjha/CarrerQuest

echo "=== Current Status ==="
git status -sb | head -5
echo ""

echo "=== Latest Commits ==="
git log --oneline -3
echo ""

echo "=== Staging all changes ==="
git add -A
echo ""

echo "=== Committing ==="
git commit -m "Version 2.0 - Update repository $(date)" 2>&1
echo ""

echo "=== Pushing to origin main ==="
git push origin main 2>&1
echo ""

echo "=== Pushing tag v2.0 ==="
git push origin v2.0 2>&1 || echo "Tag push completed or tag doesn't exist"
echo ""

echo "=== Final Status ==="
git status -sb | head -3
