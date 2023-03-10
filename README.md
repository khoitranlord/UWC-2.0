# UWC 2.0 container

This container is used to run UWC 2.0 project.

## Getting Started

For the techstack, we used the MERN Stack to have more consistency when processing requests between Frontend and Backend, also having the ability to scale and free hosting with MongoDB.
To sketch the diagram and draw wireframe, we use [Figama](https://www.figma.com).
This project is based mainly on React, CSS.

### Prerequisities


In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

#### Configure the environment
- For Back-end
If you want to use our existed MongoDB, first create a ".env" file in BE folder:
```{bash}
cd BE
nano .env
```
In the ".env" file, add the following:
```
ACCESS_TOKEN_KEY=ARandomString64BytesLong
REFRESH_TOKEN_KEY=AnotherRandomString64BytesLong
ATLAS_URI=mongodb+srv://guest_user:xfQhVsUz2deIo3OY@cluster1.qajpv6r.mongodb.net/?retryWrites=true&w=majority
```
*Note*: You should keep your **ACCESS_TOKEN_KEY** and **REFRESH_TOKEN_KEY** as this is the key of authentication

- For Front-end:
To be able to see the map, you should have **your own Mapbox Access Token**.
First, you also need to create an ".env" in your FE folder:
```{bash}
cd FE
nano .env
```
To connect with the Back-end, you will need the following lines in your ".env" file:
```
REACT_APP_BACKEND_URL=http://localhost:1337
REACT_APP_MAPBOX_ACCESS_TOKEN=YourMapboxAccessTokenProvidedByMapbox
```
##### Environment Variables


* `FE_IP` - Front end IP
* `NODE_ENV` - dev or product environment
* `BE_IP` - Back end IP
* `FE_PORT` - Front end Port
* `DOCKER_FE_PORT_FORWARD` - Front end port to foward from outside
* `BE_PORT` - Back end port (not able to change)
* `DOCKER_BE_PORT_FORWARD` - Back end port to foward from outside (not able to change)
###### Volumes

* `/your/file/location` - File location

####### Usage

To build project from root directory

```shell
docker-compose build
```

Run container

```shell
docker-compose up -d
```

Get access to the web

```shell
http://localhost:3501
```
Shut down

```shell
docker-compose  down
```



## Built With

* Node v16.0
* expo-cli



## Authors

* **Tran Cong Khoi** - *Initial work* - [PurpleBooth](https://github.com/khoitranlord)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* HCMUT students ...
