// routes/healthRoutes.js

// (Not added in routes yet)
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

export default router;
