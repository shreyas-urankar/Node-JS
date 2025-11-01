let express = require('express')
let mongoose = require('mongoose');
const enquiryRoutes = require('./App/routes/website/enquiryRoutes');
require('dotenv').config();
let app = express();
app.use(express.json());

app.use("/web/enquiry",enquiryRoutes);

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Conneted to MongoDB")
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port" + process.env.PORT)
    })
})