import { Outlet } from "react-router-dom";
import { Sidenav } from "../../../shared";

export default function Layout() {
    return (
        <>
            {/* <header></header> */}
            <aside className="sidenav">
                <Sidenav />
            </aside>
            <div className="flex-grow bg-[#e6eaee] p-[30px_40px] min-h-screen h-auto overflow-auto outlet">
                <Outlet />
            </div>
            {/* <footer></footer> */}
        </>
    )
}
