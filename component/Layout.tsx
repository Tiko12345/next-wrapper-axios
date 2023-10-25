import Link from "next/link"

export default function Layout({children}:any){
return(

<div>
        <ul>
            <li><Link href={'/'}>Products</Link></li>
            <li><Link href={'/addProduct'}>Add Product</Link></li>
            <li><Link href={'/category'}>Categories</Link></li>
        </ul>
        <div>
            {children}
        </div>
    </div>
)

}
