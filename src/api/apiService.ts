import axios from "axios";
const baseUrl = `http://3.35.194.197:8000`

async function getMemoAll() {
    try {
        const response = await axios.get(`/todo`);
        // console.log(`${baseUrl}/todo`);
        
        console.log(response);
        // return response;
    } catch (error) {
        console.error(error);
    }
}

const api = {
    getMemoAll,
}
export default api