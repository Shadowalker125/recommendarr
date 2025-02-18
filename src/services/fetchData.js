import axios from "axios";

// Grab
export default async function fetchData(url) {
    const resp = await axios.get(url);
    return resp.data;
}