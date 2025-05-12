const express = require("express")
const mongoose = require("mongoose")
const Items = require("./itemModel")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000

const MONGO_URI = "mongodb+srv://Short_Girl:Jasmine4444@cluster0.wpfbpzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI)
.then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
 app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to my Server"});
});


/*Add a found item*/
app.post("/found-items", async (req, res) => {
    const { itemName, description, dateFound, locationFound } = req.body

    try {
        const newItem = await Items.create({
            itemName,
            description,
            dateFound,
            locationFound,
            claimed: true,
        })
        res.status(201).json(newItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/*View all unclaimed items*/
app.get("/unclaimed-items", async (req, res) => {
    try {
        const items = await Items.find({ claimed: false })
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/*View one item by ID*/
app.get("/found-items/:id", async (req, res) => {
    const { id } = req.params

    
        const item = await Items.findById(id)
        if (!item) {
            return res.status(404).json({ message: "Item not found" })
        }
        res.status(200).json(item)
})


/*Update an item’s details or mark as claimed*/
app.put("/found-items/:id", async (req, res) => {
    const { id } = req.params
    const { itemName, description, dateFound, locationFound, claimed } = req.body

    
        const updatedItem = await Items.findByIdAndUpdate(
            id,
            { itemName, description, dateFound, locationFound, claimed },
            { new: true }
        )
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" })
        }
        res.status(200).json(updatedItem)
    })

    /*Delete old/irrelevant entries*/
app.delete("/found-items/:id", async (req, res) => {
        const { id } = req.params

            const deletedItem = await Items.findByIdAndDelete(id)
            if (!deletedItem) {
                return res.status(404).json({ message: "Item not found" })
            }
            res.status(200).json({ message: "Item deleted successfully" })

    })
