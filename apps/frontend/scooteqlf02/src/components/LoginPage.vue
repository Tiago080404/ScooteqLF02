<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      wrongCred: false, // Error state for login
      signUp: false, // Toggles between Login and Sign Up view
      signupError: "", // Error state for sign up
    };
  },
  methods: {
    async login() {
      try {
        console.log("Attempting login...");
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
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.$emit("authenticated");
          window.location.reload();
        } else {
          console.error("Login response missing user data");
          this.wrongCred = true;
        }
      } catch (err) {
        console.log(err);
        this.wrongCred = true;
      }
    },
    async register() {
      this.signupError = "";
      if (this.password.length < 6) {
        this.signupError = "Password must be at least 6 characters long.";
        return;
      }
      try {
        const response = await fetch("http://localhost:8080/auth", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            role: "user",
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Registration successful! Please log in.");
          this.signUp = false;
          this.username = "";
          this.password = "";
          this.wrongCred = false;
        } else {
          this.signupError =
            data.message || "Registration failed. Please try again.";
        }
      } catch (err) {
        console.log(err);
        this.signupError = "An error occurred. Please check your connection.";
      }
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div v-if="!signUp">
        <div class="card-header">
          <h1>Welcome Back to ScooTec</h1>
          <h4>The future of scooter sharing</h4>
          <p>Enter your credentials to access your account</p>
        </div>

        <form @submit.prevent="login">
          <div class="input-group">
            <i class="fa-solid fa-user icon"></i>
            <input
              type="text"
              placeholder="Username"
              v-model="username"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <i class="fa-solid fa-lock icon"></i>
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              class="input-field"
              required
            />
          </div>

          <Transition name="fade">
            <p v-if="wrongCred" class="error-message">
              <i class="fa-solid fa-circle-exclamation"></i>
              Invalid username or password.
            </p>
          </Transition>

          <div class="actions">
            <a href="#" class="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" class="btn primary-btn">Login</button>
        </form>

        <div class="card-footer">
          <p>
            Don't have an account?
            <a href="#" @click.prevent="signUp = true">Sign Up</a>
          </p>
        </div>
      </div>

      <div v-else>
        <div class="card-header">
          <h1>Create an Account</h1>
          <h4>Join ScooTec today!</h4>
          <p>Please fill in the details to register</p>
        </div>

        <form @submit.prevent="register">
          <div class="input-group">
            <i class="fa-solid fa-user icon"></i>
            <input
              type="text"
              placeholder="Username"
              v-model="username"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <i class="fa-solid fa-lock icon"></i>
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              class="input-field"
              required
            />
          </div>

          <Transition name="fade">
            <p v-if="signupError" class="error-message">
              <i class="fa-solid fa-circle-exclamation"></i>
              {{ signupError }}
            </p>
          </Transition>

          <button
            type="submit"
            class="btn primary-btn"
            style="margin-top: 25px"
            @click="register"
          >
            Register
          </button>
        </form>

        <div class="card-footer">
          <p>
            Already have an account?
            <a href="#" @click.prevent="signUp = false">Login</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* For Safari */
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 100%;
  max-width: 420px;
  color: #fff;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  font-weight: 700;
}

.card-header h4 {
  margin: 0;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
}

.card-header p {
  margin: 10px 0 35px 0;
  font-size: 1em;
  font-weight: 300;
  opacity: 0.9;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}

.input-field {
  width: 100%;
  padding: 15px 20px 15px 45px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 1em;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  outline: none;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.input-field:focus {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: #fff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}

.input-field:focus + .icon {
  color: #fff;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}

.forgot-password {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #fff;
  text-decoration: underline;
}

.error-message {
  background-color: rgba(255, 82, 82, 0.2);
  border: 1px solid rgba(255, 82, 82, 0.5);
  color: #ffc8c8;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn {
  display: block;
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn {
  background: #fff;
  color: #764ba2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.primary-btn:hover {
  background-color: #f0f0f0;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.primary-btn:active {
  transform: translateY(-1px);
}

.card-footer {
  margin-top: 30px;
  font-size: 0.9em;
  font-weight: 300;
}

.card-footer a {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  transition: text-decoration 0.3s ease;
}

.card-footer a:hover {
  text-decoration: underline;
}
</style>
