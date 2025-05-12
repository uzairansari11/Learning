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
      roomListDiv.innerHTML += `<li><span class="fa-solid fa-${
        room.privateRoom ? "lock" : "globe"
      }"></span>${room.roomTitle}</li>`;
    });
    localStorage.setItem("lastNs", element.getAttribute("ns"));
  });
}
