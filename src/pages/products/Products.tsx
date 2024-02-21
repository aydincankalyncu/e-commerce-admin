import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import ProductGrid from "../../components/ProductDataTable/ProductDataGrid";
import Add from "../../components/add/Add";
import "./Products.scss";
import { useQuery } from "react-query";
import axiosClient from "../../api/axios";
import { BaseDataResult } from "../../utils/results";
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader } from "tw-elements-react";
import AddProduct from "../../components/addProduct/AddProduct";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 150,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 150,
  },
  {
    field: "priceWithDiscount",
    type: "number",
    headerName: "Discount Price",
    width: 150,
  },
  {
    field: "stockAmount",
    headerName: "Stock Amount",
    type: "number",
    width: 200,
  }
];

const Products = () => {
  const [showModal, setShowModal] = useState(false);

  // TEST THE API

  const { isLoading, data: productList } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosClient.get<BaseDataResult>("products").then((res) => res.data.data)
  });

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setShowModal(true)}>Add New Product</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <ProductGrid slug="products" columns={columns} rows={productList} />
      )}
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add New Product
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody style={{width: '100%', height:'100%'}}><AddProduct slug="product" setShowModal={setShowModal} columns={columns} /></TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default Products;
