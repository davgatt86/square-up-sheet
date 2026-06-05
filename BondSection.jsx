* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: #0b1a2c;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
}
input, textarea, select, button { font-family: inherit; }
input[type="date"] { color-scheme: dark; }
input:focus, textarea:focus, select:focus { border-color: #4ab5ae !important; }
button { -webkit-tap-highlight-color: transparent; }
@supports (padding: max(0px)) {
  body { padding-bottom: env(safe-area-inset-bottom); }
}
