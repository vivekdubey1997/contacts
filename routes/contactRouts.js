const express= require("express")
const router = express.Router()
const {getcontacts,
     createContact,
     getcontact,
     updatecontact,
     deletecontact}= require("../controllers/contactController")
const validateToken = require("../middleware/validateTokenHandler")

router.use(validateToken);
router.route('/').get(getcontacts).post(createContact)
router.route('/:id').get(getcontacts).put(updatecontact).delete(deletecontact)


module.exports = router