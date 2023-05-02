import React, { useState, useRef } from "react"
import {useDropzone} from 'react-dropzone'
import linkService from "./service/service"


export default function LinkCreateMain() {
    const [values, setValues] = useState({})
    const [image, setImage] = useState(null)
    const inputFocus = useRef(null)
    const [preview, setPreview] = useState('assets/default.jpg')

    function onDrop(acceptedFiles) {
        const reader = new FileReader();
        const file = acceptedFiles

        if (file) {
          reader.readAsDataURL(file[0]);
          setImage(file[0]);
        }

        reader.onload = (e) => {
            setPreview(reader.result);
            document.getElementsByName("imageurl")[0].value = ''
        };
    }
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (!values.name) {
            alert('링크명은 필수값입니다.')
            inputFocus.current.focus()
            return false
        }
        if (!image && !values.imageurl) {
            if (!window.confirm('이미지가 없는 링크정보를 등록하겠습니까?')) {
                return false
            }
         }
        linkService.createLink(values).then(
            (res) => {
                if (image) {
                    formData.append('image', image)
                    linkService.uploadImage(formData).then(
                        (res)=> {// console.log(res) 
                        }
                )} 
                alert(res.data.message)
                window.location.reload();            
            }
        )
    }

  return (
<>
    <div className="title-container">
        <span className="text-title">링크 등록</span>
    </div>

    <form onSubmit={handleSubmit}>   
    <div className="input-wrap">
        <label>링크명</label>
        <div className="input-box">
            <input type="text" name="name"
                defaultValue=""
                className="input-css"
                onChange={handleChange}
            />
        </div> 
    </div>

    <div className="input-wrap">
        <label>태그정보 ( 3개까지 표시되며 / 로 구분 )</label>
        <div className="input-box">
            <input type="text" name="tag"
                defaultValue=""
                className="input-css"
                onChange={handleChange}
            />
        </div> 
    </div>

    <div className="input-wrap">
        <label>링크 URL (연결하고자 하는 URL)</label>
        <div className="input-box">
            <input type="text" name="linkurl"
                defaultValue=""
                className="input-css"
                onChange={handleChange}
            />
        </div> 
    </div>

    <div className="input-wrap">
        <label>사진 링크 정보</label>
        <div className="input-box">
            <input type="text" name="imageurl"
                defaultValue=""
                className="input-css"
                onChange={handleChange}
            />
        </div> 
    </div>

{/* 이미지를 직접 등록할수 있도록 아래 HTML을 추가한다 */}
    <div className="img_contain">
        <div className="img_wrap" {...getRootProps()} > 
            <img src =  {preview}
                alt='이미지' className="img_box" />
            <input {...getInputProps()} multiple={false} name='imageurl'/>
        </div> 
        <div className="text_type">
        <span>사진 링크 정보를 등록하거나 <br></br>
                이미지를 직접 끌어오거나<br></br>
                파일을 선택해주세요</span>
        </div>
    </div>

    <div><button type="submit" className="btn btn-primary">등록</button></div>
    </form>
</>
  )
}