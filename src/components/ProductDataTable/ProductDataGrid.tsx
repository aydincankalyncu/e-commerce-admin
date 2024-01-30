import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";
import "./productDataGrid.scss";
  
  type Props = {
    columns: GridColDef[];
    rows: object[];
    slug: string;
  };
  
  const ProductGrid = (props: Props) => {
  
    // TEST THE API
  
    const queryClient = useQueryClient();
     const mutation = useMutation({
       mutationFn: (id: string) => {
         return axiosClient.delete<BaseResult>(`products/${id}`)
       },
       onSuccess: ()=>{
         queryClient.invalidateQueries([`products`]);
       }
     });
  
    const handleDelete = async (productId: string) => {
      mutation.mutate(productId);
    };
  
    const actionColumn: GridColDef = {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <Link to={`/${props.slug}/${params.row._id}`}>
              <img src="/view.svg" alt="" />
            </Link>
            <div className="delete" onClick={() => handleDelete(params.row._id)}>
              <img src="/delete.svg" alt="" />
            </div>
          </div>
        );
      },
    };
  
    return (
      <div className="dataTable">
        <DataGrid
          className="dataGrid"
          rows={props.rows}
          getRowId={(row) => row._id}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </div>
    );
  };
  
  export default ProductGrid;
  