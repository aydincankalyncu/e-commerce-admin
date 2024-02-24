import { GridColDef } from '@mui/x-data-grid'
import './contacts.scss'
import { useRequestProcessor } from '../../api';
import axiosClient from '../../api/axios';
import { BaseDataResult } from '../../utils/results';
import ContactGrid from '../../components/ContactDataTable/ContactGrid';

const columns: GridColDef[] = [
  {
    field: "userName",
    type: "string",
    headerName: "User Name",
    width: 150
  },
  {
    field: "email",
    type: "string",
    headerName: "Contact Email",
    width: 150
  },
  {
    field: "createdAt",
    type: "string",
    headerName: "Created At",
    width: 300
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 500
  }
];

const Contacts = () => {
  const { query } = useRequestProcessor();

  const {
    data: contacts,
    isLoading,
    isError,
  } = query(
    "contacts",
    () =>
      axiosClient
        .get<BaseDataResult>("contacts")
        .then((res: any) => res.data.data),
    { enabled: true }
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  return (
    <div className="contacts">
        <div className='info'>
          <h1>Contacts</h1>
        </div>
        <ContactGrid slug='contacts' columns={columns} rows={contacts}/>
    </div>
  )
}

export default Contacts