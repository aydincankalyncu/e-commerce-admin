import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import "./addProduct.scss";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";
import { useMutation, useQueryClient } from "react-query";
import { TEInput, TERipple } from "tw-elements-react";
import ImageUploader, { FileType } from "../imageUploader/ImageUploader";
type Props = {
  slug: string;
  columns: GridColDef[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddProduct = (props: Props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescriptipn] = useState("");
  const [price, setPrice] = useState(0);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [stockAmount, setStocAmount] = useState(0);
  const [parentImages, setParentImages] = useState<FileType[]>([]);
  const queryClient = useQueryClient();

  const handleImagesChange = (images: FileType[]) => {
    setParentImages(images);
  };

  const mutation = useMutation((data: FormData) =>axiosClient.post<BaseResult>("products", data).then((res) => res.data),
    {
      onSuccess: (response: BaseResult) => {
        props.setShowModal(false);
        if(response.hasError){
          alert(response.message)
        }
        else{
          queryClient.invalidateQueries("products");
        }
      },
    }
  );


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageData = new FormData();
    
    for (let index = 0; index < parentImages.length; index++) {
      const image = parentImages[index];
      imageData.append("files", image.file);
    }
    imageData.append("name", productName);
    imageData.append("description", description);
    imageData.append("images", "1.jpeg");
    imageData.append("category", "65d526820a7d206cef43f0bc");
    imageData.append("price", price.toString());
    imageData.append("priceWithDiscount", priceWithDiscount.toString());
    imageData.append("stockAmount", stockAmount.toString());

    mutation.mutate(imageData);
  };

  return (
    <div className="productContainer">
      <div className="flex columns-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleSubmit}>
        {/* <!--E-mail input--> */}
        <TEInput
          type="text"
          label="Product Name"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Description"
          value={description}
          onChange={(event) => setDescriptipn(event.target.value)}
        >
        </TEInput>
        <TEInput
          type="number"
          label="Price"
          value={price}
          onChange={(event) => setPrice(Number.parseInt(event.target.value))}
        >
        </TEInput>
        <TEInput
          type="number"
          label="Discount price"
          value={priceWithDiscount}
          onChange={(event) => setPriceWithDiscount(Number.parseInt(event.target.value))}
        >
        </TEInput>
        <TEInput
          type="number"
          label="Stock Amount"
          value={stockAmount}
          onChange={(event) => setStocAmount(Number.parseInt(event.target.value))}
        >
        </TEInput>
        

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
      <ImageUploader onImagesChange={handleImagesChange}/>
      </div>
    </div>
  );
};

export default AddProduct;
