# Interactive Template Builder

Drag-and-drop popup template builder for creating marketing popups without coding.

## ⏱️ Time Spent

**10-12 hours** of active development (exceeded 5-8 expectation)

## ✅ Completed

- **Figma Recreation**: Example.png was recreated in Figma to extract exact font sizes, colors, and spacing values
- **Project Structure**: AI was closely guided with continuous prompts to ensure a clean, maintainable structure (components/pages/color-palette/frontend/backend)
- **Manual UI Implementation**: Frontend UI built by hand from Figma design
- **Pinia Learning**: Watched tutorials and built small practice projects before starting (15-year legacy codebase experience, limited Pinia exposure)
- **Drag & Drop Strategy**: Compared vueuse/core, vue-draggable, and HTML5 native DnD — chose **vueuse/core** for implementation
- **Button Variants**: Created two variants:
  - `style1`: Bottom bar actions (Undo/Redo/New/Save)
  - `style2`: Left sidebar element palette
- **5 Element Types**: Heading, Text, Button, Image, Divider — all rendering on canvas after drag & drop
- **Drag & Drop**: Full implementation with preview, canvas detection, and auto-delete when dragged outside
- **Resize Handles**: All 4 corners (top-left, top-right, bottom-left, bottom-right) with minimum size constraints
- **State Management**: Pinia store for element CRUD and selection
- **Testing**: 5 Jest tests for `calculateResize` utility
- **Code Quality**: Code was refactored throughout development with heavy AI assistance; some refactoring opportunities were deprioritized due to time constraints

## 🚧 Not Completed

Time ran out before completing:
- Properties panel (right sidebar for editing element attributes)
- Save/Load/Export JSON functionality
- Undo/Redo
- Backend API integration
- Further code refactoring

## 🛠️ Setup

### Backend
```bash
cd main/src/backend
npm install
# Structure scaffolded only - not implemented or tested
```

### Frontend
```bash
cd main/src/frontend
npm install
npm run dev
```

### Tests
```bash
cd main/src/frontend
npm run test
```

## 🚀 Usage

1. Drag elements from left palette onto canvas
2. Click to select, drag to move, use corner handles to resize
3. Press Delete/Backspace to remove selected elements
4. Drag elements outside canvas to delete them

---

Project was left incomplete due to time constraints. README created to document current state.
