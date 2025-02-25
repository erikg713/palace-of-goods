router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1", [userId]);
    
    res.json(orders.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});
