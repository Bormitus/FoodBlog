import React, { useEffect, useState } from "react";
import { CommentGet } from "../../Models/Comment";
import { toast } from "react-toastify";
import { getCommentAPI, postCommentAPI } from "../../Services/CommentService";
import Spinner from "../Spinner/Spinner";
import RecipeCommentList from "./RecipeCommentList/RecipeCommentList";
import RecipeCommentForm from "./RecipeCommentForm/RecipeCommentForm";
import { useAuth } from "../../Context/useAuth";

type Props = {
  id: number;
  name: string;
};
type CommentFormInputs = {
  content: string;
};
const RecipeComment = (props: Props) => {
  const { isLoggedIn } = useAuth();
  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const { getUsername } = useAuth();
  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    postCommentAPI(getUsername(), e.content, props.id)
      .then((res) => {
        toast.success("Комментарий был создан");
        getComments();
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const getComments = () => {
    setLoading(true);
    getCommentAPI(props.name).then((res) => {
      setLoading(false);
      setComment(res?.data!);
    });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <RecipeCommentList comments={comments!} />}
      {isLoggedIn() && <RecipeCommentForm handleComment={handleComment} />}
      {!isLoggedIn() && (
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
          Пожалуйста, войдите в аккаунт, чтобы оставлять комментарии
        </h1>
      )}
    </div>
  );
};

export default RecipeComment;
