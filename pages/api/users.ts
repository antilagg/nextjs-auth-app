export type User = {
  id: string
  username: string
  email: string
  password: string
}

// memory user  store 😴
let users: User[] = []

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username)
}

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email)
}

export const createUser = (username: string, email: string, password: string): User => {
  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    email,
    password
  }

  users.push(newUser)
  return newUser
}

export const getUserWithoutPassword = (user: User) => {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}
