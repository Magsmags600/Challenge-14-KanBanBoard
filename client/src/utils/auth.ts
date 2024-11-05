// client/src/utils/auth.ts
import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      const token = this.getToken();
      return token ? jwtDecode<JwtPayload & { username: string }>(token) : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) {
        return true; // Assume expired if no expiration date is present
      }
      const currentTime = Date.now() / 1000; // Convert current time to seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
