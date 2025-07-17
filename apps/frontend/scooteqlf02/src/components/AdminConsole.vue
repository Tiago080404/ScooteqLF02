<script>
export default {
  data() {
    return {
      users: [],
      roles: ["Admin", "Techniker", "Viewer"],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        this.users = data;
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    },
    async updateUserRole(username, newRole) {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${encodeURIComponent(username)}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update user role");
          return;
        }

        const updatedUser = await response.json(); // { username, role, ... }
        this.users = this.users.map((user) =>
          user.username === updatedUser.username
            ? { ...user, role: updatedUser.role }
            : user
        );
      } catch (err) {
        console.error("Error updating user role:", err);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-window">
      <button class="close-btn" @click="$emit('close')">✖</button>
      <div class="admin-console">
        <h1>🔑 Admin Console</h1>
        <p style="color: black">User Count: {{ users.length }}</p>
        <p style="color: black">User Management and System Settings</p>

        <div class="admin-actions">
          <button class="refresh-btn" @click="fetchUsers">
            Refresh User List
          </button>
        </div>

        <div class="user-list">
          <ul>
            <li v-for="user in users" :key="user.username" class="user-item">
              <div class="user-info">
                <span class="username"
                  >{{ user.username }} ({{ user.role }})</span
                >
                <span class="user-role">Neue Rolle:</span>
                <select
                  :value="user.role"
                  @change="updateUserRole(user.username, $event.target.value)"
                  class="role-dropdown"
                >
                  <option v-for="role in roles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Dein bestehendes Styling – unverändert gelassen, nur semantisch gereinigt */
.modal-overlay {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-window {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: "Inter", sans-serif;
}
.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}
.close-btn:hover {
  color: #000;
}
.admin-console h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}
.admin-actions {
  margin: 1rem 0;
}
.refresh-btn {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.refresh-btn:hover {
  background: #0056b3;
}
.user-list {
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
.user-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.user-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background 0.2s ease;
}
.user-item:hover {
  background: #e9ecef;
}
.user-info {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;
}
.username {
  flex: 1;
  font-weight: 500;
  color: #333;
  word-break: break-all;
}
.user-role {
  color: #555;
  font-size: 0.9rem;
}
.role-dropdown {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.role-dropdown:focus {
  outline: none;
  border-color: #007bff;
}
</style>
