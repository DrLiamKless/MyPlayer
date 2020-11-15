const { Router } = require('express');
const router = Router();

router.use("/songs", require("./songs"));
router.use("/albums", require("./albums"));
router.use("/artists", require("./artists"));
router.use("/playlists", require("./playlists"));
router.use("/users", require("./users"));
router.use("/interactions", require("./interactions"));
router.use("/auth", require("./auth"));
router.use("/search", require("./elastic search"));


module.exports = router;
