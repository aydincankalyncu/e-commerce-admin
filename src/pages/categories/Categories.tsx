import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useRequestProcessor } from "../../api";
import axiosClient from "../../api/axios";
import CategoryGrid from "../../components/CategoryDataTable/CategorGrid";
import AddCategory from "../../components/addCategory/AddCategory";
import { BaseDataResult } from "../../utils/results";
import "./categories.scss";
import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalFooter,
  TEModalHeader,
  TERipple,
} from "tw-elements-react";

const columns: GridColDef[] = [
  {
    field: "name",
    type: "string",
    headerName: "Category Name",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={`http://localhost:3000/${params.row.image}`} alt="" />;
    },
  },
  {
    field: "isActive",
    type: "boolean",
    headerName: "Is Active",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
];

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const { query } = useRequestProcessor();

  const {
    data: categories,
    isLoading,
    isError,
  } = query(
    "categories",
    () =>
      axiosClient
        .get<BaseDataResult>("categories")
        .then((res: any) => res.data.data),
    { enabled: true }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button onClick={() => setShowModal(true)}>Add New Category</button>
      </div>
      <CategoryGrid slug="categories" columns={columns} rows={categories} />
      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog size="lg">
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add New Category
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
            <TEModalBody style={{width: '100%', height:'100%'}}><AddCategory slug="category" setShowModal={setShowModal} columns={columns} /></TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default Categories;
