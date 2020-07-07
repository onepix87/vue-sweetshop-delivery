import firebase from "firebase";

export default {
  state: {
    user: null,
    isLoggedIn: false,
    authError: null,
    registrationError: null,
    openAuthPopup: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getAuthError(state) {
      return state.authError;
    },
    getRegistrationError(state) {
      return state.registrationError;
    },
    isOpenPopup(state) {
      return state.openAuthPopup;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setAuthError(state, error) {
      let errorMessage = null;
      console.log("error", error);
      if (error && error.message) {
        errorMessage = {
          "The email address is badly formatted.": "Неверный формат email",
          "The password is invalid or the user does not have a password.":
            "Неверный пароль",
          "There is no user record corresponding to this identifier. The user may have been deleted.":
            "Неверный логин",
          "Too many unsuccessful login attempts. Please try again later.":
            "Слишком много неудачных попыток входа в систему. Пожалуйста, попробуйте позже",
          "The email address is already in use by another account.":
            "Этот email уже занят"
        }[error.message];
      }
      state.authError = errorMessage || error;
    },
    setRegistrationError(state, error) {
      console.log("setRegistrationError", error);
      let errorMessage = null;
      if (error && error.message) {
        errorMessage = {
          "The email address is already in use by another account.":
            "Этот email уже занят"
        }[error.message];
      }
      state.registrationError = errorMessage || error;
    },
    setOpenPopup(state, value) {
      state.openAuthPopup = value;
    }
  },
  actions: {
    signUp({ commit }, { email, password }) {
      commit("setAuthError", null);
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(data => {
          console.log("data", data);
          commit("setUser", data);
          return data;
        })
        .catch(error => {
          commit("setAuthError", error);
          throw error;
        });
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     const user = { id: 1 };
      //     commit("setUser", user);
      //     resolve(user);
      //   }, 2000);
      // });
    },
    signOut({ commit }) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setUser", null);
        });
    },
    createUser({ commit }, { email, pass, name }) {
      commit("setRegistrationError", null);
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(data => {
          firebase
          .firestore()
          .collection("roles")
          .doc(data.user.uid)
          .set({
            role: "2",
          })
          data.user
            .updateProfile({
              displayName: name
            })
            .then(() => {
              return data;
            });
        })
        .catch(error => {
          commit("setRegistrationError", error);
          throw error;
        });
    },
    setRole({ commit }, user) {
      return firebase
        .firestore()
        .collection("roles")
        .doc(user.uid)
        .get()
        .then(data => {
          commit("setUser", {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: data.data().role,
          //role 0 = admin
          // role 1 = delivery
          // role 2 = customer
        });
        localStorage.setItem("isLoggedIn", user.id);
        localStorage.setItem("roleId", data.data().role);
        });
    },
    fetchUser({ dispatch, commit }, user) {
      commit("setLoggedIn", user !== null);
      if (user) {
        dispatch('setRole', user)
      } else {
        commit("setUser", null);
        localStorage.removeItem("isLoggedIn");
      }
    }
  }
};
