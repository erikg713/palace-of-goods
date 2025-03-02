import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:5000/api/users";

interface UserResponse {
  success: boolean;
  message: string;
  user?: any;
}

export const fetchUserProfile = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch user profile:", error.response?.data || error.message);
    return { success: false, message: "Failed to retrieve user profile" };
  }
};

export const updateUserProfile = async (token: string, userData: any): Promise<UserResponse> => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to update user profile:", error.response?.data || error.message);
    return { success: false, message: "Failed to update profile" };
  }
};
