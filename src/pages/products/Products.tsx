import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import ProductGrid from "../../components/ProductDataTable/ProductDataGrid";
import Add from "../../components/add/Add";
import { products } from "../../data";
import "./Products.scss";
import { useQuery } from "react-query";
import axiosClient from "../../api/axios";
import { BaseDataResult } from "../../utils/results";

const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "images",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={`http://localhost:3000/${params.row.images}`} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  const { isLoading, data: productList } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosClient.get<BaseDataResult>("products").then((res) => res.data.data)
  });

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <ProductGrid slug="products" columns={columns} rows={productList} />
      )}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
