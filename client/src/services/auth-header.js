export default function authHeader() {
  // Grab the user from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  // If user and their access token both exist, set this access token as 'x-access-token'
  // This will be used in headers to authorise API requests to the backend
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
