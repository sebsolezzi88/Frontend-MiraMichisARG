import type { PostComment, PostFullData } from "../types/types";

interface CatPostCommentsProps{
  postData: PostFullData;
  commentData: PostComment[];
}

const CatPostComments = ({postData, commentData}:CatPostCommentsProps) => {
  return (
    <div>CatPost</div>
  )
}

export default CatPostComments