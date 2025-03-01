export const createPayment = async (req: Request, res: Response) => {
  const { amount, userId } = req.body;
  const payment = await Pi.createPayment({ amount, metadata: { userId } });
  res.json(payment);
};
