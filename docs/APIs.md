## API Reference

This document covers all public modules, components, and utilities exported by the app.

### Firebase (`src/firebase.js`)

- **auth**: Firebase Auth instance.
- **db**: Firestore instance.

Example:
```javascript
import { auth, db } from '../src/firebase';
```

### Auth Provider (`src/components/Auth.js`)

- **AuthContext**: React context exposing `{ isAuthenticated, user }`.
- **default export Auth({ children })**: Provider that subscribes to Firebase auth state.

Usage:
```jsx
import Auth, { AuthContext } from '../src/components/Auth';

function AppRoot() {
  return (
    <Auth>
      {/* children */}
    </Auth>
  );
}

function AnyChild() {
  const { isAuthenticated, user } = React.useContext(AuthContext);
  return isAuthenticated ? <div>Hello {user.email}</div> : <div>Guest</div>;
}
```

### Layout Container (`src/components/ContainerPage.js`)

- **default export ContainerPage({ children })**: Wraps content in a `.container` and Ant Design `Row` with 16 gutter.

Example:
```jsx
import ContainerPage from '../src/components/ContainerPage';

export default function Section() {
  return (
    <ContainerPage>
      <div>Content</div>
    </ContainerPage>
  );
}
```

### Header (`src/components/Header.js`)

- **default export Header({ clickPage })**: App header with navigation, auth modal, and `Outlet` for nested routes. Consumes `AuthContext`.

Example:
```jsx
import Header from '../src/components/Header';

<Route path="/" element={<Header />}> {/* nested routes here */}</Route>
```

### Menu (`src/components/Menu.js`)

- **default export Menu()**: Navigation menu with links to `/` and `/favorites`.

Example:
```jsx
import Menu from '../src/components/Menu';

<Menu />
```

### MovieCard (`src/components/MovieCard.js`)

- **default export MovieCard({ id, image, title })**: Renders a poster card linking to `/movieList/:id`.

Example:
```jsx
<MovieCard id="abc123" image="/poster.jpg" title="Title" />
```

### MovieContext (`src/components/MovieContext.js`)

- **MovieContext**: React context providing `{ movies }` from static `src/Data.js`.
- **default export MovieProvider({ children })**: Context provider.

Example:
```jsx
import MovieProvider, { MovieContext } from '../src/components/MovieContext';

<MovieProvider>
  <Child />
</MovieProvider>
```

### MovieList (component variant) (`src/components/MovieList.js`)

- **default export MovieList({ data, onAddToFavorites, onRemoveFromFavorites, favoriteMovies })**: Internal list/detail switcher using local state. Typically superseded by page-level components backed by Firestore.

Props:
- **data**: Array of movie objects.
- **onAddToFavorites(movieId)**, **onRemoveFromFavorites(movieId)**: Handlers.
- **favoriteMovies**: Array of movie IDs.

### MoviePage (component variant) (`src/components/MoviePage.js`)

- **default export MoviePage({ dataMovie, onAddToFavorites, onRemoveFromFavorites, favoriteMovies })**: Displays details and add/remove from favorites. Requires `AuthContext`.

### MoviesList (page) (`src/pages/MovieList.js`)

- **default export MoviesList()**: Fetches `movies` from Firestore and renders `MovieCard` for each.

Example:
```jsx
import MoviesList from '../src/pages/MovieList';

<MoviesList />
```

### MoviePage (page) (`src/pages/MoviePage.js`)

- **default export MoviePage()**: Shows a single movie based on `:movieId` route param. Uses Firestore and Auth. Exposes internal handlers to add/remove favorites.

Route usage:
```jsx
<Route path="/movieList/:movieId" element={<MoviePage />} />
```

### FavoritesList (page) (`src/pages/Favorites.js`)

- **default export FavoritesList()**: Shows the current user's favorite movies. Requires `AuthContext` user to be present.

Route usage:
```jsx
<Route path="/favorites" element={<FavoritesList />} />
```

### Auth UI (`src/components/auth/*`)

- **SignIn()**: Ant Design form that signs in using Firebase `signInWithEmailAndPassword`.
- **SignUp()**: Ant Design form that registers with Firebase `createUserWithEmailAndPassword` with password confirmation.
- **AuthDetails()**: Displays current user email, Sign Out button.
- **Loader()**: Centered Ant Design `Spin` loader.

Examples:
```jsx
import { Tabs } from 'antd';
import SignIn from '../src/components/auth/SignIn';
import SignUp from '../src/components/auth/SignUp';

<Tabs items={[{ key: '1', label: 'Sign In', children: <SignIn /> }, { key: '2', label: 'Sign Up', children: <SignUp /> }]} />
```

### Static Data (`src/Data.js`, `src/DataUsers.js`)

- **data**: Array of predefined movie objects. Useful for local testing or examples.
- **dataUsers**: Array of sample users. Not used in production flow.

Example:
```javascript
import { data } from '../src/Data';
```

### App Entrypoints

- **App (`src/App.js`)**: Sets up Router, wraps with `Auth`, and declares routes.
- **index (`src/index.js`)**: React root render with `StrictMode`.

### Conventions

- All components are default exports; contexts are named exports.
- Route params: `movieId` for detail page.
- Firestore collections: `movies`, `favorites`.