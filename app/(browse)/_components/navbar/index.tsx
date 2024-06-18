import { Search } from "./search"
import { Logo } from "./logo"
import { Action } from "./action"

export const Navbar=()=>{
    return (
        <nav className="fixed top-0 w-full h-20 z-[49] px-2 lg:px-4 flex justify-between items-center shadow-sm bg-gray-200">
            <Logo/>
             <Search/>
             <Action/>
        </nav>
    )
}