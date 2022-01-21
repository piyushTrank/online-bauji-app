export const main_domain = `https://www.onlinebauji.com`;
export const api_url = `${main_domain}/backend/wp-json/wc/v2`;
export const api_blog_url = `${main_domain}/backend/wp-json/wp/v2`;
export const product_url = `${main_domain}/backend/product/`;

export const getReqOptions = tk => ({
  headers: {
    //Authorization: `Bearer ${tk}`,
    // "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const registerReqOptions = () => ({
  headers: {
    //Authorization: `Bearer ${tk}`,
    "Content-Type": "multipart/form-data",
  },
});
