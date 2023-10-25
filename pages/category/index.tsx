import { useAppSelector } from "@/app/hooks";
import { wrapper } from "@/app/store";
import { getCategoriesThunk } from "@/features/product/porductAPI";
import { getCategories, selectProduct } from "@/features/product/productSlice";

export default function Categories() {
  const { arr, catArr } = useAppSelector(selectProduct);
  return (
    <div>
      <h1>All Categories</h1>
{
catArr.map((elm)=>{
return(
      <p key={elm} >{elm}</p>
      )
})
}    </div>
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store): any =>
    async () => {
      const data = await store.dispatch(getCategoriesThunk()).unwrap();
      console.log("Welcome");
      store.dispatch(getCategories(data));
    }
);
