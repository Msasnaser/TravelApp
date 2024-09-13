// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8081;

// // نقطة النهاية لإرجاع مفاتيح API
// app.get('/api/getKeys', (req, res) => {
//     const keys = {
//         username: process.env.GEONAMES_USERNAME || 'defaultUsername',
//         weatherKey: process.env.WEATHERBIT_API_KEY || 'defaultWeatherKey',
//         pixabayKey: process.env.PIXABAY_API_KEY || 'defaultPixabayKey',
//     };

//     res.json(keys);
// });

// // بدء تشغيل الخادم
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8081;

// Endpoint to return API keys
app.get('/api/getKeys', (req, res) => {
    const keys = {
        username: process.env.GEONAMES_USERNAME || 'defaultUsername',
        weatherKey: process.env.WEATHERBIT_API_KEY || 'defaultWeatherKey',
        pixabayKey: process.env.PIXABAY_API_KEY || 'defaultPixabayKey',
    };

    res.json(keys);
});

// Export the app for testing
export default app;

// Start the server if this file is executed directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

