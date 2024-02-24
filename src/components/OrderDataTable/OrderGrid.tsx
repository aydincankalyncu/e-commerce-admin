import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";

type Props = {
    columns: GridColDef[];
    rows: any;
    slug: string;
  };

const OrderGrid = (props: Props) => {

    const queryClient = useQueryClient();

    const mutationUpdate = useMutation(
        async ({ orderId, orderStatus }: { orderId: string, orderStatus: number }) => {
          const response = await axiosClient.put<BaseResult>(`orders/${orderId}/status`, { status: orderStatus });
          return response.data;
        },
        {
          onSuccess: (data: BaseResult) => {
            if (data.hasError) {
              alert(data.message);
            } else {
              queryClient.invalidateQueries('orders');
            }
          },
        }
    );

    const mutationDelete = useMutation({
        mutationFn: (id: string) => {
            return axiosClient.delete<BaseResult>(`orders/${id}`).then((res) => res.data)
        },
        onSuccess: (response: BaseResult)=> {
            if(!response.hasError)
            {
                queryClient.invalidateQueries("orders")
            }
            else
            {
                alert(response.message)
            }
        }
    });

    const handleUpdate = async(orderId: string, status: number) => {
        mutationUpdate.mutate({orderId: orderId, orderStatus: status});
    }

    const handleDelete = async(orderId: string) => {
        mutationDelete.mutate(orderId);
    }

    const actionColumn: GridColDef = {
        field       : "action",
        headerName  : "Action",
        width       : 100,
        renderCell  : (params) => {
            return (
                <div className="action">
                    <div className="update" onClick={()=> handleUpdate(params.row._id, params.row.status)}>
                        <img src="/view.svg"/>
                    </div>
                    <div className="delete" onClick={() => handleDelete(params.row._id)}>
                        <img src="/delete.svg"/>
                    </div>
                </div>
            )
        }
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
  )
}

export default OrderGrid