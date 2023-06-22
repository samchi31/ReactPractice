import { Outlet } from "react-router-dom";
import PostListContainer from "../container/PostListContainer";

export default function PostListPage() {
    return <> 
        <PostListContainer />
        <Outlet />
    </>;
}