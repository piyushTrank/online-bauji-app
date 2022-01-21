import axios from "axios";
import {api_url} from "../../components/utils/apiInfo";
import {FETCH_CATEGORIES, FETCH_LATEST_PRODUCTS} from "./actiontypes";

export const getAllCategories = () => async (dispatch, getState) => {
  const res = await axios.post(`${api_url}/products/all-categories`, null);

  //   console.log("Category", res.data);

  //Remove Uncategorized
  const filterCategory = res.data.filter(el => el.id !== 15);

  dispatch({
    type: FETCH_CATEGORIES,
    payload: filterCategory,
  });
};

export const getLatestProducts =
  (productsNum = 6) =>
  async (dispatch, getState) => {
    try {
      const res = await axios.post(
        `${api_url}/custom-products?page&per_page&sort=date`,
        null,
      );

      //console.log("Latest Products", res);

      dispatch({
        type: FETCH_LATEST_PRODUCTS,
        payload: res.data.product,
      });
    } catch (error) {
      console.log("Product Err", error);
    }
  };
