import { TEInput, TERipple, TESelect } from "tw-elements-react"
import ImageSlider from "../../components/imageSlider/ImageSlider"
import "./product.scss"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useState } from "react"
import axiosClient from "../../api/axios"
import { BaseDataResult, BaseResult } from "../../utils/results"
import { useNavigate, useParams } from "react-router-dom"
import ImageUploader, { FileType } from "../../components/imageUploader/ImageUploader"
import { CategoryDataSource } from "../../components/addProduct/AddProduct"

const Product = () => {
  const {id} = useParams();
  const queryClient = useQueryClient();
  const [parentImages, setParentImages] = useState<FileType[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryDataSource[]>([{text: "Choose", value: "-1"}])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    priceWithDiscount: "",
    stockAmount: "",
    categoryId: "",
    images: ""
  });

  const navigate = useNavigate();

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
          data.data.map((category: any) => {
            setCategoryData(prevState => [
              ...prevState, // Önceki durumu kopyala
              { text: category.name, value: category._id } // Yeni öğeyi ekle
            ]);
          })
        }
      },
    }
  );

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
            categoryId: data.data.category._id,
            images: data.data.images
          })
          setSelectedCategory(data.data.category.name);
        }
        
      }
    }
  )

  

  const mutation = useMutation((updatedData: FormData) =>
    axiosClient.put<BaseResult>(`products/${id}`, updatedData).then((res) => res.data),
    {
      onSuccess: (response: BaseResult) => {
        if(response.hasError)
        {
          alert(response.message)
        }
        else
        {
          queryClient.invalidateQueries("products");
          navigate("/products")
        }
      },
    }
    
  );

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imageData = new FormData();
    let images = "";
    for (let index = 0; index < parentImages.length; index++) 
    {
      const image = parentImages[index];
      imageData.append("files", image.file);
      images += image.name + ",";
    }
    imageData.append("name", productData.name);
    imageData.append("price", productData.price);
    imageData.append("priceWithDiscount", productData.priceWithDiscount);
    imageData.append("stockAmount", productData.stockAmount);
    imageData.append("description", productData.description);
    imageData.append("images", images);
    imageData.append("categoryId", productData.categoryId)

    mutation.mutate(imageData);
  }

    // Loading durumunu kontrol edin
    if (isLoading) return <p>Loading...</p>;
    // Hata durumunu kontrol edin
    if (isError) return <p>Error</p>;



  return (
    <div className="productDetail">
      <div className="block max-w-lg rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <form onSubmit={handleFormSubmit}>
        <TEInput
          type="text"
          label="Product Name"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
        >
        </TEInput>

        <TESelect data={categoryData} value={selectedCategory} onValueChange={(data: any) => setProductData({ ...productData, name: data?.value })}/>

        <TEInput
          type="text"
          label="Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
        >
        </TEInput>

        <TEInput
          type="text"
          label="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Discount Price"
          value={productData.priceWithDiscount}
          onChange={(e) => setProductData({ ...productData, priceWithDiscount: e.target.value })}
        >
        </TEInput>
        <TEInput
          type="text"
          label="Stock Amount"
          value={productData.stockAmount}
          onChange={(e) => setProductData({ ...productData, stockAmount: e.target.value })}
        >
        </TEInput>
        <ImageUploader multiSelect={true} onImagesChange={handleImagesChange}/>
        {/* <!--Submit button--> */}
        <TERipple rippleColor="light">
          <button
            type="submit"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Submit
          </button>
        </TERipple>
        <TERipple rippleColor="light">
          <button
            type="button"
            className="w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={()=> navigate("/products")}
          >
            Cancel
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