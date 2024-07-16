import { redirect } from "next/navigation";


interface SearchPageProps{
    searchParams:{
        term?:string;
    }
}

const SearchPage = ({searchParams}:SearchPageProps) => {

    if(!searchParams.term)
    {
       console.log("h")
        redirect("/")
    }

  return (
    <div>SearchPage</div>
  )
}

export default SearchPage