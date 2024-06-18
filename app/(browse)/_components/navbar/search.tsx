"use client";
// to check whether a component is client or server console log it
import qs from "query-string";
import { useState } from "react";
import { SearchIcon ,X} from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export const Search=()=>{

    const router=useRouter();
    const [value,setValue]=useState("");

    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault();

          if(!value)return;

          const url=qs.stringifyUrl({
            url:"/search",
            query:{term:value}
          },{skipEmptyString:true});

          //skipEmptyString ensures that ?term="" doesnt happen;

          router.push(url);
    }

     
 const onClear=()=>{
    setValue("")
 }







    return (<form onSubmit={onSubmit} className="relative w-full lg:w-[400px] flex items-center">
        <Input 
        value={value}
        
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0
        focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {value&&(<X className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"onClick={onClear}/>)}
        <Button type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none">
            <SearchIcon className="h-4 w-4 text-muted-foreground"/>
        </Button>
    </form>);
}

/*In the provided code, the type annotation React.FormEvent<HTMLFormElement> is used to specify the type of the e parameter in the onSubmit function. Here's why it's used and what it accomplishes:

Type Safety: By specifying React.FormEvent<HTMLFormElement>, TypeScript can understand the type of the event object e. This ensures that e has the properties and methods that are specific to form events, such as preventDefault(). It helps prevent errors by catching potential type mismatches at compile time.

IntelliSense and Autocompletion: With the type annotation, code editors like VSCode can provide better IntelliSense and autocompletion features. This makes it easier to write and understand the code, as you get helpful suggestions and documentation while typing.

Specificity: React.FormEvent<HTMLFormElement> is more specific than just React.FormEvent. It tells TypeScript that the event is coming from a form element (HTMLFormElement). This can be particularly useful if you have different event handlers for different types of form elements (e.g., input, select).

Prevent Default Behavior: The preventDefault() method is used to prevent the default form submission behavior, which would typically reload the page. Specifying the event type ensures that TypeScript recognizes this method and allows its usage without any type errors.*/