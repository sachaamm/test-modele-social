import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { CalculationService } from "./src/services/calculationService.js";

const calculationService = new CalculationService();

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3001;

// Basic middleware
app.use(express.json());

// Test calculation
const calcul = calculationService.calculateCotisationsAndRemuneration(
  42000,
  26000
);
console.log(calcul);

// Basic health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// POST endpoint for recettes and charges.
app.post("/calculate", (req: Request<{}, {}, any>, res: Response) => {
  try {
    const { recettes, charges } = req.body;

    const result = calculationService.calculateCotisationsAndRemuneration(
      recettes,
      charges
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({
      error: "Invalid input data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
