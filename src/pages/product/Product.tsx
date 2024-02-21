import { TEInput, TERipple } from "tw-elements-react"
import ImageSlider from "../../components/imageSlider/ImageSlider"
import "./product.scss"
import { useQuery, useQueryClient } from "react-query"
import { useState } from "react"
import axiosClient from "../../api/axios"
import { BaseDataResult } from "../../utils/results"
import { useParams } from "react-router-dom"
import ImageUploader from "../../components/imageUploader/ImageUploader"

const Product = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    priceWithDiscount: "",
    stockAmount: "",
    categoryId: "",
    images: ""
  });

  const {data: product, isLoading, isError} = useQuery(
    ["product", id],
    () => axiosClient.get<BaseDataResult>(`products/${id}`).then((res) => res.data),
    {
      onSuccess: (data: BaseDataResult) => {
        if(!data.hasError){
          setProductData({
            name: data.data.name,
            description: data.data.description,
            price: data.data.price,
            priceWithDiscount: data.data.priceWithDiscount,
            stockAmount: data.data.stockAmount,
            categoryId: data.data.category,
            images: data.data.images
          })
        }
        
      }
    }
  );

    // Loading durumunu kontrol edin
    if (isLoading) return <p>Loading...</p>;
    // Hata durumunu kontrol edin
    if (isError) return <p>Error</p>;



  return (
    <div className="productDetail">
      <div className="block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form>
        <TEInput
          type="text"
          label="Product Name"
          value={productData.name}
        >
        </TEInput>

        <TEInput
          type="text"
          label="Description"
          value={productData.description}
        >
        </TEInput>

        <TEInput
          type="text"
          label="Price"
          value={productData.price}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Discount Price"
          value={productData.priceWithDiscount}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Stock Amount"
          value={productData.stockAmount}
        >
        </TEInput>
        <ImageUploader/>
        {/* <!--Submit button--> */}
        <TERipple rippleColor="light">
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Submit
          </button>
        </TERipple>
      </form>
    </div>
    
    <ImageSlider images={productData.images.split(',')}/>
      {/* <div className="productInfo"></div>
      <div className="imageSlider">

      </div> */}
    </div>
  )
}

export default Product