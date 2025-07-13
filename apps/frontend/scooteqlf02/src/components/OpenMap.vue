<script>
import L from "leaflet";
export default {
  data() {
    return {
      map: null,
      scootersLocation: [],
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
    async getAllScooters() {
      const response = await fetch("http://localhost:8080/scooter", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      this.scootersLocation = data;
    },
  },

  mounted() {
    /*  
    this.addNewMarker(); */
  },
  async created() {
    await this.getAllScooters();
    this.map = L.map("map").setView([52.52, 13.405], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    for (let i = 0; i < this.scootersLocation.length; i++) {
      console.log("setting marker");
      L.marker([this.scootersLocation[i].lat, this.scootersLocation[i].lng])
        .addTo(this.map)
        .bindPopup("Hier steht ein Scooter");
    }
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
