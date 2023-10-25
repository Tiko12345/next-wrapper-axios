import { myAxios } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Params } from "react-router-dom";
import { Product } from "./productSlice";

export const getProductsThunk = createAsyncThunk("get products", async () => {
  const { data } = await myAxios.get("products");
  return data;
});
export const getProductByIdThunk = createAsyncThunk(
  "get product by id ",
  async (id: number) => {
    const { data } = await myAxios.get("products/" + id);
    return data;
  }
);
export const getCategoriesThunk = createAsyncThunk(
  "get categories",
  async () => {
    const { data } = await myAxios.get("products/categories");
    return data;
  }
);
export const getProductsByLimitThunk = createAsyncThunk(
  "get product by limit",
  async (limit:number) => {
    const { data } = await myAxios.get("products?limit="+limit);
    return data;
  }
);
export const getProductsByCategoryThunk = createAsyncThunk(
  "get product by category",
  async (text:string) => {
    const { data } = await myAxios.get("products/category/"+text);
    return data;
  }
);
export const createProductThunk = createAsyncThunk(
  "create product ",
  async (obj:Product) => {
    const { data } = await myAxios.post("products", obj);
    return data;
  }
);
export const deleteProductByIdThunk = createAsyncThunk(
  "delete product ",
  async (id:number) => {
    const { data } = await myAxios.delete("products/"+id);
    return data;
  }
);
export const updateProductByIdThunk = createAsyncThunk(
  "create product ",
  async ({id, obj}:{id:number, obj:Product}) => {
    const { data } = await myAxios.put("products/"+id,obj);
    return data;
  }
);
