
const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())


// routes
/*app.get('/hello', (req,res) => {
	res.send('Task Manager App')
})*/

app.use('/api/v1/tasks',tasks)

// app.get('/api/v1/tasks')			- get all the tasks
// app.post('/api/v1/tasks')		- create a new task
// app.get('/api/v1/tasks/:id')		- get single tasks
// app.patch('/api/v1/tasks/:id')	- update task
// app.delete('/api/v1/tasks/:id')	- delete task

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port,console.log(`Server is listening on port ${port}...`))
	} catch(err) {
		console.log(err)
	}
}

start()


