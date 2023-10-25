import { useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import { getProductByIdThunk } from "@/features/product/porductAPI";
import { getProductById, selectProduct } from "@/features/product/productSlice";
import { get } from "immer/dist/internal";

export default function ProductPage() {
  const { product } = useAppSelector(selectProduct);
  console.log(product);

  return (
    <div>
      <h1>Products Page</h1>
      <h1>Title - {product.title}</h1>
      <img src={product.image} width={100}></img>
      <h1>Description - {product.description}</h1>
      <h1>Category - {product.category}</h1>
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
    }
);
