
import express from 'express';

const app = express();
const PORT = process.env.PORT || 8085;

app.get('/api/getKeys', (req, res) => {
    const keys = {
        username: process.env.GEONAMES_USERNAME || 'defaultUsername',
        weatherKey: process.env.WEATHERBIT_API_KEY || 'defaultWeatherKey',
        pixabayKey: process.env.PIXABAY_API_KEY || 'defaultPixabayKey',
    };

    res.json(keys);
});

export default app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

