function joinNs(element, nsData) {
  element.addEventListener("click", (e) => {
    const endpoint = element.getAttribute("ns");
    console.log("endpoint", endpoint);
    const clickedNs = nsData.find((row) => row.endpoint === endpoint);
    const clickedNsRooms = clickedNs.rooms;
    console.log("clickedNsRooms", clickedNsRooms);

    let roomListDiv = document.querySelector(".room-list");
    roomListDiv.innerHTML = null;
    clickedNsRooms.forEach((room) => {
      const isPrivate = room.privateRoom ? true : false;
      roomListDiv.innerHTML += `<li class="room" namespaceId="${
        room.namespaceId
      }">
      <span class="fa-solid fa-${isPrivate ? "lock" : "globe"}"></span>${
        room.roomTitle
      }
      </li>`;
    });
    let roomTitle;
    console.log(clickedNs, "element");
    const roomNodes = [...document.querySelectorAll(".room")];
    roomNodes.forEach((elem, i) => {
      console.log("element rooms", elem);
      if (i === 0) {
        roomTitle = elem.roomTitle;
      }
      elem.addEventListener("click", (e) => {
        const roomTitle = e.target.innerText;
        const namespaceId = elem.getAttribute("namespaceId");
        joinRoom(roomTitle, namespaceId);
      });
    });
    localStorage.setItem("lastNs", element.getAttribute("ns"));
    joinRoom(roomTitle, clickedNs.roomId);
  });
}
