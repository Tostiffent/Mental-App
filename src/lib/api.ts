import axios from "axios";

export const client = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:800"
  }/api`,
  headers: {
    Accept: "application/json",
  },
});

export async function posts(type: String) {
  try {
    let res = await client.get(`/posts/${type}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}
