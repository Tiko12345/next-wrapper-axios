import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import {
  createProductThunk,
  getCategoriesThunk,
} from "@/features/product/porductAPI";
import {
  getCategories,
  Product,
  selectProduct,
} from "@/features/product/productSlice";
import { Form, useForm } from "react-hook-form";

export default function Add() {
  const { catArr } = useAppSelector(selectProduct);
  console.log(catArr);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const dispatch = useAppDispatch();
  const save = async (data: Product) => {
    dispatch(createProductThunk({ ...data, id: Date.now() }))
      .unwrap()
      .then(console.log);
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit(save)}>
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
    async () => {
      const data = await store.dispatch(getCategoriesThunk()).unwrap();
      store.dispatch(getCategories(data));
    }
);
