import React, { useState, useEffect } from "react"
import linkService from "./service/service"
import '../css/links.css'

let classList = ['tag-orange', 'tag-blue', 'tag-grin']

function TagList(Props) {
    const tag = Props.tag;
    return (
        !tag || tag.split('/').map( (tag, index)=>
        <div key={index} 
            className = {"tag-button " + classList[index]}>
            {tag}
        </div>
       ) 
    )
}

export default function LinkMain() {
    const [data, setData] = useState([])

    useEffect(() => {
        linkService.getLinks().then(
        (res)=> {
            setData(res.data)
        //    console.log(res.data)
        }, (error) => {
           alert(error.res.data.message )
        }
        )
    }, [])
    
    return (
<>
     <div>
       { data.links && data.links.map((links) => (

           <div className="link-container" key={links.id}>
               <div className="link-wrapper" >
                   <div className="link-show"
                       onClick={() => { window.open(links.linkurl) }} >
                       <img
                           src={links.imageurl} alt="" className="link-img"
                       />
                       <div className="link-title">
                           {links.name}
                       </div>
                   </div>

                   <div className="tag-container">
                       <div className="tag-row"> </div>
                        <TagList tag={links.tag} />
                   </div>
                   
               </div>

           </div>   

        ))}
     </div>

 </> 
    ) // return
} // function