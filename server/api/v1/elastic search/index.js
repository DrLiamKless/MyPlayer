const { Router } = require('express');
const router = Router();

router.use("/songs", require("./songs"));
router.use("/albums", require("./albums"));
router.use("/artists", require("./artists"));
router.use("/playlists", require("./playlists"));
// router.use("/post", require("./post"));

module.exports = router;


