import Link from "next/link";
import { db } from '~/server/db';


export default function HomePage() {

  console.log(db)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

    </main>
  );
}
