import { useEffect, useRef, useState } from 'react';
import './imageUploader.scss';

export type FileType = {
    name: string;
    url: string;
    file: File
}

interface ImageUploaderProps {
    onImagesChange: (images: FileType[]) => void;
    refreshed?: boolean;
    multiSelect: boolean;
  }
  
const ImageUploader = ({onImagesChange, refreshed, multiSelect}: ImageUploaderProps) => {
    const [images, setImages] = useState<FileType[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onImagesChange(images);
      }, [images]);

      useEffect(() => {
        setImages([]);
      }, [refreshed]);

    function selectFiles(){
        if(fileInputRef.current)
        {
            fileInputRef.current.click();
        }
    }

    function deleteImage(index: number){
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            onImagesChange(updatedImages);
            return updatedImages;
          });
    }

    function onFileSelect(event : React.ChangeEvent<HTMLInputElement> ){
        const files = event.target.files || [];

        if(files.length === 0) return;
        for (let index = 0; index < files.length; index++) {
            if(files[index].type.split("/")[0] != "image") continue;
            if(!images.some((e) => e.name === files[index].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[index].name,
                        url: URL.createObjectURL(files[index]),
                        file: files[index]
                    }
                ]);
            }
        }
        onImagesChange(images);    
    }

    function onDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let index = 0; index < files.length; index++) {
            if(files[index].type.split("/")[0] != "image") continue;
            if(!images.some((e) => e.name === files[index].name)){
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[index].name,
                        url: URL.createObjectURL(files[index]),
                        file: files[index]
                    }
                ]);
            }
        }
        onImagesChange(images);
    }

  return (
    <div className="card">
        
        <div className="drag-area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            {isDragging ? (
                <span className="select">
                    Drop images here
                </span>
            ) :
            (
                <>
                    Drag & Drop image here or {" "}
                    <span className="select" role='button' onClick={selectFiles}>
                        Browse
                    </span>
                </>
            )
            }
            
            
            <input name="file" type="file" className="file" ref={fileInputRef} onChange={onFileSelect} multiple={multiSelect}/>
        </div>
        <div className="container">
            {images.map((image, index) => (
                <div className="image" key={index}>
                <span className="delete" onClick={() => deleteImage(index)}>X</span>
                <img src={image.url} alt={image.name}></img>
            </div>
            ))}
            
            
        </div>
    </div>
  );
};

export default ImageUploader;
