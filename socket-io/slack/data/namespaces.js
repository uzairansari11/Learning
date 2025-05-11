const Namespace = require("../classes/namespace");
const Room = require("../classes/Room");

const wikiNs = new Namespace(
  0,
  "Wikipedia",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png",
  "/wiki"
);

const mozNs = new Namespace(
  1,
  "Mozilla",
  "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png",
  "/moz"
);

const linuxNs = new Namespace(
  2,
  "Wikipedia",
  "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  "/linux"
);

wikiNs.addRoom(new Room(0, "New Article", wikiNs.id));
wikiNs.addRoom(new Room(1, "Editors", wikiNs.id));
wikiNs.addRoom(new Room(2, "Others", wikiNs.id));

mozNs.addRoom(new Room(0, "FireFox", mozNs.id));
mozNs.addRoom(new Room(1, "SpiderMonkey", mozNs.id));
mozNs.addRoom(new Room(2, "SeaMonkey", mozNs.id));

linuxNs.addRoom(new Room(0, "Debian", linuxNs.id));
linuxNs.addRoom(new Room(1, "Red Hat", linuxNs.id));
linuxNs.addRoom(new Room(2, "Mac OS", linuxNs.id));

const namespaces = [wikiNs, linuxNs, mozNs];
module.exports = namespaces;
