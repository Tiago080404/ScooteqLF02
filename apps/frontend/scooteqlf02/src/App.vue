<script>
import L from "leaflet";
import OpenMap from "./components/OpenMap.vue";
import AddScooterInput from "./components/AddScooterInput.vue";
import LoginPage from "./components/LoginPage.vue";
export default {
  components: {
    OpenMap,
    AddScooterInput,
    LoginPage,
  },
  data() {
    return {
      openModal: false,
      isAuthenticated: false,
    };
  },
  methods: {
    callInputMask() {
      this.openModal = !this.openModal;
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
  <div v-if="this.isAuthenticated">
    <p v-if="$auth.isTechnician">
      WELCOME {{ $auth.user.username.toUpperCase() }}
    </p>
    <OpenMap @addScooter="callInputMask"></OpenMap>
    <AddScooterInput v-if="openModal" @close="callInputMask"></AddScooterInput>
  </div>
  <div v-else><LoginPage @authenticated="authTry"></LoginPage></div>
</template>
