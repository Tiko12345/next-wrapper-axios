import Image from "next/image";
import { Inter } from "next/font/google";
import { wrapper } from "@/app/store";
import {
  getCategoriesThunk,
  getProductsByCategoryThunk,
  getProductsByLimitThunk,
  getProductsThunk,
} from "@/features/product/porductAPI";
import {
  getCategories,
  getProducts,
  selectProduct,
} from "@/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { arr, catArr } = useAppSelector(selectProduct);
  console.log(catArr, arr);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>All Products</h1>
      <select
        onChange={async (e) => {
          const data = await dispatch(
            getProductsByCategoryThunk(e.target.value)
          ).unwrap();
          console.log(data);
          dispatch(getProducts(data));
        }}>
        {catArr.map((elm) => {
          return (
            <option key={elm} value={elm}>
              {elm}
            </option>
          );
        })}
      </select>
      <input
        type={"number"}
        onChange={async (e) => {
          const data = await dispatch(
            getProductsByLimitThunk(+e.target.value)
          ).unwrap();
          dispatch(getProducts(data));
        }}></input>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Category</th>
            <th>See</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((elm, id) => {
            return (
              <tr key={elm.id}>
                <td>{elm.title}</td>
                <td>
                  <img src={elm.image} width={100}></img>
                </td>
                <td>{elm.category}</td>
                <td>
                  <Link href={"/product/" + elm.id}>see more</Link>
                </td>
                <td>
                  <button>&times;</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store): any =>
    async () => {
      const data = await store.dispatch(getProductsThunk()).unwrap();
      console.log("Welcome");

      // console.log(data);
      store.dispatch(getProducts(data));
      const data1 = await store.dispatch(getCategoriesThunk()).unwrap();
      store.dispatch(getCategories(data1));
    }
);
