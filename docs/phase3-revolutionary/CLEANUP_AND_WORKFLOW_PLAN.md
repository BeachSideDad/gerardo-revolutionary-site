# 🧹 CLEANUP & WORKFLOW PLAN

## Current State Assessment

### ✅ Working Production Files (KEEP)
These are live on Vercel and must be preserved:
- `app/` - All page components (working)
- `components/` - All UI components (working)
- `lib/core-data.ts` - Data integration
- `package.json` - Dependencies
- `next.config.js` - Next.js config
- `tailwind.config.ts` - Styling config
- `.env.local` (if exists) - Environment variables

### 📚 Documentation Files (ORGANIZE)
Current docs scattered in root and docs/:
- `README.md` - Basic readme
- `REVOLUTIONARY_DESIGN_BRIEF.md` - New vision (not committed)
- `DEV_EXECUTION_GUIDE.md` - Implementation guide (not committed)
- `AGENT_ORCHESTRATION_PLAN.md` - Agent workflow (not committed)
- `docs/competitor-analysis.md` - Market research (not committed)
- `docs/market-research.md` - Industry analysis (not committed)

### 🗑️ To Remove/Archive
- Old architecture files (if any remain)
- Unused documentation
- Test files not needed

---

## 📁 PROPOSED CLEAN STRUCTURE

```
gerardo-revolutionary-site/
├── app/                          # [KEEP] Next.js app directory
├── components/                   # [KEEP] Current working components
├── lib/                         # [KEEP] Utilities and data
├── public/                      # [KEEP] Static assets
├── docs/                        # [ORGANIZE] All documentation
│   ├── phase1-complete/         # Archive Phase 1 docs
│   ├── phase2-complete/         # Archive Phase 2 docs
│   └── phase3-revolutionary/    # New revolutionary design docs
│       ├── DESIGN_BRIEF.md
│       ├── EXECUTION_GUIDE.md
│       ├── AGENT_WORKFLOW.md
│       ├── competitor-analysis.md
│       └── market-research.md
├── _archive/                    # Old/obsolete files
├── package.json                 # [KEEP]
├── README.md                    # [UPDATE] Clear project readme
└── .gitignore                   # [KEEP]
```

---

## 🔧 CLEANUP WORKFLOW

### Phase 1: Backup Current State
```bash
# Create backup branch
git checkout -b backup-phase2-complete
git add .
git commit -m "Backup: Phase 2 complete state before revolutionary redesign"
git push origin backup-phase2-complete

# Return to main
git checkout main
```

### Phase 2: Organize Documentation
```bash
# Create new structure
mkdir -p docs/phase1-complete
mkdir -p docs/phase2-complete  
mkdir -p docs/phase3-revolutionary
mkdir -p _archive

# Move revolutionary docs to proper location
mv REVOLUTIONARY_DESIGN_BRIEF.md docs/phase3-revolutionary/DESIGN_BRIEF.md
mv DEV_EXECUTION_GUIDE.md docs/phase3-revolutionary/EXECUTION_GUIDE.md
mv AGENT_ORCHESTRATION_PLAN.md docs/phase3-revolutionary/AGENT_WORKFLOW.md

# Keep research docs in phase3
mv docs/competitor-analysis.md docs/phase3-revolutionary/
mv docs/market-research.md docs/phase3-revolutionary/
```

### Phase 3: Archive Old Files
```bash
# Move any old architecture docs if they exist
# (Check first, then move)
find . -name "ARCHITECTURE.md" -o -name "COMPONENT_MAP.md" -o -name "PHASE*.md" | xargs -I {} mv {} _archive/

# Move any other obsolete files
mv VISUAL_DESIGN_SPEC.md _archive/ 2>/dev/null || true
mv DEV_PHASE3_VISUAL_REVOLUTION.md _archive/ 2>/dev/null || true
```

### Phase 4: Update Project Files
```bash
# Update README with clear structure
cat > README.md << 'EOF'
# TMJ Revolutionary Website

## 🚀 Project Status
- **Phase 1**: ✅ Architecture Complete
- **Phase 2**: ✅ Functional Implementation Complete (Live on Vercel)
- **Phase 3**: 🔄 Revolutionary Visual Design (In Progress)

## 📁 Project Structure
- `/app` - Next.js pages and routes
- `/components` - React components
- `/lib` - Utilities and data
- `/docs` - All documentation
  - `/phase3-revolutionary` - Current revolutionary design docs

## 🛠️ Development
```bash
npm install
npm run dev     # Development server
npm run build   # Production build
npm run lint    # Linting
```

## 🎯 Phase 3: Revolutionary Design
See `/docs/phase3-revolutionary/` for:
- Design Brief
- Execution Guide
- Agent Workflow
- Market Research

## 🌐 Deployment
Deployed on Vercel: [URL]
EOF
```

### Phase 5: Create Clean Working Branch
```bash
# Create revolutionary design branch
git checkout -b phase3-revolutionary

# Stage organized files
git add docs/
git add README.md
git add .gitignore

# Commit clean structure
git commit -m "chore: Organize project structure for Phase 3 revolutionary design"

# Ready for implementation
```

---

## 🚀 POST-CLEANUP WORKFLOW

### Step 1: Agent Initialization
```bash
# Start orchestrator
/BMad:agents:bmad-orchestrator

# Reference clean docs
"Load /docs/phase3-revolutionary/AGENT_WORKFLOW.md
and coordinate the revolutionary implementation"
```

### Step 2: UX Expert Phase
```bash
/BMad:agents:ux-expert

"Review /docs/phase3-revolutionary/DESIGN_BRIEF.md
Create front-end specifications for Lusion-level experience"
```

### Step 3: Architect Phase
```bash
/BMad:agents:architect

"Design Three.js architecture for:
- 1000+ particle system
- 60 FPS performance
- Progressive enhancement"
```

### Step 4: Developer Phase
```bash
/BMad:agents:dev

"Implement revolutionary features from:
/docs/phase3-revolutionary/EXECUTION_GUIDE.md
Start with Neural Universe foundation"
```

### Step 5: QA Phase
```bash
/BMad:agents:qa

"Test for:
- 60 FPS performance
- 95+ Lighthouse score
- Cross-browser compatibility"
```

---

## ⚠️ IMPORTANT PRESERVATION

### DO NOT DELETE:
- Any file in `/app` directory
- Any file in `/components` directory  
- `package.json` and `package-lock.json`
- `.env.local` (if exists)
- `next.config.js`
- `tailwind.config.ts`
- `lib/core-data.ts`

### SAFE TO REORGANIZE:
- All `.md` documentation files
- Old architecture docs
- Design specifications
- Research documents

### VERCEL CONSIDERATIONS:
- Keep deployment settings intact
- Preserve environment variables
- Maintain build configuration
- Don't break existing routes

---

## ✅ CLEANUP CHECKLIST

- [ ] Backup current state to separate branch
- [ ] Create organized folder structure
- [ ] Move docs to proper locations
- [ ] Archive obsolete files
- [ ] Update README
- [ ] Commit clean structure
- [ ] Verify Vercel deployment still works
- [ ] Ready for revolutionary implementation

---

## 🎯 End Result

A clean, organized project ready for revolutionary transformation:
- Current working site preserved
- Documentation properly organized
- Clear separation of phases
- Ready for multi-agent workflow
- Vercel deployment intact

**Clean workspace = Clear mind = Revolutionary execution!**