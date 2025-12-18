#!/bin/bash
# VSCode Performance Cleanup Script
# Run this periodically to improve VSCode performance

echo "🧹 Cleaning up workspace for better VSCode performance..."

# Navigate to project root
cd "/Users/davinderpal/development/Solidev Electrosoft v4/solidevelectrosoft-v4"

# 1. Remove .DS_Store files
echo "📁 Removing .DS_Store files..."
find . -name ".DS_Store" -delete
echo "✓ Done"

# 2. Clean dist folder
echo "🗑️  Cleaning dist folder..."
rm -rf dist/*
echo "✓ Done"

# 3. Clear npm cache
echo "📦 Clearing npm cache..."
npm cache clean --force 2>/dev/null
echo "✓ Done"

# 4. Clear TypeScript cache
echo "⚡ Clearing TypeScript cache..."
rm -rf /Users/davinderpal/Library/Caches/typescript/* 2>/dev/null
echo "✓ Done"

# 5. Clear VSCode workspace storage (optional - uncomment if needed)
# echo "💾 Clearing VSCode workspace storage..."
# rm -rf "$HOME/Library/Application Support/Code/User/workspaceStorage"/*
# echo "✓ Done"

# 6. Show sizes
echo ""
echo "📊 Current sizes:"
du -sh node_modules 2>/dev/null
du -sh functions/node_modules 2>/dev/null
du -sh solidev/node_modules 2>/dev/null
du -sh dist 2>/dev/null

echo ""
echo "✨ Cleanup complete! Restart VSCode for best results."
echo "⚠️  If still slow, consider:"
echo "   - Disabling unused extensions"
echo "   - Closing other applications"
echo "   - Increasing system RAM"
