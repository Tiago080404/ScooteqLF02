<script>
import L from "leaflet";
/* window.updateScooterStatus = async function (id) {
  console.log(id);
  this.openItem = true;
  console.log(this.openItem); 
  
}; */
export default {
  data() {
    return {
      map: null,
      scootersLocation: [],
      openItem: false,
      scooterId:0,
      scooterDescription:"",
      scooterReported:false
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
    changeBool(){
      this.openItem = false
    },
   async reportBrokenScooter(){
    try{
      const response = await fetch("http://localhost:8080/scooter",{
        method:"PATCH",
        credentials:"include",
         headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id:this.scooterId,
          description:this.scooterDescription,
          status:'reported'
        })
      })
      const data = await response.json()
      console.log("reported scooter",data)
      this.scooterReported=true
    }catch(err){
      console.log(err)
    }
      
    },
    async reportFixedScooter(){
      const response = await fetch("http://localhost:8080/scooter",{
        method:"PATCH",
        credentials:"include",
         headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          id:this.scooterId,
          description:"all good",
          status:"done"
        })
      })
      const data = await response.json()
      console.log("reported ",data)
      this.scooterReported=true

    },
    async takeReportedScooter(){
      const response = await fetch("http://localhost:8080/scooter",{
        method:"PATCH",
        credentials:"include",
         headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          id:this.scooterId,
          description:"Fixing this Problem",
          status:"doing"
        })
      })
      const data = await response.json()
      this.scooterReported=true

    }
  },

  mounted() {
    /*
    this.addNewMarker(); */
  },
  async created() {
    const vm = this
    
    window.updateScooterStatus = async function (id) {
    console.log(id);
    vm.openItem = true;
    console.log(vm.openItem); 
    vm.scooterId = id
    console.log(vm.scooterId)
};
    
    
    await this.getAllScooters();
    this.map = L.map("map").setView([53.5511, 9.9937], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    for (let i = 0; i < this.scootersLocation.length; i++) {
      console.log("setting marker");
      const marker = L.marker([
        this.scootersLocation[i].lat,
        this.scootersLocation[i].lng,
      ]).addTo(this.map);

      const popupContent = `<b>Scooter ID:</b> ${this.scootersLocation[i].id}<br>
        <b>Status:</b> ${this.scootersLocation[i].status}
         <button onclick="window.updateScooterStatus(${this.scootersLocation[i].id})">Status ändern</button>
        `;
      marker.bindPopup(popupContent);
    }
   /*  L.marker([52.52, 13.405])
      .addTo(this.map)
      .bindPopup("Hier steht ein Scooter"); */

      this.addNewMarker();
  },
};
</script>
<template>
  <div id="map" style="height: 100%; width: 100%"></div>
   <div class="first-modal" v-if="this.openItem">
    <div class="second-modal">
      <div class="third-modal">
         <div class="close-btn">
        <button
          style="color: black; background-color: red;border-radius: 8px;"
          @click="this.changeBool()"
        >
          X
        </button></div>
         <div class="content-wrapper">
          <div class="form-section">
            <h5>Scooter {{ this.scooterId }}</h5>
            <div class="form-row">
              <input
                placeholder="Broken Scooter..."
                v-model="this.scooterDescription"
              ></input>

              <button style="background-color: red;border-radius: 8px"
                @click="this.reportBrokenScooter()"
                >Report broken Scooter</button
              >
              <p style="color: green;" v-if="this.scooterReported">Scooter reported!</p>
              <button v-if="$auth.isTechnician" @click="this.reportFixedScooter()" style="background-color: greenyellow; border-radius: 8px;">Fixed</button>
              <button v-if="$auth.isTechnician" @click="this.takeReportedScooter()" style="background-color: greenyellow; border-radius: 8px;">Take Scooter</button>
            </div>
        </div>
      </div>
      </div>   
    </div>
  </div>
</template>
<style scoped>
.first-modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.second-modal {
  height: 100%;
  width: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.third-modal {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 500px;
  /* background-color: var(--el-bg-color, #fff); */
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.313);
  padding: 35px;
}
.close-btn {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
  margin-right: -35px;
  margin-top: -35px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
