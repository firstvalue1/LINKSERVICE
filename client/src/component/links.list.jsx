import React, { useState, useEffect } from "react";
// mui Icon에서 Delete 버튼을 import한다.
import { DeleteOutline } from "@mui/icons-material";
import { Link , useNavigate } from 'react-router-dom'
import linkService from "./service/service";

export default function LinksList () {
    const [data, setData] = useState([{}])  
    const navigate = useNavigate();
// 링크 리스트를 전체 목록을 불려오는 getLinks을 통해 받아 온다.
    useEffect(() => {
        linkService.getLinks().then(
            (res)=> {
            setData(res.data.links)
            // console.log(res.data.links)
          }, (error) => {
            alert(error.res.data.message )
          }
          )
    }, [])
// 삭제 버튼을 클릭시 삭제하는 함수를 생성한다.
// param : id
    const handleDelete = (id) => {
        // e.preventDefault();
        linkService.deleteLink(id).then(
            (res)=> {
              alert(res.data.message)
              navigate(0)
          }, (error) => {
            alert(error.res.data.message )
          }
          )
      }
    return (
<>
        <div>
            <Link to = "/create">
                <button type="submit" className="manager-button">+ 신규 링크 정보 등록</button>
            </Link>
        </div>

        {(typeof data ==='undefined') ? (
            <p>Loading....</p>
            ) : (
            data.map((link, index) => (   
            <div className="link-container" key={index} >
                <div className="link-wrapper">
                    <div className="link-show">
                        <img
                        src={link.imageurl}
                        alt=""
                        className="link-img"
                        />
                      <Link to={'/link/edit/' + link.id} className="a-tag">
                        <div className="list-title"> {link.name }</div> 
                      </Link>

                      <div className="delete-icon" name='deleteid'>                                                                              
                        <DeleteOutline fontSize='large' color="disabled"
                            onClick={() => handleDelete(link.id)}/>                               
                      </div>

                    </div>     
                </div>
                
            </div>
             ))
            )}    
</>
    )
}