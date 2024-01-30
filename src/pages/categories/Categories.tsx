import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useRequestProcessor } from "../../api";
import axiosClient from "../../api/axios";
import CategoryGrid from "../../components/CategoryDataTable/CategorGrid";
import AddCategory from "../../components/addCategory/AddCategory";
import { BaseDataResult } from "../../utils/results";
import "./categories.scss";

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
  }
];

const Categories = () => {
  const [open, setOpen] = useState(false);

  const {query} = useRequestProcessor();

  const { data: categories, isLoading, isError} = query(
    'categories',
    () => axiosClient.get<BaseDataResult>('categories').then((res) => res.data.data),
    {enabled: true}
  );

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Error</p>
  return (
    <div className="categories">
      <div className="info">
        <h1>Categories</h1>
        <button onClick={() => setOpen(true)}>Add New Category</button>
      </div>
      <CategoryGrid slug="categories" columns={columns} rows={categories} />

      {open && <AddCategory slug="category" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Categories;
