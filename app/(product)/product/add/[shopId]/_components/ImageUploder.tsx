"use client"
import { UploadCloud } from 'lucide-react'
import { Input } from '@/components/ui/input';
import { DBProductImages } from '../_actions/product';
import { useUser } from '@clerk/nextjs';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ShopIdContext, ShopIdContextType, useContextFunction } from '../layout';
import server from '@/lib/API';
type Props = {
  // product_id:string
}


export default function ImageUploder({}: Props) {
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
const [fileContents, setFileContents] = useState<string[]>([]);
const [imageUrls, setImageUrls] = useState<string[]>([]);
const {user} = useUser()
const email = user?.emailAddresses[0]?.emailAddress
const input_ref = useRef<HTMLInputElement | null>(null);
const {product_id, shopId, handleSetimageuplaodStatus} =   useContextFunction() as ShopIdContextType

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newSelectedFiles = [...selectedFiles];
      const contents: string[] = [];
      if (newSelectedFiles.length + fileArray.length > 5) {
        newSelectedFiles.length = 0;
        contents.length = 0;
      }
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && e.target.result) {
            contents.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
      newSelectedFiles.push(...fileArray);
      setSelectedFiles(newSelectedFiles);
      setFileContents(contents);
    }
  };
  // useEffect(() => {
  //   console.log(selectedFiles, product_id);
  // DBProductImages([...selectedFiles], product_id)
  // }, [selectedFiles]);

  

async function ImageUpload(){
const form_data = new FormData()
form_data.append("shop_id", shopId)
form_data.append("product_id", product_id)
form_data.append("email", email as string)

selectedFiles.forEach((file, index)=>{
  if(file)
  form_data.append(`image${index}`, file)
})
const _upload_images = await server.post(`/product/${product_id}/image`, form_data,  {
  headers: {
  'Content-Type': 'multipart/form-data',
}})
if(_upload_images.status ==200)
return handleSetimageuplaodStatus(200)
}
useEffect(()=>{
  ImageUpload()
} ,[product_id])
  const LastSelectedImage = () => {
    if (selectedFiles.length > 0) {
      const lastSelectedFile = selectedFiles[selectedFiles.length - 1];
      const blob = new Blob([lastSelectedFile], {
        type: lastSelectedFile.type,
      });
      const imageUrl = URL.createObjectURL(blob);
      return <img src={imageUrl} className="object-cover mx-auto h-52 w-52" />;
    }
    return null;
  };

  function selectMultiPicture() {
    if (input_ref.current) {
      input_ref.current.click();
    }
  }


  return     <>
  {!selectedFiles.length && <Uploader width={50} height={50} onClick={selectMultiPicture}/>}
  <div className='flex my-4 space-x-2'>
  {selectedFiles.map((imageData, index) => {
            const blob = new Blob([imageData], { type: imageData.type });
            const imageUrl = URL.createObjectURL(blob);
            return (
              <div className="w-20 h-20 p-1 border-2 rounded-xl">
                {" "}
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index}`}
                  className="object-cover w-full h-full rounded-lg"
                />
                
              </div>
            );
            
          })}
              {selectedFiles.length ? (
             <div
             className="flex items-center justify-start object-cover w-20 h-20 rounded-lg bg-sky-800 bg-opacity-20"
           >
            <Uploader height={50} width={50} onClick={selectMultiPicture} />
            </div>
          ) : (
            ""
          )}
       
   
          </div>
  <Input type='file' multiple className='hidden' onChange={handleFileChange} ref={input_ref}/>
  </>

}

type Props_ = {
    height:number
    width: number
    onClick:()=>void
}

export  function Uploader({width, height, onClick}: Props_) {
  return (
    <div className='flex items-center justify-center mx-auto border-2 border-dashed rounded-2xl border-sky-800 hover:border-sky-400' style={{height: `${height.toString()}px`, width : `${width.toString()}px`}}>
            <UploadCloud size={height/2} className='hover:text-sky-400 text-sky-800' onClick={onClick}/>
        </div>
  )
}