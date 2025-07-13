<script>
export default{
  data(){
    return{}
  },
  methods:{
   async reportScooter(){
    try{
        const response = await fetch("http://localhost:8080/",{
          method:"PATCH",
          credentials:"include",
           headers: {
           "Content-Type": "application/json",
  },
          body: JSON.stringify({
            id:2,
	          status:"reported"
          })
        })      
    }catch(err){
      console.log(err)
    }
   }
  }
}
</script>
<template>
  <div class="first-modal">
    <div class="second-modal">
      <div class="third-modal">
         <div class="close-btn">
        <button
          style="color: black; background-color: red;border-radius: 8px;"
          @click="this.$emit('close')"
        >
          X
        </button></div>
         <div class="content-wrapper">
          <div class="form-section">
            <h5>Scooter</h5>
            <div class="form-row">
              <input
                placeholder="Broken Scooter..."
              ></input>

              <button
                @click="reportScooter"
                >Add New Scooter</button
              >
            </div>
        </div>
      </div>
      </div>   
    </div>
  </div>
</template>
<style>
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
