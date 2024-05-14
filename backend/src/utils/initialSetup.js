import { Role, ROLES } from '../models/role.model.js'
import { User } from '../models/user.model.js'
import { Post } from '../models/post.model.js'
import { Category } from '../models/category.model.js'
import { Tag } from '../models/tag.model.js'
import { Comment } from '../models/comment.model.js'

export const initialSetup = async () => {
  await createRoles()
  await createAdminUser()
  await createCategories()
  await createTags()
  await createComments()
  await createPosts()
}

/**
 * Create then necessary roles in the database
 * ROLES: User, Admin
 * - If there are roles in the database, do nothing
 * - If there are no roles in the database, create them
 */
export const createRoles = async () => {
  // Check if there are roles in the database
  const currentRoles = await Role.findAll()

  // If there are roles, do nothing
  if (currentRoles.length > 0) return

  // If there are no roles, create them
  const roles = [
    { name: 'USER' },
    { name: 'ADMIN' },
    { name: 'EDITOR' },
    { name: 'AUTHOR' },
    { name: 'CONTRIBUTOR' },
    { name: 'SUBSCRIBER' }
  ]

  // Create roles
  await Role.bulkCreate(roles)

  console.log('Roles created')
}

export const createAdminUser = async () => {
  // Check if there are users in the database
  const currentUsers = await User.findAll()

  // If there are users, do nothing
  if (currentUsers.length > 0) return

  // If there are no users, create the admin user
  const adminUser = {
    display_name: 'Administrator',
    username: 'admin',
    password: User.encryptPassword('admin'),
    email: 'admin@wordtriss.com',
    role_id: ROLES.ADMIN
  }

  // Create the admin user
  await User.create(adminUser)

  console.log('Admin user created')
}

/**
 * Create test categories in the database
 */
export const createCategories = async () => {
  // Check if there are posts in the database
  const currentCategories = await Post.findAll()

  // If there are posts, do nothing
  if (currentCategories.length > 0) return

  // If there are no posts, create them
  const categories = [
    { name: 'category 1' },
    { name: 'category 2' },
    { name: 'category 3' },
    { name: 'category 4' }
  ]

  // Create categories
  await Category.bulkCreate(categories)

  console.log('Categories created')
}

/**
 * Create test tags in the database
 */
export const createTags = async () => {
  // Check if there are posts in the database
  const currentTags = await Post.findAll()

  // If there are posts, do nothing
  if (currentTags.length > 0) return

  // If there are no posts, create them
  const tags = [
    { name: 'tag 1' },
    { name: 'tag 2' },
    { name: 'tag 3' },
    { name: 'tag 4' }
  ]

  // Create categories
  await Tag.bulkCreate(tags)

  console.log('Tags created')
}

/**
 * Create test comments in the database
 */
export const createComments = async () => {
  // Check if there are comments in the database
  const currentComments = await Comment.findAll()

  // If there are comments, do nothing
  if (currentComments.length > 0) return

  // If there are no comments, create them
  const comments = [
    {
      content: 'Comentario de prueba1',
      status: 'approved',
      user_id: 1,
      post_id: null,
      parent_id: null
    },
    {
      content: 'Comentario de prueba2',
      status: 'approved',
      user_id: 1,
      post_id: null,
      parent_id: null
    },
    {
      content: 'Comentario de prueba3',
      status: 'approved',
      user_id: 1,
      post_id: null,
      parent_id: 2
    }
  ]

  // Create categories
  await Comment.bulkCreate(comments)

  console.log('Comments created')
}

/**
 * Create test posts in the database
 */
export const createPosts = async () => {
  // Check if there are posts in the database
  const currentPosts = await Post.findAll()

  // If there are posts, do nothing
  if (currentPosts.length > 0) return

  // If there are no posts, create them
  const posts = await Post.bulkCreate([
    {
      id: '1',
      title: 'Cómo instalar Python en Windows',
      content: 'Python es un lenguaje de programación popular...',
      thumbnail:
        'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      user_id: 1,
      created_at: '2024-04-23 10:00:00',
      updated_at: '2024-04-23 10:00:00'
    },
    {
      id: '2',
      title: 'Los beneficios del yoga para la salud mental',
      content: 'El yoga no solo fortalece el cuerpo, también tiene...',
      thumbnail:
        'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      status: 'published',
      user_id: 1,
      created_at: '2024-04-22 14:30:00',
      updated_at: '2024-04-22 14:30:00'
    },
    {
      id: '3',
      title: 'Recetas rápidas y saludables para el desayuno',
      content: '¿Te falta tiempo por las mañanas? Aquí tienes...',
      thumbnail:
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wallpapers13.com%2Fwp-content%2Fuploads%2F2015%2F12%2FNature-Lake-Bled.-Desktop-background-image.jpg&f=1&nofb=1&ipt=2823ecaa364086a327e5aef7cd5a2e752875850cb3c493680cf59ea679ea340a&ipo=images',
      status: 'published',
      user_id: 1,
      created_at: '2024-04-21 08:45:00',
      updated_at: '2024-04-21 08:45:00'
    },
    {
      id: '4',
      title: 'Consejos para mejorar tu productividad en el trabajo',
      content: '¿Te cuesta concentrarte? Aquí tienes algunos...',
      status: 'published',
      user_id: 1,
      created_at: '2024-04-20 11:20:00',
      updated_at: '2024-04-20 11:20:00'
    }
  ])

  // Get all categories and tags from the database
  const allCategories = await Category.findAll()
  const allTags = await Tag.findAll()
  const allComments = await Comment.findAll()

  // Create posts with associated categories and tags
  await Promise.all(
    posts.map(async (post, index) => {
      await post.addCategories(allCategories.slice(index % 3, (index % 3) + 2)) // Associate 2 categories each post
      await post.addTags(allTags.slice(index % 3, (index % 3) + 2)) // Associate 2 tags each post
      await post.addComments(allComments.slice(index % 3, (index % 3) + 2)) // Associate 2 comments each post
    })
  )

  console.log('Posts created')
}
