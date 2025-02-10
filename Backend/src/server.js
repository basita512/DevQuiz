const app = require('./app')

const port = process.env.PORT 
app.listen(port, () => console.log(`Server is UP on Port:${port}`))