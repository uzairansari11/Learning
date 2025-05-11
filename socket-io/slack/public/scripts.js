const socket = io("http://localhost:8000");

// socket.on("connect", () => {
//   socket.emit("clientConnect");
// });

// socket.on("welcome", (data) => {
//   console.log(data);
// });

/* listen nsList event from server which give the list of namespaces */
socket.on("nsList", (nsData) => {
  const lastNs = localStorage.getItem("lastNs") || null;
  const namespaceDiv = document.querySelector(".namespaces");
  namespaceDiv.innerHTML = "";

  nsData.forEach((ns) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
    io(`http://localhost:8000${ns.endpoint}`);
  });
  const namespacesAvailable = [...document.querySelectorAll(".namespace")];
  // console.log("lastNs", lastNs);

  namespacesAvailable.forEach((element) => {
    joinNs(element, nsData);
  });

  if (lastNs) {
    const lastActive = namespacesAvailable.find(
      (item) => item.getAttribute("ns") === lastNs
    );
    lastActive?.click();
  } else {
    namespacesAvailable[0]?.click();
  }
});
