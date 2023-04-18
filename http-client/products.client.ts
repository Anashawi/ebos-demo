import axios from "axios";
import { IProduct } from "../models/product";

const api = axios.create({
   baseURL: "/api",
});


export const getAll = () =>
   api.get(`/products`).then((res) => res.data);

// export const getAllLookup = () =>
//    api.get(`/products/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/products/lookup/${productId}`).then((res) => res.data);

export const insertOne = (product: IProduct) =>
   api.post(`/products`, product).then((res) => res.data);

export const updateOne = (product: IProduct) =>
   api.put(`/products/${product.id}`, product).then((res) => res.data);

export const getOne = (id: string) =>
   api.get(`/products/${id}`).then((res) => res.data);

export const Keys = {
   All: "PRODUCTS_LIST",
   Product: "PRODUCT",
   Lookup: "PRODUCT_LOOKUP",
   AllLookup: "ALL_PRODUCTS_LOOKUP",
};
