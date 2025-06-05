NAME := miniapps-ticket20-api
REGISTRY := 877502627026.dkr.ecr.ap-southeast-7.amazonaws.com

build-baseimage:
	docker build -t $(NAME):baseimage-latest -f Dockerfile.baseimage .
	docker tag $(NAME):baseimage-latest $(REGISTRY)/$(NAME):baseimage-latest
	#docker push $(REGISTRY)/$(NAME):baseimage-latest

build-testimage:
	docker build -t $(NAME):testimage-latest -f Dockerfile.testimage .
	docker tag $(NAME):testimage-latest $(REGISTRY)/$(NAME):testimage-latest
	docker push $(REGISTRY)/$(NAME):testimage-latest

build-image:
	docker build -t $(NAME):latest -f Dockerfile .
	docker tag $(NAME):latest $(REGISTRY)/$(NAME):latest
	docker push $(REGISTRY)/$(NAME):latest

run-test:
	docker run -it --rm \
  		-v $(shell pwd)/coverage:/usr/src/app/coverage \
		-v $(shell pwd)/source/src:/usr/src/app/src \
 		$(REGISTRY)/$(NAME):testimage-latest sh

run:
	docker run -it --rm -p 3000:3000 --env-file .env $(REGISTRY)/$(NAME):latest
