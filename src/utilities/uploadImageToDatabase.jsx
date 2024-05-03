import axios from "axios";

const uploadImageToDatabase = async (apiLink, imageFile) => {
    const formData = new FormData();
    const img = imageFile.current.files[0];
    formData.append("", img)
    let url = `${apiLink}/uploadPic`;
    let { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    if (data.Code === 200) {
        return data.fileName
    } else {
        return false
    }
}

export default uploadImageToDatabase;
