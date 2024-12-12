import React from 'react'
import { CommentGet } from '../../../Models/Comment';
import RecipeCommentListItem from '../RecipeCommentListItem/RecipeCommentListItem';

type Props = {
    comments : CommentGet[];
}
const RecipeCommentList = (props:Props) => {
  return (
    <>
        {props.comments ? props.comments.map((comment) => {
            return <RecipeCommentListItem comment = {comment}/>
        }) : ("")}
    </>
  )
}

export default RecipeCommentList
