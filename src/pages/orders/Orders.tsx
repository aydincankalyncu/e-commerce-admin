import { GridColDef } from "@mui/x-data-grid"
import { OrderStatusInfo } from "../../utils/constants"
import { useRequestProcessor } from "../../api";
import axiosClient from "../../api/axios";
import OrderGrid from "../../components/OrderDataTable/OrderGrid";
import { BaseDataResult } from "../../utils/results";


const columns: GridColDef[] = [
  {
    field: "nameSurname",
    type: "string",
    headerName: "User Name",
    width: 150
  },
  {
    field: "phoneNumber",
    type: "string",
    headerName: "Phone Number",
    width: 150
  },
  {
    field: "emailAddress",
    type: "string",
    headerName: "Email",
    width: 150
  },
  {
    field: "productName",
    type: "string",
    headerName: "Products",
    width: 150
  },
  {
    field: "productAmount",
    type: "number",
    headerName: "Product Amount",
    width: 150
  },
  {
    field: "totalPrice",
    type: "number",
    headerName: "Total Price",
    width: 150
  },
  {
    field: "confirmationNumber",
    type: "string",
    headerName: "Confirmation No",
    width: 150
  },
  {
    field: "status",
    type: "string",
    headerName: "Order Status",
    width: 150,
    renderEditCell(params) {
      return OrderStatusInfo[params.row.status].text;
    },
  },
]

const Orders = () => {

  const {query} = useRequestProcessor();

  const {
    data: orders,
    isLoading,
    isError,
  } = query(
    "orders",
    () =>
      axiosClient
        .get<BaseDataResult>("orders")
        .then((res: any) => res.data.data),
    { enabled: true }
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="orders">
    <div className='info'>
      <h1>Contacts</h1>
    </div>
    <OrderGrid slug='orders' columns={columns} rows={orders}/>
</div>
  )
}

export default Orders