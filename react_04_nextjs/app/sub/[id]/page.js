// import { useRouter } from "next/router";
'use client'
import {  useRouter, usePathname } from 'next/navigation';

export default function Id(){
    // const router= useRouter();
    // const id = Number(router.query.id);
    const pathname = usePathname();
    console.log(pathname);
    return <>
        <h1>/app/sub/[id]/page.js</h1>
        {/* <p>Parameter id : {id}</p> */}
        <a href="/">/app/page.js</a>
    </>
}