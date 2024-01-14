import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Add from "../../components/add/Add";
import DataTable from "../../components/dataTable/DataTable";
import { categoryRows } from "../../data";
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
      return <img src={params.row.image || "/noavatar.png"} alt="" />;
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
  const [categoryList, setCategoryList] = useState<any>([]);


  /**
   * useEffect(() => {
    (async () => {
       const categories = await getCategories();
       console.log("Categories: ", categories);
       setCategoryList(categories.data);
    })();
  }, [])
   */


  return <div className="categories">
    <div className="info">
        <h1>Categories</h1>
        <button onClick={() => setOpen(true)}>Add New Category</button>
    </div>
    <DataTable slug="categories" columns={columns} rows={categoryRows} />

    {open && <Add slug="category" columns={columns} setOpen={setOpen} />}
  </div>;
};

export default Categories;
