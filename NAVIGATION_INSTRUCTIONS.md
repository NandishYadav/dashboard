# Navigation Implementation Instructions

## Issue
The click navigation on overview page sections is not working because child SVG elements are capturing click events.

## Solution
Add an invisible overlay div on top of each clickable section that captures clicks.

## Changes Needed in App.jsx

### For CPU by Session (around line 498-507):
Replace:
```jsx
<div 
  onClick={() => setCurrentView('cpu-session')}
  className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
>
```

With:
```jsx
<div className="relative group">
  <div 
    onClick={() => setCurrentView('cpu-session')}
    className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
  />
```

### For CPU by SQL (around line 510-515):
Replace:
```jsx
<div 
  onClick={() => setCurrentView('cpu-sql')}
  className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
>
```

With:
```jsx
<div className="relative group">
  <div 
    onClick={() => setCurrentView('cpu-sql')}
    className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
  />
```

### For Storage Health (around line 524-530):
Replace:
```jsx
<section 
  onClick={() => setCurrentView('storage')}
  className="cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg"
>
```

With:
```jsx
<div className="relative group">
  <div 
    onClick={() => setCurrentView('storage')}
    className="absolute inset-0 z-10 cursor-pointer rounded-xl group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-2 transition-all"
  />
```

And close with `</div>` instead of `</section>`

## How It Works
- The outer `div` with `relative` creates a positioning context
- The inner `div` with `absolute inset-0 z-10` creates an invisible overlay that covers the entire section
- The `z-10` ensures it sits on top of all child elements
- The `cursor-pointer` shows a pointer cursor on hover
- The `group-hover:ring-2` adds a blue ring when hovering to indicate clickability
- Clicks on the overlay trigger navigation to the respective page
