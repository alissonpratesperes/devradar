const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
        
    mongoose.connect('mongodb+srv://omnistack_dev:KcAtSiNm0O@mavericks.pwlbv.mongodb.net/omnistack10', { useNewUrlParser: true, useUnifiedTopology: true });

        app.use(cors());
        app.use(express.json());
        app.use(routes);
        app.listen(3333);