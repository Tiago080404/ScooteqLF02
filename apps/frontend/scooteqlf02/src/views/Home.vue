<script>
import OpenMap from "../components/OpenMap.vue";
import AddScooterInput from "../components/AddScooterInput.vue";
import LoginPage from "../components/LoginPage.vue";
import AdminConsole from "../components/AdminConsole.vue";

export default {
  components: {
    OpenMap,
    AddScooterInput,
    LoginPage,
    AdminConsole,
  },
  data() {
    return {
      openModal: false,
      isAuthenticated: false,
      showAdmin: false,
    };
  },
  methods: {
    openAdminConsole() {
      this.showAdmin = true;
    },
    closeAdminConsole() {
      this.showAdmin = false;
    },
    callInputMask() {
      this.openModal = !this.openModal;
    },
    logout() {
      this.isAuthenticated = false;
      this.$auth.logout();
      this.openModal = false;
    },
    authTry() {
      console.log("loading data...");
      this.isAuthenticated = true;
    },
    async checkAuthentication() {
      try {
        const response = await fetch("http://localhost:8080/auth", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (data !== null) {
          this.isAuthenticated = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.checkAuthentication();
  },
};
</script>

<template>
  <div class="app-container" v-if="isAuthenticated">
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

    <main class="main-content">
      <OpenMap @addScooter="callInputMask" />
      <AddScooterInput v-if="openModal" @close="callInputMask" />
    </main>
  </div>

  <div v-else>
    <LoginPage @authenticated="authTry" />
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
.main-content {
  flex: 1;
  padding: -18px;
  background-color: #f4f4f4;
  overflow-y: auto;
}
</style>
