import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axios";
import { BaseDataResult, BaseResult } from "../../utils/results";
import './category.scss'

const Category = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  // Kategori bilgilerini tutacak state'leri tanımlayın
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
    isActive: false,
  });

  // Kategori bilgilerini çekmek için useQuery hook'unu kullanın
  const { data: category, isLoading, isError } = useQuery(
    ["category", id],
    () => axiosClient.get<BaseDataResult>(`categories/${id}`).then((res) => res.data.data),
    {
      onSuccess: (data) => {
        setCategoryData({
          name: data.name,
          image: data.image,
          isActive: data.isActive,
        });
      },
    }
  );

  // Kategori bilgilerini güncellemek için useMutation hook'unu kullanın
  const mutation = useMutation((updatedData) =>
    axiosClient.put<BaseResult>(`categories/${id}`, updatedData).then((res) => res.data)
  );

  // Dosya seçildiğinde çalışacak fonksiyon
  const handleFileOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    }
    file.readAsDataURL(target.files[0])


    
    setCategoryData({ ...categoryData, image: target.files[0].name });
  };

  // Form submit işlemleri
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    // FormData kullanarak dosya ve diğer bilgileri bir araya getirin
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("isActive", categoryData.isActive.toString());
    formData.append("image", categoryData.image);

    console.log(categoryData);

    // mutation.mutate ile kategori bilgilerini güncelle
    mutation.mutate(formData, {
      onSuccess: () => {
        // Güncelleme başarılı olduğunda kategoriyi geçersiz kıl
        queryClient.invalidateQueries(["category", id]);
      },
    });
  };

  // Loading durumunu kontrol edin
  if (isLoading) return <p>Loading...</p>;
  // Hata durumunu kontrol edin
  if (isError) return <p>Error</p>;

  return (
    <div className="categoryContainer">
      <h2>Edit Category: {id}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={categoryData.name}
            onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Image:</label>
          {/* Dosya seçici (file uploader) ekleyin */}
          <input type="file" onChange={handleFileOnChange} accept="image/*" />
          {/* Mevcut resmi gösterin */}
          {categoryData.image && (
            <img src={preview ? preview :`http://localhost:3000/${categoryData.image}`} alt="Current" style={{ width: "300px", height: "300px" }} />
          )}
        </div>
        <div>
          <label>Active:</label>
          <input
            type="checkbox"
            checked={categoryData.isActive}
            onChange={(e) => setCategoryData({ ...categoryData, isActive: e.target.checked })}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Category;
