const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/env')

mongoose
.connect(MONGO_URI)
.then(() => console.log(`connected to DB`))
.catch((err) => console.log(err));