import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import linkService from "./service/service";
import {useDropzone} from 'react-dropzone'

export default function LinkEdit () {

    //id값을 받아오기 위해서 react에서 제공한 useParams을 활용한다.
    let params = useParams()
    const [data, setData] = useState({})
    const [values, setValues] = useState({})
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState('/assets/default.jpg')
    const navigate = useNavigate();

      useEffect(() => {
        linkService.getSelectLink(params.id).then(
            (res)=> {
            setData(res.data)
             // 수정 서비스인 linkService.updateLink 에 넘겨주기 위한 values            
            setValues(res.data.links)
            // preview을 위한 setProview값 
            setPreview(res.data.links.imageurl)
          }, (error) => {
            alert(error.res.data.message )
          }
          )
        // eslint-disable-next-line 
      }, [params.id])

      // Drag & Drap 관련 실행 function 
      function onDrop(acceptedFiles) {
        const reader = new FileReader();
        const file = acceptedFiles
        if (file) {
          reader.readAsDataURL(file[0]);
          setImage(file[0]);
        }
        reader.onload = (e) => {
            setPreview(reader.result);
            setValues((prevValues) => ({
                ...prevValues,
                [`imageurl`]: file[0].name,
            }))
            document.getElementsByName("imageurl")[0].value = ''
        };
    }

    const handleChange = async (e) => {
        const nextValues = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(nextValues)
        // 사진링크정보 입력시 preview를 위한 set
        if (e.target.name === 'imagelink') {
            setPreview(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        linkService.updateLink(params.id, values).then(
            (res)=> {
            // image file을 선택시 이미지 업로드를 위해서 진행
            if (image) {
                formData.append('image', image)
                linkService.changeImage(formData, params.id).then(
                    (res)=> {
                    // console.log(res)
                    }
                )
            }
            alert(res.data.message)
            navigate("/links/list", { replace: true})

         }, (error) => {
            alert(error.res.data.message )
         }
        )
    }
    // Drag & Drop을 위한 기존 const 선언
    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <div>
      {(typeof data.links ==='undefined') ? (
        <p>Loading....</p>
      ) : (
        <>            
            <div className="title-container">
                <h1 className="text-title">링크 수정</h1>
            </div>

            <form  onSubmit={handleSubmit}>                            
                <div className="input-wrap">
                    <label>링크명</label>
                    <div className="input-box">
                        <input type="text" name="name" 
                            defaultValue={data.links.name} 
                            className="input-css"
                            onChange={handleChange}
                            autoFocus="autofocus"
                        />  
                    </div> 
                </div>
                <div className="editInputBox form-group required">
                    <label>태그 정보 ( 태그여러개 등록시 / 로 구분 )</label>
                    <div className="input-box">
                        <input type="text" name="tag"
                            defaultValue={data.links.tag} 
                            className="input-css"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="input-wrap">
                    <label>링크 URL (연결하고자 하는 URL)</label>
                    <div className="input-box">                                 
                    <input type="text" name="linkurl" 
                        defaultValue={data.links.linkurl} 
                        className="input-css"
                        onChange={handleChange}
                        />    
                    </div>                                 
                </div>
                <div className="input-wrap">
                    <label>사진 링크 정보</label>
                    <div className="input-box">                                 
                    <input type="text" name="imageurl" 
                        defaultValue={data.links.imageurl} 
                        className="input-css"
                        onChange={handleChange}
                        />     
                    </div>                                  
                </div>   
                <div className="img_contain" >
                    <div className="img_wrap" {...getRootProps()} > 
                        <img src =  { preview }
                            alt='이미지' className="img_box" />
                        <input {...getInputProps()} multiple={false} name='imageurl'/>
                    </div> 
                        <div className="text_type">
                        <span>사진 링크 정보를 등록하거나 <br></br>
                        이미지를 직접 끌어오거나<br></br>
                        파일을 선택해주세요</span>
                        </div>

                </div> 
                <div>
                    <button type="submit" className="btn btn-primary">수 정</button>
                </div>
            </form>
            </>
         )}                          
        </div>
    )
}