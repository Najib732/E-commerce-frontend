"use client";
import Link from "next/link";

export default function linkup(){
    return (
        <>
        <Link href="http://localhost:8000/seller/1">User1</Link><br></br>
        <Link href="http://localhost:8000/seller/2">User2</Link><br></br>
        <Link href="http://localhost:8000/seller/3">User3</Link><br></br>
        <Link href="http://localhost:8000/seller/4">User4</Link><br></br>
        <Link href="http://localhost:8000/seller/5">User5</Link><br></br>
        <Link href="http://localhost:8000/seller/6">User6</Link>
        </>
    )

}