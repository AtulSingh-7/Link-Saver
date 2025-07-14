const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',                        // Local Dev
  'https://linksaver-nine.vercel.app'            // Deployed Frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin: ' + origin));
    }
  },
  credentials: true
}));
