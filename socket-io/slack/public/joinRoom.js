const joinRoom =  (roomTitle, namespaceId) => {
  console.log(roomTitle, namespaceId);

  // First way to deal with aknowldegement
    nameSpaceSockets[namespaceId].emit("joinRoom", roomTitle, (ackRes) => {
      console.log(ackRes);
      document.querySelector(
        ".curr-room-num-users"
      ).innerHTML = `${ackRes.userNumbers}  <span class="fa-solid fa-user"></span></span></div>`;

          document.querySelector(".curr-room-text").innerText = roomTitle;

    });

//   const ackRes = await nameSpaceSockets[namespaceId].emitWithAck("joinRoom", roomTitle);
//   console.log(ackRes);

//   document.querySelector(
//     ".curr-room-num-users"
//   ).innerHTML = `${ackRes.userNumbers}  <span class="fa-solid fa-user"></span></span></div>`;

//   document.querySelector(".curr-room-text").innerText = roomTitle;
};
