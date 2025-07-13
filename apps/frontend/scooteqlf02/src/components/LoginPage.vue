<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        console.log("hjfds");
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          //credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const data = await response.json();
        console.log(data);
        this.$emit("authenticated");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div>
    <input type="text" placeholder="username" v-model="username" />
    <input type="text" placeholder="password" v-model="password" />
    <button @click="login">Login</button>
  </div>
</template>
