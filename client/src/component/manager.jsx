import React from "react"
import { Link } from "react-router-dom"

export default function ManagerHome() {

    return (
<>
        <Link to="/links/list" >
        <button type="button" className="manager-button">
            <div> 링크 정보 관리 </div>
        </button>
        </Link>    

        <Link to="#" >
        <button type="button" className="manager-button">
            <div> 스케줄 정보 관리 </div>
        </button>
        </Link>  
  </>
    )
    
}