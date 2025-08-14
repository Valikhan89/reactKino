## Project Documentation

### Getting started

- **Install dependencies**:
```bash
npm install
```
- **Run the app (development)**:
```bash
npm start
```
- **Build for production**:
```bash
npm run build
```
- **Run tests**:
```bash
npm test
```

### Environment

- This project uses Firebase (Auth + Firestore). Instances are initialized in `src/firebase.js` and exported as `auth` and `db`.
- To point to your own Firebase project, update the config in `src/firebase.js`.

### Routing

- Routes are defined in `src/App.js` using `react-router-dom` v6:
  - `/` → `pages/MovieList`
  - `/movieList` → `pages/MovieList`
  - `/movieList/:movieId` → `pages/MoviePage`
  - `/favorites` → `pages/Favorites`

### Authentication

- The app wraps routes with `components/Auth` which exposes `AuthContext` providing `{ isAuthenticated, user }`.
- Auth UI is implemented with `components/auth/SignIn`, `components/auth/SignUp`, and `components/auth/AuthDetails`.

### UI Library

- UI components are built with Ant Design (`antd`).

### API reference

- See the comprehensive API reference with examples:
  - `docs/APIs.md`