self.addEventListener("push", function (event) {
  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "../src/assets/icon.png",
    badge: "../src/assets/react.svg",
  });
});