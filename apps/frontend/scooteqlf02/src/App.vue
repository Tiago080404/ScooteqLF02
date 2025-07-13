<script>
import L from "leaflet";
export default {
  data() {
    return {};
  },
  methods: {},

  mounted() {
    const map = L.map("map").setView([52.52, 13.405], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  },
};
</script>
<template>
  <div id="map" style="height: 400px"></div>
</template>
