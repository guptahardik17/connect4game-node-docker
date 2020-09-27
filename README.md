# Connect 4 Game API (Nodejs + Docker)

### Live Instance (temporary)
Currently this api service is deployed on Amazon EC2.
```sh
BASE URL:  http://35.154.4.151
Alternate BASE URL:  http://ec2-35-154-4-151.ap-south-1.compute.amazonaws.com
Endpoints (Details are mentioned below): 
    - /play
    - /moves
```

### Endpoints
Start Game:
```sh
Method: POST
URL: {BASE_URL}/play
Body: (raw JSON): {
    "instruction": "start"
}
```

Play your Move:
```sh
Method: POST
URL: {BASE_URL}/play
Body: (raw JSON): {
    "instruction": 3 // can be from 0 -> 6 (refers to column of matrix)
    "userToken": "tbcahyvj|1601169286848"
}
```

Fetch all Moves:
```sh
Method: GET
URL: {BASE_URL}/moves
Query Parameters: 
    userToken: tbcahyvj|1601169286848
```

### Deployment
```sh
$ git clone https://github.com/guptahardik17/connect4game-node-docker.git
$ cd connect4game-node-docker
$ docker-compose up --build
```

### Screenshots
<img src="https://he-s3.s3.amazonaws.com/media/uploads/c5cbc5d.png" width="600">
<img src="https://he-s3.s3.amazonaws.com/media/uploads/bfc6671.png" width="600">

<img src="https://he-s3.s3.amazonaws.com/media/uploads/8e9888e.png" width="600">
<img src="https://he-s3.s3.amazonaws.com/media/uploads/b7b2b37.png" width="600">

<img src="https://he-s3.s3.amazonaws.com/media/uploads/ac26830.png" width="600">
<img src="https://he-s3.s3.amazonaws.com/media/uploads/992b54b.png" width="600">
