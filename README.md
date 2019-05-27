# Challenge Frontend

Frontend for the Challenge Application that supplies you with new challenges every day.

The Frontend is based on Ionic. To start the App just run `ionic serve` in your terminal, if you have Ionic correctly 
set up already. Run `ionic serve --lab` to get a mobile device view in your browser.


## Give it a go
If you just want to take a look at the running Ionic application, run the following commands to get started.

**Note:** The resulting application won't react to your local code changes since the image just holds a copy of the
cloned repository. To react to code changes, see instructions below.

First of course, clone this repository:
```console
foo@bar:~$ git clone https://github.com/annikahanna/ChallengeFrontend.git
foo@bar:~$ cd ./ChallengeFrontend
```

Let's build the Docker image. (If you don't have Docker installed already, get it from
[here](https://docs.docker.com/install/).)
```console
foo@bar:~/ChallengeFrontend$ docker build \
    --tag node-builder \
    .
```
Next, run a container based on the built image:
```console
foo@bar:~/ChallengeFrontend$ docker run \
    --rm \
    -e "NODE_ENV=development" \
    -p 8100:8100 \
    node-builder
```
Finally, open your browser at [http://localhost:8100](http://localhost:8100) and enjoy the Ionic frontend! ;-)

If you want to stop the container, just STRG+C out of the terminal. The container will be removed automatically after it
stopped (due to option `--rm`). If you want to run the application again without code changes, just use the previous
command again.

## Try it with code changes
We can build a container which mounts your local project directory. Therefore Ionic will recognize your code changes
(live reload).

There are two possible ways to get started. If you have [docker-compose](https://docs.docker.com/compose/install/)
installed, refer to the first option.

#### Option 1: Build and run with docker-compose (recommended)

The repository holds a little docker-compose.yml which makes the development more convenient. You will need 
[docker-compose](https://docs.docker.com/compose/install/) installed.

Just let docker-compose let the magic happen (this might take a while for the first time):
```console
foo@bar:~/ChallengeFrontend$ docker-compose up
```
Don't forget to shutdown and remove the containers after use. Run (from a different console or after killing the 
containers with STRG+C):
```console
foo@bar:~/ChallengeFrontend$ docker-compose down
```

#### Option 2: Build and run with the help of the Dockerfile

Let's build the Docker image. We'll name it node-ionic-env. (If you don't have Docker installed already, get it from 
[here](https://docs.docker.com/install/).)
```console
foo@bar:~/ChallengeFrontend$ docker build \
    --tag node-ionic-env \
    --target ionic-env \
    .
```
Next, run a container based on the built image:
```console
foo@bar:~/ChallengeFrontend$ docker run \
    --rm \
    -e "NODE_ENV=development" \
    -p 8100:8100 \
    --mount type=bind,src="$(pwd)",dst=/home/node/app \
    -w "/home/node/app" \
    -it node-ionic-env bash -c \
        "npm i \
        && ionic serve --no-open"
```
If you want to stop the container, just STRG+C out of the terminal. The container will be removed automatically after it
stopped (due to option `--rm`). If you want to run the application again without code changes, just use the previous
command again.


### And finally ...
... open your browser at [http://localhost:8100](http://localhost:8100) and enjoy the Ionic frontend! ;-)
