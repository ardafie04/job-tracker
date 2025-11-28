# job-tracker

React + Vite project to track job applications. Uses Tailwind and supports manual dark mode toggle.

## Quick start

1. Extract and enter folder:
   ```bash
   cd job-tracker
   ```

2. Install:
   ```bash
   npm install
   ```

3. Replace API URL in `src/api.js`:
   ```js
   const API_URL = "https://<your-mockapi-id>.mockapi.io/jobs";
   ```

4. Run dev server:
   ```bash
   npm run dev
   ```

Login with any username (stored in localStorage). Add job entries using the form. Entries use the `date` field from server or will be created with today's date. Any entry older than 30 days will show as `Expired`.

