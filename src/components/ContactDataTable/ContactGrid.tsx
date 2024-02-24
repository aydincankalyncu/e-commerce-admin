import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import { useMutation, useQueryClient } from "react-query";
import axiosClient from "../../api/axios";
import { BaseResult } from "../../utils/results";

type Props = {
    columns: GridColDef[];
    rows: any;
    slug: string;
}

const ContactGrid = (props: Props) => {

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id: string) => {
            return axiosClient.delete<BaseResult>(`contacts/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries("contacts");
        }
    })

    const handleDelete = async (contactId: string) => {
        mutation.mutate(contactId);
    }

    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 250,
        renderCell: (params) => {
          return (
            <div className="action">
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
  )
}

export default ContactGrid