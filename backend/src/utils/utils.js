import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

export const createToken = (user) => {
  console.log(
    `\t --> Creating token User { ID: ${user.id}, displayName: ${user.display_name}, email: ${user.email}`
  )
  const obj = {
    user: {
      id: user.id,
      displayName: user.display_name,
      username: user.username,
      email: user.email,
      roleId: user.role_id,
      picture: user.picture
    },
    exp: dayjs().add(24, 'hours').unix()
  }

  return jwt.sign(obj, process.env.JWT_SECRET_KEY)
}

// Format post as JSON response
export const formatPost = (post) => {
  const formattedPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    thumbnail: post.thumbnail,
    status: post.status,
    user: {
      id: post.user.id,
      displayName: post.user.display_name,
      username: post.user.username,
      email: post.user.email,
      biography: post.user.biography,
      picture: post.user.picture,
      roleId: post.user.role_id
    },
    categories: [],
    tags: [],
    comments: [],
    createdAt: post.created_at,
    updatedAt: post.updated_at
  }
  if (post.categories && post.categories.length > 0) {
    formattedPost.categories = post.categories.map((category) => ({
      id: category.id,
      name: category.name
    }))
  }

  if (post.tags && post.tags.length > 0) {
    formattedPost.tags = post.tags.map((tag) => ({
      id: tag.id,
      name: tag.name
    }))
  }

  if (post.comments && post.comments.length > 0) {
    formattedPost.comments = post.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      date: comment.updated_at,
      status: comment.status,
      userId: comment.user_id,
      postId: comment.post_id,
      parentId: comment.parent_id
    }))
    // formattedPost.comments = post.comments
  }

  return formattedPost
}
