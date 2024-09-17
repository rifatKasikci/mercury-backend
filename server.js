const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimiterMiddleware = require('./middlewares/rateLimiterMiddleware')
require('dotenv').config()
require("express-async-errors");

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(rateLimiterMiddleware)

app.use('/users', require('./routes/usersRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/verify', require('./routes/verificationCodesRoutes'))
app.use('/adverts', require('./routes/advertsRoutes'))
app.use('/categories', require('./routes/categoriesRoutes'))
app.use('/trade-products', require('./routes/tradeProductsRoutes'))
app.use('/waitlist-users', require('./routes/waitlistUsersRoutes'))
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port : ' + process.env.PORT)
})