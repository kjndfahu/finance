module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './i18n/**/*.{js,ts,jsx,tsx}',  // Добавляем папку i18n
  ],
  theme: {
    extend: {
      screens: {
        xl: "1440px",
        lg: "1200px",
        mdbvp: "850px",
        md: "600px",
        smbvp: "380px",
        sm: "320px"
      }
    },
  },
  plugins: [],
}