# Gym Fitness

Fitness app with exercise search, body part & equipment filters, and exercise details. Uses the ExerciseDB API when available and falls back to demo data when the API is unreachable.

## Exercise API (RapidAPI)

The app uses **ExerciseDB** on RapidAPI. You must **subscribe** to the API (free tier available) to get live exercises and GIFs.

### "You are not subscribed to this API"

This means your RapidAPI key is not subscribed to ExerciseDB. Fix it:

1. Go to **[ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)**.
2. Click **"Subscribe to Test"** or **"Pricing"** and choose a plan (e.g. **Basic** for free tier).
3. Copy your **RapidAPI key** from the same page (or from [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)).
4. In the project root, create or edit `.env`:
   ```env
   REACT_APP_RAPIDAPI_KEY=your_rapidapi_key_here
   ```
5. Restart the dev server (`npm start`).

### Other API errors

- **"The API is unreachable"** – ExerciseDB’s server may be down. The app falls back to demo data.
- **"Endpoint does not exist"** – Often the same as not subscribed or API down; app uses demo data.
- **Quota exceeded** – Check usage on your [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard); wait or upgrade.

### Without a subscription

The app still runs using **demo exercises** (search, filters, details). You only get live data and exercise GIFs when subscribed and the API is reachable.

## Related videos (RapidAPI)

The app shows **related YouTube videos** on each exercise page—titles, thumbnails, and links that open on YouTube. It uses the **channel/search** endpoint (POST) of `youtube-search-and-download.p.rapidapi.com` to search **within a channel** by exercise name. **Nothing is downloaded.**

The app uses the **same** `.env` key (`REACT_APP_RAPIDAPI_KEY`); you must **subscribe to this API** as well. Optionally set `REACT_APP_YOUTUBE_CHANNEL_ID` in `.env` to search a different YouTube channel (default is used if unset).

### Where to get it on RapidAPI

1. Use the **same** RapidAPI key as for ExerciseDB (one key for all subscribed APIs).
2. Go to **[RapidAPI Hub](https://rapidapi.com/hub)** and search for **YouTube Search**.
3. Open the API whose host is **youtube-search-and-download.p.rapidapi.com** (check the API’s code snippet for `x-rapidapi-host`).
4. Click **Subscribe to Test** or **Pricing** and choose a plan (e.g. free tier).
5. Your existing `REACT_APP_RAPIDAPI_KEY` in `.env` will then work for the videos section. Restart the dev server after any `.env` change.

If videos still don’t show, the “Videos” section on the exercise detail page has a short guide and a link to RapidAPI Hub.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
