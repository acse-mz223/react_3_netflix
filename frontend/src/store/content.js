import {create} from "zustand"

const useContentStore = create((set) =>({
    content: "movie",
    contentToMovie: ()=>{set({content: "movie"})},
    contentToTv: ()=>{set({content: "tv"})}
}))

export default useContentStore