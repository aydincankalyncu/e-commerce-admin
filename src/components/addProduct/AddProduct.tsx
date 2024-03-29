import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import "./addProduct.scss";
import axiosClient from "../../api/axios";
import { BaseDataResult, BaseResult } from "../../utils/results";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TEInput, TERipple, TESelect } from "tw-elements-react";
import ImageUploader, { FileType } from "../imageUploader/ImageUploader";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";




type Props = {
  slug: string;
  columns: GridColDef[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CategoryDataSource {
  text: string;
  value: string;
}

const AddProduct = (props: Props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescriptipn] = useState("");
  const [price, setPrice] = useState("");
  const [priceWithDiscount, setPriceWithDiscount] = useState("");
  const [stockAmount, setStocAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [parentImages, setParentImages] = useState<FileType[]>([]);
  const [categoryDataLoaded, setCategoryDataLoaded] = useState(false);
  const queryClient = useQueryClient();
  const [categoryData, setCategoryData] = useState<CategoryDataSource[]>([{text: "Choose", value: "-1"}])

  const handleImagesChange = (images: FileType[]) => {
    setParentImages(images);
  };


  const { data: category } = useQuery(
    ["categories"],
    () => axiosClient.get<BaseDataResult>(`categories`).then((res) => res.data),
    {
      onSuccess: (data: BaseDataResult) => {
        if(!data.hasError)
        {
          if(!categoryDataLoaded) 
          {
            data.data.map((category: any) => {
              setCategoryData(prevState => [
                ...prevState, // Önceki durumu kopyala
                { text: category.name, value: category._id } // Yeni öğeyi ekle
              ]);
            })
            setCategoryDataLoaded(true);  
          }
        }
      },
    }
  );

  const mutation = useMutation((data: FormData) =>axiosClient.post<BaseResult>("products", data).then((res) => res.data),
    {
      onSuccess: (response: BaseResult) => {
        if(response.hasError)
        {
          alert(response.message)
        }
        else
        {
          props.setShowModal(false);
          queryClient.invalidateQueries("products");
        }
      },
    }
  );


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageData = new FormData();
    let images = "";
    for (let index = 0; index < parentImages.length; index++) 
    {
      const image = parentImages[index];
      images      += image.name + ",";
      imageData.append("files", image.file);
    }
    images = images.slice(0, -1); // Remove the last comma from the images.
    imageData.append("name", productName);
    imageData.append("description", description);
    imageData.append("images", images);
    imageData.append("category", selectedCategory);
    imageData.append("price", price.toString());
    imageData.append("priceWithDiscount", priceWithDiscount.toString());
    imageData.append("stockAmount", stockAmount.toString());

    mutation.mutate(imageData);
  };

  return (
    <div className="productContainer">
      <div className="flex columns-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        <TEInput
          type="text"
          label="Product Name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        >
        </TEInput>
        <TESelect data={categoryData} onValueChange={(data: any) => setSelectedCategory(data.value)}/>
        {/* <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryData[0].value}
          label="Age"
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
        <TEInput
          type="text"
          label="Description"
          value={description}
          onChange={(event) => setDescriptipn(event.target.value)}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Discount price"
          value={priceWithDiscount}
          onChange={(event) => setPriceWithDiscount(event.target.value)}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Stock Amount"
          value={stockAmount}
          onChange={(event) => setStocAmount(event.target.value)}
        >
        </TEInput>
        <TERipple rippleColor="light">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Save
          </button>
        </TERipple>
      </form>
      <ImageUploader multiSelect={true} onImagesChange={handleImagesChange}/>
      </div>
    </div>
  );
};

export default AddProduct;
