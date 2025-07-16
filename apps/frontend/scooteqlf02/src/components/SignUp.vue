<script>
export default {
  methods: {
    handleSignUp() {
      console.log("Sign Up button clicked");
    },
  },
};
</script>
<template>
  <div class="signup-prompt">
    <p>
      Don't have an account?
      <a @click="handleSignUp" href="/signupform" class="signup-fancy-link"
        >Sign Up</a
      >
    </p>
  </div>
</template>

<style scoped>
.signup-prompt {
  text-align: center;
  margin-top: 25px;
  font-size: 0.95em;
  color: #666;
}

.signup-fancy-link {
  color: #007bff;
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: color 0.3s ease;
  font-weight: 600;
  cursor: pointer;
}

.signup-fancy-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.signup-fancy-link:hover {
  color: #0056b3;
}

.signup-fancy-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
