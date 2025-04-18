# login

demo login/register ui with dark theme and smooth transitions

## setup

add your mongodb uri to a `.env` file in the root folder:
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/AUTH?retryWrites=true&w=majority
```

```bash
npm install

# run
npm run dev
```

## features

- minimal dark-themed ui
- login/register flows with mongodb backend
- simple form
- psw hashing
- remember me opt

## todo

- [x] connect to real auth api
- [x] add remember me functionality
- [ ] implement user profiles
- [ ] add password reset flow

## license

mit
