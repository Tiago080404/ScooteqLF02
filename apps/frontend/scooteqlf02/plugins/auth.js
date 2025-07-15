export default {
  install: (app) => {
    let user = localStorage.getItem("user");
    try {
      user = JSON.parse(user);
    } catch (err) {
      console.error("Fehler beim Parsen des Benutzers:", err);
    }
    console.log("der user ", user);
    app.config.globalProperties.$auth = {
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "Admin",
      isTechnician: user?.role === "Techniker",
      isViewer: user?.role === "Viewer",
      logout() {
        localStorage.removeItem("user");
        window.location.reload();
      },
      login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.reload();
      },
    };
  },
};
