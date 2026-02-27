/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
theme: {
extend: {
colors: {
base: {
bg: "#f7f5f2", // בז' בהיר
primary: "#4a77a8", // כחלחל נעים
accent: "#2b5e8e", // כחלחל עמוק
}
},
borderRadius: { '2xl': '1.25rem' }
}
},
plugins: []
};