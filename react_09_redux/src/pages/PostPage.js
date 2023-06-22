import { useParams } from "react-router-dom";
import PostContainer from "../container/PostContainer";

export default function PostPage(/*{match}*/) {
    // const {id} = match.params;
    const params = useParams();

    return <PostContainer postId={parseInt(params.id, 10)} />;
}