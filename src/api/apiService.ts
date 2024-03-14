import axios from "axios";
const baseUrl = `http://3.35.194.197:8000`

async function getMemoAll() {
    try {
        // const response = await axios.get(`/todo/`);
        // const response = await axios.get(`${baseUrl}/todo/`);
        // const response = await axios.get(`https://api.github.com/repos/angular/angular-cli/issues/27244`);
        // console.log(`${baseUrl}/todo`);

        fetch(baseUrl + "/todo/", {
            method: "GET"
        }).then((res) => {
            console.log("res", res);
        })

        // console.log(response);
        // return response;
    } catch (error) {
        console.error(error);
    }
}

const api = {
    getMemoAll,
}
export default api