Run the Server
------

```sh
# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

Docker Support
------

```sh
cd backend

# Build your docker
docker build -t tagName .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 containerTag
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```