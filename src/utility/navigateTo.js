export const navigateToLogin = (navigation) => {
  if (navigation) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }
};

export const navigateToRegistration = (navigation) => {
  if (navigation) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Registration" }],
    });
  }
};
