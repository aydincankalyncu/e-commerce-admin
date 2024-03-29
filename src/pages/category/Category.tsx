import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axios";
import { BaseDataResult, BaseResult } from "../../utils/results";
import './category.scss'
import ImageUploader, { FileType } from "../../components/imageUploader/ImageUploader";
import { TEInput, TERipple } from "tw-elements-react";

const Category = () => {
  const { id }                          = useParams();
  const queryClient                     = useQueryClient();
  const [parentImages, setParentImages] = useState<FileType[]>([]);

  const navigate                        = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name      : "",
    image     : "",
    isActive: false,
  });
  const [dataArrived, setDataArrived] = useState(false);

  const handleImagesChange = (images: FileType[]) => {
    setParentImages(images);
  };

  const { data: category, isLoading, isError } = useQuery(
    ["category", id],
    () => axiosClient.get<BaseDataResult>(`categories/${id}`).then((res) => res.data.data),
    {
      onSuccess: (data) => {
        if(!dataArrived)
        {
          setCategoryData({
            name      : data.name,
            image     : data.image,
            isActive  : data.isActive,
          });
          setDataArrived(true);
        }
      },
    }
  );
  const mutation = useMutation((updatedData: FormData) =>
    axiosClient.put<BaseResult>(`categories/${id}`, updatedData).then((res) => res.data),
    {
      onSuccess: (response: BaseResult) => {
        if(response.hasError)
        {
          alert(response.message)
        }
        else
        {
          queryClient.invalidateQueries("categories");
          navigate("/categories")
        }
      },
    }    
  );


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageData = new FormData();
    
    for (let index = 0; index < parentImages.length; index++) 
    {
      const image = parentImages[index];
      imageData.append("file", image.file);
      imageData.append("imageUrl",image.name);
    }
    imageData.append("name", categoryData.name);
    imageData.append("isActive", categoryData.isActive.toString());

    mutation.mutate(imageData);
  }

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <div className="editcategoryContainer">
      <div className="block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleFormSubmit}>
        <TEInput
          type="text"
          label="Category name"
          value={categoryData.name}
          onChange={(e) => setCategoryData(prevState => ({ ...prevState, name: e.target.value }))}
        >
        </TEInput>
        <div className="mt-6 mb-6 flex min-h-[1.5rem] pl-[1.5rem]">
          <input
            className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            checked={categoryData.isActive}
            onChange={(e) => setCategoryData(prevState => ({ ...prevState, isActive: e.target.checked }))}
            id="checkboxDefault"
          />
          <label
            className="flex pl-[0.15rem] hover:cursor-pointer text-black"
            htmlFor="checkboxDefault"
          >
            Is Active
          </label>
        </div>
        <ImageUploader multiSelect={false} onImagesChange={handleImagesChange} />
        <div className="flex flex-row justify-between gap-4">
          <TERipple rippleColor="light">
            <button
              type="submit"
              className="w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Update
            </button>
          </TERipple>
          <TERipple rippleColor="light">
            <button
              type="button"
              className="w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={()=> navigate("/categories")}
            >
              Cancel
            </button>
          </TERipple>
        </div>
      </form>
      </div>
      
        {categoryData.image && (
              <img src={`http://localhost:3000/${categoryData.image}`} alt="Current" style={{ width: "300px", height: "300px" }} />
            )}
      </div>
  );
};

export default Category;
