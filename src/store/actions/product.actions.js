export const getAllProducts = () => {
  try {
    const res = await axios.post(
      `${api_url}/custom-products?page&per_page&sort=default`,
      null,
    );

    console.log("Products", res);

    dispatch({
      type: FETCH_PRODUCTS,
      payload: res.data.product,
    });
  } catch (error) {
    console.log("Product Err", error);
  }
};
