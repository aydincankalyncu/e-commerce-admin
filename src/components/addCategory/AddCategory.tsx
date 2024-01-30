import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { CreateCategoryDto } from "../../payloads/category";
import "./addCategory.scss";
import { useRequestProcessor } from "../../api";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";
import { useMutation, useQueryClient } from "react-query";
type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: "",
    imageUrls: "",
    isActive: false,
  });
  const queryClient = useQueryClient();

  const mutation = useMutation((data) => axiosClient.post<BaseResult>("categories", data).then((res) => res.data.message),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('categories')
    }
  });


  const handleFileOnChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);

    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(target.files[0]);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('name', formData.name);
    imageData.append('isActive', formData.isActive.toString());

    /**
     * const uploadResponse = await uploadCategoryImage(imageData);

    if(!uploadResponse.hasError){
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrls: uploadResponse.data,
      }))

     */
    mutation.mutate(imageData);

    //const result = await saveCategory(imageData);
    //console.log(result);

    //add new item
    // mutation.mutate();
    props.setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div className="categoryContainer">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Category Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>
          <div className="item-check">
            <label>Active:</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  isActive: !prevFormData.isActive,
                }))
              }
            />
            <br />
          </div>
          <div className="item">
            <label>Image</label>
            <input type={"file"} name="image" onChange={handleFileOnChange} />
          </div>
          {preview && <div className="item">
            <img src={preview} />
          </div>}
          
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
