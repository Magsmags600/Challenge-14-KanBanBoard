import { jwtDecode } from 'jwt-decode'; // Correct named import

interface JwtPayload {
  exp: number; // Expiration timestamp
  username: string; // Add any other properties as needed for your application
}

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // Return decoded token or null
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        // Convert expiration time to milliseconds and check against current time
        return decoded.exp * 1000 < Date.now();
      }
      return false; // If no expiration field, assume not expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Return true if there's an error decoding the token
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || ''; // Retrieve the token from local storage
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken); // Store the token in local storage
    window.location.assign('/'); // Redirect to the home page after login
  }

  logout() {
    localStorage.removeItem('id_token'); // Remove the token from local storage
    window.location.assign('/login'); // Redirect to the login page after logout
  }
}

export default new AuthService();
