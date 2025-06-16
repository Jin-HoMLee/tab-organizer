# Manual Testing Checklist for Chrome Extension

## 1. Installation & Loading
- [ ] Remove any previous version of the extension from Chrome.
- [ ] Open `chrome://extensions` and enable "Developer mode".
- [ ] Click "Load unpacked" and select the `chrome-extension` folder.
- [ ] Confirm that the extension loads without errors or warnings.

## 2. Extension UI
- [ ] The extension icon appears in the Chrome toolbar.
- [ ] Click the icon: The popup opens as expected (`popup.html`).
- [ ] All buttons, links, and UI elements in the popup are visible and clickable.

## 3. Core Functionality
- [ ] All main features work as intended (describe your main features here, e.g. "Tab organizing works as expected").
- [ ] Try all user flows (e.g. any settings, options, or actions the user can take).
- [ ] No errors appear in the popup or background console (check via Chrome DevTools).

## 4. Permissions
- [ ] The extension only requests the permissions listed in the manifest.
- [ ] No unexpected permission prompts appear.

## 5. Browser Compatibility
- [ ] Test in the latest version of Chrome.
- [ ] (Optional) Test in other Chromium-based browsers (e.g. Edge, Brave).

## 6. Visuals & Assets
- [ ] Icons and screenshots display correctly where used.
- [ ] No missing images or broken links.

## 7. Performance & Stability
- [ ] Extension loads quickly and responds to user actions.
- [ ] No crashes, freezes, or major slowdowns.

## 8. Uninstallation
- [ ] Remove the extension: No errors occur, and all extension data is removed.

---

**Notes/Issues Found:**  
- [ ] (Write any issues you find here)

---

**Tested By:**  
Date: