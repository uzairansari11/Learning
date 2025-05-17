const socket = io("http://localhost:8000");

// socket.on("connect", () => {
//   socket.emit("clientConnect");
// });

// socket.on("welcome", (data) => {
//   console.log(data);
// });

// sockets will be put into this array,in index of their ns.id
let nameSpaceSockets = [];
const listeners = {
  nsChange: [],
};

const addNsChangeListener = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on("nsChange", (data) => {
      console.log("NameSpace changed!!");
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  } else {
    // do nothing ----
  }
};
/* listen nsList event from server which give the list of namespaces */
socket.on("nsList", (nsData) => {
  const lastNs = localStorage.getItem("lastNs") || null;
  const namespaceDiv = document.querySelector(".namespaces");
  namespaceDiv.innerHTML = "";

  nsData.forEach((ns) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;

    // checking if this connection is new this will be null & if connection is already exist it will be at the same spot and reconnect
    // let thisNs = nameSpaceSockets[ns.id];

    if (!nameSpaceSockets[ns.id]) {
      // thisNs = io(`http://localhost:8000${ns.endpoint}`);
      nameSpaceSockets[ns.id] = io(`http://localhost:8000${ns.endpoint}`);
    }
    addNsChangeListener(ns.id);
  });
  const namespacesAvailable = [...document.querySelectorAll(".namespace")];
  // console.log("lastNs", lastNs);

  namespacesAvailable.forEach((element) => {
    console.log(element)
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
  console.log("nameSpaceSockets", nameSpaceSockets);
});
