// This page only renders when the app is built statically (output: 'export')
import {redirect} from "next/navigation";

export default function RootPage() {
  redirect('/en');
}