import api from "./api";

const authService = {

  // Admin Login
  login: async (username, password) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const data = response.data;

    // Save token
    localStorage.setItem("adminToken", data.token);

    // Save admin information
    localStorage.setItem(
      "adminUser",
      JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
      })
    );

    return data;
  },

  // Logout
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  },

  // Get current admin profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put(
      "/auth/profile",
      profileData
    );

    // Update saved user information
    const currentUser =
      JSON.parse(
        localStorage.getItem("adminUser") || "{}"
      );

    const updatedUser = {
      ...currentUser,
      ...response.data,
    };

    localStorage.setItem(
      "adminUser",
      JSON.stringify(updatedUser)
    );

    return response.data;
  },

  // Change password
  changePassword: async (
    currentPassword,
    newPassword
  ) => {
    const response = await api.put(
      "/auth/password",
      {
        currentPassword,
        newPassword,
      }
    );

    return response.data;
  },

  // Check whether admin is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem("adminToken");
  },

  // Get saved admin
  getCurrentUser: () => {
    const user =
      localStorage.getItem("adminUser");

    return user ? JSON.parse(user) : null;
  },
};

export default authService;