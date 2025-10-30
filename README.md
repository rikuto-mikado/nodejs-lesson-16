# Node.js Lesson 16

## What I Learned

### 1. Using `..` in `path.join()` to navigate parent directories

`path.join()` can correctly resolve `..` to move up to parent directories:

```javascript
// In routes/shop.js
// __dirname = /routes
path.join(__dirname, '../', 'views', 'shop.html')
// Result: /project-root/views/shop.html
```

**Path Resolution Flow:**

| Step | Operation | Result |
|------|-----------|--------|
| 1 | Start with `__dirname` | `/project-root/routes` |
| 2 | Apply `../` (move up) | `/project-root` |
| 3 | Add `views` | `/project-root/views` |
| 4 | Add `shop.html` | `/project-root/views/shop.html` |

**More Examples:**

```javascript
// Example 1: Go up one level from routes
__dirname = '/project-root/routes'
path.join(__dirname, '..')
// Result: /project-root

// Example 2: Go up two levels
__dirname = '/project-root/routes/admin'
path.join(__dirname, '../../')
// Result: /project-root

// Example 3: Navigate to sibling directory
__dirname = '/project-root/routes'
path.join(__dirname, '../views')
// Result: /project-root/views

// Example 4: Navigate to nested directory
__dirname = '/project-root/routes'
path.join(__dirname, '../public/css/style.css')
// Result: /project-root/public/css/style.css

// Example 5: Multiple '..' in sequence
__dirname = '/project-root/routes/api/v1'
path.join(__dirname, '../../../views/home.html')
// Result: /project-root/views/home.html

// Note: '../../../' means "go up 3 levels"
// Starting from: /project-root/routes/api/v1
//   ../       → /project-root/routes/api (1 level up)
//   ../../    → /project-root/routes     (2 levels up)
//   ../../../ → /project-root            (3 levels up)
```

### 2. Centralizing root directory path with `util/path.js`

You can create a utility module to export the project root directory and reuse it across files:

**util/path.js:**
```javascript
const path = require('path');
module.exports = path.dirname(process.mainModule.filename);
```

**routes/shop.js:**
```javascript
const rootDir = require('../util/path');
res.sendFile(path.join(rootDir, 'views', 'shop.html'));
```

**Benefits:**
- Single source of truth for project root path
- No need to repeatedly use `..` in every route file
- Easier to maintain and less error-prone

## Challenges Faced

### Misunderstanding `rootDir` value

**Problem:** Initially used `path.join(rootDir, '../', 'views', 'shop.html')`

**Issue:** Since `rootDir` already points to the project root, adding `../` moved up one level too far:

| Step | Path |
|------|------|
| rootDir | `/project-root` |
| After `..` | `/parent-of-project` L |
| Correct path | `/project-root/views/shop.html` |

**Solution:** Remove `../` since `rootDir` already represents the project root:

```javascript
// Wrong
path.join(rootDir, '../', 'views', 'shop.html')

// Correct
path.join(rootDir, 'views', 'shop.html')
```
