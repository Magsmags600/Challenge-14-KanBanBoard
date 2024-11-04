// client/src/api/authAPI.tsx
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to log in. Status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error('No token returned from server');
    }

    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { login };
