<script>
import AdminConsole from "./AdminConsole.vue";
export default {
  data() {
    return {
      allScooters: null,
      showAdmin: false,
    };
  },
  components: {
    AdminConsole,
  },
  methods: {
    async getAllScooters() {
      try {
        const response = await fetch("http://localhost:8080/scooter", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        this.allScooters = data;
      } catch (err) {
        console.log(err);
      }
    },
    openAdminConsole() {
      this.showAdmin = true;
    },
    closeAdminConsole() {
      this.showAdmin = false;
    },
  },
  async mounted() {
    await this.getAllScooters();
  },
};
</script>
<template>
  <div class="app-container">
    <aside class="sidebar">
      <h2 class="sidebar-title">👷 TECH DASH</h2>
      <nav>
        <ul class="nav-list">
          <li>
            <router-link to="/dashboard" tag="li" style="text-decoration: none"
              >🏠 Dashboard</router-link
            >
          </li>
          <li>
            <router-link to="/" tag="li" style="text-decoration: none"
              >🗺️ Map</router-link
            >
          </li>

          <li>🛴 Scooters</li>
          <li>⚙️ Settings</li>
          <li @click="logout">🔒 Logout</li>
          <li v-if="$auth.user.role === 'Admin'" @click="openAdminConsole">
            🛠️ Admin
          </li>
        </ul>
        <AdminConsole v-if="showAdmin" @close="closeAdminConsole" />
      </nav>
      <p class="welcome-text">
        Welcome, {{ $auth.user.username.toUpperCase() }}
      </p>
    </aside>
    <el-table :data="this.allScooters" style="width: 100%" border stripe>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="status" label="Status"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}
.sidebar {
  width: 200px;
  background-color: grey;
  color: #ffff;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.sidebar-title {
  margin-bottom: 30px;
  font-size: 20px;
}
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-list li {
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.2s;
}
.nav-list li:hover {
  color: blue;
}
.welcome-text {
  margin-top: 30px;
  font-size: 14px;
  color: #bbbbbb;
}
</style>
