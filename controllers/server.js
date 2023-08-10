import cors from "cors"
import express from "express"

const app = express()

app.use(express.json())
app.use(cors())

// app.use("/", whatsappRoutes)

const port = 3000
app.listen(port, () => console.log(`Whasapp API listening on port ${port}!`))

export default app