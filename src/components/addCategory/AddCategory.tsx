import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./addCategory.scss";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";
import { useMutation, useQueryClient } from "react-query";
import { TEInput, TERipple } from "tw-elements-react";
import ImageUploader, { FileType } from "../imageUploader/ImageUploader";
type Props = {
  slug          : string;
  columns       : GridColDef[];
  setShowModal  : React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategory = (props: Props) => {
  const [refreshed, setRefreshed]       = useState(false);
  const [isActive, setIsActive]         = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [parentImages, setParentImages] = useState<FileType[]>([]);
  const queryClient                     = useQueryClient();

  const handleImagesChange = (images: FileType[]) => {
    setParentImages(images);
  };

  useEffect(()=> {
    setParentImages([]);
    setCategoryName("");
    setIsActive(false);
  }, [refreshed])

  const mutation = useMutation((data: FormData) =>axiosClient.post<BaseResult>("categories", data).then((res) => res.data),
    {
      onSuccess: (response: BaseResult) => {
        if(response.hasError)
        {
          alert(response.message)
        }
        else
        {
          props.setShowModal(false);
          setRefreshed(true);
          queryClient.invalidateQueries("categories");
        }
      },
    }
  );


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageData = new FormData();
    
    for (let index = 0; index < parentImages.length; index++) {
      const image = parentImages[index];
      imageData.append("file", image.file);
    }
    imageData.append("name", categoryName);
    imageData.append("isActive", isActive.toString());

    mutation.mutate(imageData);
  };

  return (
    <div className="categoryContainer">
      <div className="flex columns-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        {/* <!--E-mail input--> */}
        <TEInput
          type="text"
          label="Category name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        >
        </TEInput>
        {/* <!--Checkbox--> */}
        <div className="mt-6 mb-6 flex min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.value == "0" ? false : true)}
            id="checkboxDefault"
          />
          <label
            className="flex pl-[0.15rem] hover:cursor-pointer text-black"
            htmlFor="checkboxDefault"
          >
            Is Active
          </label>
        </div>

        {/* <!--Submit button--> */}
        <TERipple rippleColor="light">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
        </TERipple>
      </form>
      <ImageUploader multiSelect={false} refreshed={refreshed} onImagesChange={handleImagesChange}/>
      </div>
    </div>
  );
};

export default AddCategory;
