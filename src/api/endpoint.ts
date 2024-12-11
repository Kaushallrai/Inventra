// Import necessary modules
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        // Handle GET requests dynamically based on the endpoint
        if (req.query.type === "categories") {
          const categories = await prisma.category.findMany({
            include: { products: true },
          });
          res.status(200).json(categories);
        } else if (req.query.type === "products") {
          const products = await prisma.product.findMany({
            include: { category: true, brands: true },
          });
          res.status(200).json(products);
        } else if (req.query.type === "brands") {
          const brands = await prisma.brand.findMany({
            include: { product: true, variants: true },
          });
          res.status(200).json(brands);
        } else if (req.query.type === "variants") {
          const variants = await prisma.variant.findMany({
            include: { brand: true, transactions: true },
          });
          res.status(200).json(variants);
        } else if (req.query.type === "transactions") {
          const transactions = await prisma.transaction.findMany({
            include: { variant: true },
          });
          res.status(200).json(transactions);
        } else {
          res.status(400).json({ error: "Invalid GET request" });
        }
        break;

      case "POST":
        // Handle POST requests dynamically based on the body
        const { type, data } = req.body;

        if (type === "user") {
          const newUser = await prisma.user.create({
            data,
          });
          res.status(201).json(newUser);
        } else if (type === "category") {
          const newCategory = await prisma.category.create({
            data,
          });
          res.status(201).json(newCategory);
        } else if (type === "product") {
          const newProduct = await prisma.product.create({
            data,
          });
          res.status(201).json(newProduct);
        } else if (type === "brand") {
          const newBrand = await prisma.brand.create({
            data,
          });
          res.status(201).json(newBrand);
        } else if (type === "variant") {
          const newVariant = await prisma.variant.create({
            data,
          });
          res.status(201).json(newVariant);
        } else if (type === "transaction") {
          const newTransaction = await prisma.transaction.create({
            data,
          });
          res.status(201).json(newTransaction);
        } else {
          res.status(400).json({ error: "Invalid POST request" });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
