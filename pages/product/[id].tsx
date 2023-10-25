import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import {
  getCategoriesThunk,
  getProductByIdThunk,
  updateProductByIdThunk,
} from "@/features/product/porductAPI";
import {
  getCategories,
  getProductById,
  Product,
  selectProduct,
} from "@/features/product/productSlice";
import { get } from "immer/dist/internal";
import { useForm } from "react-hook-form";

export default function ProductPage() {
  const { product , catArr} = useAppSelector(selectProduct);
  console.log(product);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();
  const dispatch = useAppDispatch();
  const update = async (data: Product) => {
    dispatch(updateProductByIdThunk({ obj:data, id:product.id }))
      .unwrap()
      .then(console.log);
  };

  return (
    <div>
      <h1>Products Page</h1>
      <h1>Title - {product.title}</h1>
      <img src={product.image} width={100}></img>
      <h1>Description - {product.description}</h1>
      <h1>Category - {product.category}</h1>

      <h1>Update</h1>
      <form onSubmit={handleSubmit(update)}>
        <input
          placeholder=" title"
          {...register("title", { required: "enter  title" })}
        />
        {errors.title && <p>{errors.title?.message}</p>}
        <input
          placeholder=" price"
          {...register("price", { required: "enter  price" })}
        />
        {errors.price && <p>{errors.price?.message}</p>}
        <input
          placeholder=" description"
          {...register("description", { required: "enter  description" })}
        />
        {errors.description && <p>{errors.description?.message}</p>}
        <input
          placeholder=" image"
          defaultValue={
            "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          }
          {...register("image", { required: "enter  image" })}
        />
        {errors.image && <p>{errors.image?.message}</p>}
        <select>
          {catArr.map((elm, i) => {
            return (
              <option key={i} value={elm}>
                {elm}
              </option>
            );
          })}
        </select>
        <button className="btn btn-info">Save</button>
      </form>
    </div>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store): any =>
    async ({ params }: any) => {
      const data = await store
        .dispatch(getProductByIdThunk(params.id))
        .unwrap();
      store.dispatch(getProductById(data));
      const data1 = await store
        .dispatch(getCategoriesThunk())
        .unwrap();
        store.dispatch(getProductById(data));
    }
);
