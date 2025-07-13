<script>
import L from "leaflet";
export default {
  data() {
    return {
      map: null,
    };
  },
  methods: {
    addNewMarker() {
      this.map.on("click", (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        console.log("Geklickt bei:", lat, lng);

        L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup("Hier steht ein Scooter");
        this.$emit("addScooter");
      });
    },
  },

  mounted() {
    this.map = L.map("map").setView([52.52, 13.405], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    L.marker([52.52, 13.405])
      .addTo(this.map)
      .bindPopup("Hier steht ein Scooter");
    //.openPopup();
    this.addNewMarker();
  },
};
</script>
<template>
  <div id="map" style="height: 400px; width: 600px"></div>
</template>
