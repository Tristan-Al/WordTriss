import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'

export const createToken = (user) => {
  console.log(
    `\t --> Creating token User { ID: ${user.id}, displayName: ${user.display_name}, email: ${user.email}, username: ${user.username}, roleId: ${user.role_id}, roleName: ${user.role_name} picture: ${user.picture}, isAdmin: ${user.isAdmin} }`
  )
  const obj = {
    user: {
      id: user.id,
      displayName: user.display_name,
      username: user.username,
      email: user.email,
      roleId: user.role_id,
      roleName: user.role_name,
      picture: user.picture,
      isAdmin: user.isAdmin
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
    userId: post.user_id,
    categories: [],
    tags: [],
    comments: [],
    createdAt: post.created_at,
    updatedAt: post.updated_at
  }

  if (post.categories && post.categories.length > 0) {
    formattedPost.categories = post.categories.map((category) => category.id)
  }

  if (post.tags && post.tags.length > 0) {
    formattedPost.tags = post.tags.map((tag) => tag.id)
  }

  if (post.comments && post.comments.length > 0) {
    formattedPost.comments = post.comments.map((comment) => comment.id)
  }

  return formattedPost
}

// Format user as JSON response
export const formatUser = (user) => {
  return {
    id: user.id,
    displayName: user.display_name,
    username: user.username,
    email: user.email,
    roleId: user.role_id,
    picture: user.picture
  }
}

// Format comment as JSON response
export const formatComment = (comment) => {
  return {
    id: comment.id,
    content: comment.content,
    status: comment.status,
    userId: comment.user_id,
    postId: comment.post_id,
    parentId: comment.parent_id,
    createdAt: comment.created_at,
    updatedAt: comment.updated_at
  }
}
