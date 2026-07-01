const controller = require('../controllers/user')
const router = require("express").Router()

router.get('/', controller.getUserAll)
router.get('/:userId', controller.getUser)
router.post('/', controller.createUser)
router.put('/:userId', controller.updateUser)
router.delete('/:userId', controller.deleteUser)

module.exports = router;