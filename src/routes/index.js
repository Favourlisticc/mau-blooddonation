const { Router } = require('express');

const router = Router();

router.get('/', (req,res) => {
    res.render('landingpage.hbs', {
        layout: 'landing.hbs'
    })
})

module.exports = router;