import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, goToHome } from "../modules/posts";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";


export default function PostContainer({postId}){
    const {data, loading, error} = useSelector(state => state.posts.post);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPost(postId));
    }, [postId, dispatch]);

    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러</div>;
    if(!data) return null;

    return (
        <>
            <button onClick={()=>dispatch(goToHome(navigate))}>홈으로 이동</button>
            <Post post={data} />
        </>
    );
}