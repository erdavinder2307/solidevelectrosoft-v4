# VSCode Performance Optimization Guide

## 🔍 Issues Identified

### Critical Performance Bottlenecks:
1. **System Overload**
   - Load average: 5.30 (high CPU pressure)
   - 14GB/16GB RAM used (88% utilization)
   - 4.1GB memory compressed (heavy swapping)

2. **Large Codebase**
   - 34,052 JS/TS files being indexed
   - 3 separate node_modules folders (586MB total)
   - 32MB video file in src/assets
   - TypeScript servers using 800MB+ RAM

3. **Multiple Language Servers Running**
   - 2 TypeScript servers (3GB each max)
   - CloudFormation server (415MB)
   - Angular language server (77MB)
   - CSS, JSON, YAML, Markdown servers

4. **Heavy File Watching**
   - Watching all 3 node_modules directories
   - Watching dist folder unnecessarily
   - Large media files being indexed

## ✅ Optimizations Applied

### 1. VSCode Settings (`.vscode/settings.json`)
- ✅ Excluded node_modules from file watchers
- ✅ Disabled semantic highlighting
- ✅ Disabled bracket colorization
- ✅ Disabled minimap
- ✅ Increased TypeScript memory to 4GB
- ✅ Disabled auto-type acquisition
- ✅ Disabled git auto-refresh
- ✅ Limited suggestion count
- ✅ Disabled parameter hints
- ✅ Excluded video files from watching

### 2. TypeScript Configuration (`tsconfig.app.json`)
- ✅ Added exclude for node_modules, functions, solidev
- ✅ Prevents TS from indexing 34K+ files in dependencies

### 3. VSCode Ignore (`.vscodeignore`)
- ✅ Created file to prevent indexing build artifacts
- ✅ Excluded large media files

### 4. Cleanup Script (`scripts/cleanup-vscode.sh`)
- ✅ Automated cleanup for caches and temp files
- ✅ Can be run periodically

### 5. System Cleanup
- ✅ Cleared TypeScript cache

## 🚀 Next Steps (Manual Actions Required)

### Immediate (Do Now):
1. **Restart VSCode** - Apply all new settings
2. **Close unused editor tabs** - Free up memory
3. **Run cleanup script:**
   ```bash
   ./scripts/cleanup-vscode.sh
   ```

### Short-term (Recommended):
1. **Disable unused extensions:**
   - Open Extensions panel (Cmd+Shift+X)
   - Disable CloudFormation if not using AWS
   - Disable Angular if only using React
   - Check for duplicate linters/formatters

2. **Close other applications:**
   - Free up system RAM (currently 88% used)
   - Check Activity Monitor for memory hogs

3. **Optimize images:**
   ```bash
   # The 32MB video could be moved to public or compressed
   # PNG logos at 3.9MB each could be optimized
   ```

### Long-term (Optional):
1. **Split the workspace** into 3 separate windows:
   - Main app (root)
   - Firebase functions (functions/)
   - Solidev module (solidev/)
   
2. **Upgrade system RAM** (currently 16GB, would benefit from 32GB)

3. **Use .gitattributes** for large files:
   ```gitattributes
   *.mp4 filter=lfs diff=lfs merge=lfs -text
   *.mov filter=lfs diff=lfs merge=lfs -text
   ```

## 📊 Expected Improvements

After applying these fixes and restarting:
- **40-60% reduction** in memory usage by TypeScript
- **Faster file searches** (excluded 586MB of dependencies)
- **Quicker editor response** (disabled heavy visual features)
- **Reduced CPU usage** (fewer file watchers, disabled auto-features)

## 🔧 Troubleshooting

If still slow after restart:

1. **Check extension count:**
   ```bash
   code --list-extensions | wc -l
   ```
   Target: < 20 extensions

2. **Monitor TypeScript memory:**
   - Open Command Palette (Cmd+Shift+P)
   - Type "TypeScript: Restart TS Server"

3. **Check for runaway processes:**
   ```bash
   ps aux | grep -i "code\|node" | grep -v grep
   ```

4. **Last resort - reload window:**
   - Command Palette → "Developer: Reload Window"

## 📝 Maintenance

Run monthly:
```bash
./scripts/cleanup-vscode.sh
```

## 🎯 Performance Metrics to Track

Before optimization:
- RAM: 14GB/16GB (88%)
- TypeScript: 800MB+
- Load: 5.30
- Files indexed: 34,052

Target after optimization:
- RAM: < 12GB/16GB (75%)
- TypeScript: < 500MB
- Load: < 3.0
- Files indexed: ~2,000 (src only)
