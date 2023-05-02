import axios from "axios"
import { API } from "../api/api.config"

// ####### 링크정보 API 호출
const getLinks = () => {
    return axios.get(API.LINKSALL)
}
const getSelectLink = (id) => {
    return axios.get(API.LINKSELECT + id)
}
const createLink= (values) => {
    return axios.post(API.LINKREGISTER, values)
}
const updateLink = (id, values) => {
    return axios.put(API.LINKUPATE + id, values)
}
const deleteLink = (id) => {
    return axios.delete(API.LINKDELETE + id)
}

const uploadImage = (formData) => {
    return axios.post(API.IMAGEUPLOAD, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
  }
  const changeImage = (formData, id) => {
    return axios.put(API.IMAGECHANGE + id, formData,  {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
  }

const linkService = {
    uploadImage,
    changeImage,
    getLinks,
    getSelectLink,
    createLink,
    updateLink,
    deleteLink,
}
export default linkService;