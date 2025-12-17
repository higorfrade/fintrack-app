import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
import { LuPlus } from 'react-icons/lu';
import CategoryList from '../../components/CategoryList';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal';
import CategoryForm from '../../components/CategoryForm';
import DeleteAlert from '../../components/DeleteAlert';

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

      if (response.status === 200) {
        console.log("Categorias", response.data);
        setCategoryData(response.data);
      }

    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao buscar os detalhes das categorias");

    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (category) => {
    const {name, type, icon} = category;

    if (!name.trim()) {
      toast.error("Nome da categoria é necessário.");
      
      return;
    }

    const categoryExist = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    });

    if (categoryExist) {
      toast.error("Já existe uma categoria com esse nome.")
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});

      if (response.status === 201) {
        toast.success("Categoria adicionada com sucesso.");
        setOpenAddCategory(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Erro ao adicionar a categoria", error);
      toast.error(error.response?.data?.message || "Falha ao adicionar categoria.");
    }
  }

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategory(true)
  }

  const handleUpdateCategory = async (updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;

    if (!name.trim()) {
      toast.error("Nome da categoria é necessário.");
      return;
    }

    if (!id) {
      toast.error("ID da Categoria não encontrado.");
      return;
    }

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
      toast.success("Categoria atualizada com sucesso.");
      setOpenEditCategory(false);
      setSelectedCategory(null);
      fetchCategoryDetails();
    } catch (error) {
      console.error("Erro ao atualizar a categoria: ", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Falha ao atualizar a categoria.");
    }
  }

  const deleteCategory = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_CATEGORY(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Categoria excluida com sucesso.");
      fetchCategoryDetails();
    } catch (error) {
      console.error("Erro ao excluir a categoria", error);
      toast.error(error.response?.data?.message || "Falha ao excluir categoria.");
      toast("Atenção: Você não pode excluir categorias que estão vinculadas a uma transação!");
    }
  }

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <Dashboard activeMenu="Categoria">
      <div className="my-5 mx-auto">
        {/* Button to add Category */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Todas as Categorias</h2>
          <button 
              onClick={() => setOpenAddCategory(true)}
              className="add-btn gap-1 rounded-lg py-2 px-3 hover:scale-105 font-medium">
            <LuPlus size={25} />
            Adicionar Categoria
          </button>
        </div>

        {/* Lista de Categorias */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory}
        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})} />

        {/* Modal p/ Adicionar Categoria */}
        <Modal
          isOpen={openAddCategory}
          onClose={() => setOpenAddCategory(false)}
          title="Adicionar Categoria"
        >
          <CategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* Modal p/ Editar Categoria */}
        <Modal
          isOpen={openEditCategory}
          onClose={() => {
            setOpenEditCategory(false);
            setSelectedCategory(null);
          }}
          title="Editar Categoria"
        >
          <CategoryForm 
            initialCategoryData={selectedCategory}
            onEditCategory={handleUpdateCategory}
            isEditing={true}
          />
        </Modal>

        {/* Deletar Categorias */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Excluir Categoria"
        >
          <DeleteAlert 
            content="Tem certeza de que deseja excluir esta categoria?"
            onDelete={() => deleteCategory(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </Dashboard>
  )
}

export default Category;