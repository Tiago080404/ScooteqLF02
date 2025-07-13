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
      this.isAuthenticated = !this.isAuthenticated;
    },
  },
  created() {},
};
</script>
<template>
  <div v-if="this.isAuthenticated">
    <OpenMap @addScooter="callInputMask"></OpenMap>
    <AddScooterInput v-if="openModal" @close="callInputMask"></AddScooterInput>
  </div>
  <div v-else><LoginPage @authenticated="authTry"></LoginPage></div>
</template>
