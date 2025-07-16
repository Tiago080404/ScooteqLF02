<script>
import SignUp from "./SignUp.vue";
export default {
  components: {
    SignUp,
  },
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
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const data = await response.json();
        console.log("data", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.$emit("authenticated");
          window.location.reload(); //
        } else {
          console.error("Login response missing user data");
        }
        this.$emit("authenticated");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Welcome Back!</h2>
      <div class="input-group">
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          class="input-field"
        />
      </div>
      <div class="input-group">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="input-field"
        />
      </div>
      <button @click="login" class="btn primary-btn">Login</button>
      <SignUp />
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.login-card h2 {
  margin-bottom: 30px;
  color: #333;
  font-size: 2em;
  font-weight: 600;
}

.input-group {
  margin-bottom: 20px;
}

.input-field {
  width: calc(100% - 20px);
  padding: 12px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.input-field::placeholder {
  color: #aaa;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.btn {
  display: block;
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;
}

.primary-btn {
  background-color: #007bff;
  color: #fff;
}

.primary-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
</style>
