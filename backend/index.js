const express = require('express');
const mongoose = require('mongoose');
    const app = express();

        mongoose.connect('mongodb+srv://omnistack_dev:KcAtSiNm0O@omnistack9.pwlbv.mongodb.net/omnistack10', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

            app.get('/', (request, response) => {
                return response.json({ message: "Hello! =)" });
            });

                app.use(express.json);
                app.listen(3333);