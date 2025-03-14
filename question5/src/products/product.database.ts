import fs from "fs";
import { v4 as random } from "uuid";
import { Product, Products, UnitProduct } from "./product.interface";

let products: Products = loadProducts();

function loadProducts(): Products {
  try {
    const data = fs.readFileSync("./products.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

function saveProducts() {
  try {
    fs.writeFileSync(
      "./products.json",
      JSON.stringify(products, null, 2),
      "utf-8"
    );
    console.log("Products saved successfully!");
  } catch (error) {
    console.log("Error", error);
  }
}

export const findAll = async (): Promise<UnitProduct[]> =>
  Object.values(products);

export const findOne = async (id: string): Promise<UnitProduct> => products[id];

export const create = async (
  productInfo: Product
): Promise<null | UnitProduct> => {
  let id = random();

  while (products[id]) {
    id = random();
  }

  products[id] = {
    id: id,
    ...productInfo,
  };

  saveProducts();

  return products[id];
};

export const update = async (
  id: string,
  updateValues: Product
): Promise<UnitProduct | null> => {
  const product = await findOne(id);

  if (!product) {
    return null;
  }

  products[id] = {
    id,
    ...updateValues,
  };

  saveProducts();

  return products[id];
};

export const remove = async (id: string): Promise<null | void> => {
  const product = await findOne(id);

  if (!product) {
    return null;
  }

  delete products[id];

  saveProducts();
};
