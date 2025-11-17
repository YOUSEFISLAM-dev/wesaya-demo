# 🌓 Dark & Light Mode Feature

## ✨ What's New

Your Wesaya restaurant website now has a **beautiful dark/light mode toggle** that allows users to switch between themes based on their preference!

## 🎨 Features Added

### 1. **Dark Mode Toggle Button**
- Located in the navigation bar
- Shows a **moon icon** 🌙 in light mode
- Shows a **sun icon** ☀️ in dark mode
- Smooth rotation animation on hover
- Remembers user preference using localStorage

### 2. **CSS Variables System**
Updated color scheme using CSS custom properties:
- `--text-color`: Text colors that adapt to theme
- `--bg-color`: Background colors
- `--card-bg`: Card/component backgrounds
- `--navbar-bg`: Navigation bar background
- `--footer-bg`: Footer background
- `--input-bg`: Input field backgrounds
- `--border-color`: Border colors
- `--shadow`: Dynamic shadows

### 3. **Dark Mode Colors**
When dark mode is enabled:
- Background: `#1a1a1a` (Dark charcoal)
- Cards: `#2c2c2c` (Medium gray)
- Text: `#ecf0f1` (Off-white)
- Inputs: `#333` (Dark gray)
- Borders: `#444` (Medium dark)

### 4. **Smooth Transitions**
- All color changes animate smoothly (0.3s ease)
- Background, text, and border colors transition elegantly
- No jarring color switches

### 5. **Persistent Preference**
- Your choice is saved in localStorage
- Returns to your preferred mode on next visit
- Works across all pages

## 📁 Files Modified

1. **styles.css**
   - Added CSS variables for dark mode
   - Updated all components to use variables
   - Added dark mode specific overrides
   - Smooth transition animations

2. **index.html**
   - Added dark mode toggle button to navbar

3. **menu.html**
   - Added dark mode toggle button to navbar

4. **script.js**
   - `loadDarkMode()` - Loads saved preference
   - `toggleDarkMode()` - Switches between themes
   - `updateDarkModeIcon()` - Updates button icon
   - Integrated with initialization

## 🚀 How to Use

### For Users:
1. Look for the **moon/sun icon** in the navigation bar
2. Click it to toggle between light and dark mode
3. Your preference is automatically saved!

### For Developers:
```javascript
// Toggle dark mode programmatically
toggleDarkMode();

// Check current mode
const isDarkMode = document.body.classList.contains('dark-mode');

// Force dark mode
document.body.classList.add('dark-mode');
localStorage.setItem('wesayaDarkMode', 'enabled');

// Force light mode
document.body.classList.remove('dark-mode');
localStorage.setItem('wesayaDarkMode', 'disabled');
```

## 🎯 Components Updated

All major UI components now support dark mode:
- ✅ Navigation bar
- ✅ Hero section
- ✅ Feature cards
- ✅ Menu items
- ✅ Offer cards
- ✅ Testimonial cards
- ✅ Contact form
- ✅ Footer
- ✅ Shopping cart modal
- ✅ Customer info modal
- ✅ Search modal
- ✅ All input fields
- ✅ Buttons and links

## 🎨 Color Palette

### Light Mode (Default)
- Background: White (#fff)
- Text: Dark Gray (#333)
- Cards: White (#fff)
- Primary: Red (#e74c3c)

### Dark Mode
- Background: Dark Charcoal (#1a1a1a)
- Text: Off-white (#ecf0f1)
- Cards: Medium Gray (#2c2c2c)
- Primary: Red (#e74c3c) - stays consistent!

## 📱 Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers
- ✅ Works with PWA installation

## 🔧 Technical Details

### localStorage Keys
- `wesayaDarkMode`: Stores "enabled" or "disabled"

### CSS Classes
- `.dark-mode`: Applied to `<body>` when dark mode is active

### Animation Timing
- Transition duration: 0.3s
- Transition timing: ease

## 🌟 Benefits

1. **Better UX**: Users can choose their preferred viewing mode
2. **Eye Comfort**: Dark mode reduces eye strain in low-light
3. **Modern Look**: Follows current design trends
4. **Accessibility**: Better for users with light sensitivity
5. **Professional**: Shows attention to user preferences

## 🎉 Ready to Test!

Your server is running at: **http://localhost:8080**

Try it now:
1. Open the website
2. Click the moon icon in the navbar
3. Watch the smooth transition to dark mode! 🌙

---

**Made with ❤️ for Wesaya Restaurant**
*Bringing delicious food with beautiful design!* 🍕🍔🍗
