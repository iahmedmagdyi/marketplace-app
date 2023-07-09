import { axiosinstance } from "./axiosinstance";
//add producte
export const AddProduct = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// get all products
export const GetProducts = async (filters) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/products/get-products",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//get product by id
export const GetProductById = async (id) => {
  try {
    const response = await axiosinstance.get(
      `http://localhost:5000/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//edit product
export const EditProduct = async (id, payload) => {
  try {
    const respone = await axiosinstance.put(
      `http://localhost:5000/api/products/edit-product/${id}`,
      payload
    );
    return respone.data;
  } catch (error) {
    return error.message;
  }
};

//delete product
export const DeleteProduct = async (id) => {
  try {
    const respone = await axiosinstance.delete(
      `http://localhost:5000/api/products/delete-product/${id}`
    );
    return respone.data;
  } catch (error) {
    return error.message;
  }
};

//upload image product
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/products/upload",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//update status product
// update product status
export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosinstance.put(
      `http://localhost:5000/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//place  new bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// get all bids
export const GetAllBids = async (filters) => {
  try {
    const response = await axiosinstance.post(
      "http://localhost:5000/api/bids/get-all-bids",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
