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

export async function post(id: String) {
  try {
    let res = await client.get(`/posts/post/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function forumPosts() {
  try {
    let res = await client.get(`/forum/`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function forumPost(id: String) {
  try {
    let res = await client.get(`/forum/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function login(email: string, password: string) {
  try {
    let res = await client.post("/login", { email, password });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function commentSend(
  id: string,
  comment: string,
  user_id: string
) {
  try {
    let res = await client.post("/forum/comment", { id, comment, user_id });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function postSend(
  content: string,
  user_id: string,
  title: string
) {
  try {
    let res = await client.post("/forum/create", {
      content,
      user_id,
      title,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    let res = await client.post("/register", { username, email, password });
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function verifyIdentity(auth_token: string) {
  try {
    let res = await client.get("/identity", {
      headers: {
        Authorization: auth_token,
      },
    });

    client.defaults.headers.common.Authorization = auth_token;

    return res.data;
  } catch (err) {
    throw err;
  }
}
