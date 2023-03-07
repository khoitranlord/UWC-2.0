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

### Usage

#### Container Parameters

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
#### Environment Variables

* `VARIABLE_ONE` - A Description
* `ANOTHER_VAR` - More Description
* `YOU_GET_THE_IDEA` - And another


*`FE_IP` - Front end IP

*`NODE_ENV` - dev or product environment
*`BE_IP` - Back end IP
*`FE_PORT` - Front end Port
*`DOCKER_FE_PORT_FORWARD` - Front end port to foward from outside
*`BE_PORT` - Back end port (not able to change)
*`DOCKER_BE_PORT_FORWARD` - Back end port to foward from outside (not able to change)
#### Volumes

* `/your/file/location` - File location


## Built With

* Node v16.0
* expo-cli@latest



## Authors

* **Tran Cong Khoi** - *Initial work* - [PurpleBooth](https://github.com/khoitranlord)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* HCMUT students ...
