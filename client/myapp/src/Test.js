import React from 'react'
 import {Form,Button} from "react-bootstrap"
 import { useState } from 'react';
 import {useDispatch,useSelector} from "react-redux"
 import { uploadImage } from './redux/actions/user';
 import axios from "axios"
function Test() {

   const [file, setFile] = useState(null);
   const handleSelectFile = (e) => setFile(e.target.files[0]);
     const handleUpload = async () => {
    try {
     
      const data = new FormData();
      data.append("file", file);
      const response=await axios.post(`https://task-forge-server.vercel.app/upload/655f2b7956c16b1f2da23a18`,data)
      const res=await response.data
      console.log(res)
    } catch (error) {
      alert(error.message);
    } 
  };
  return (
    <div>
        <Form>
            <Form.Control type="file"
        onChange={handleSelectFile}
        multiple={false}>
                </Form.Control>
        </Form>
        <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default Test