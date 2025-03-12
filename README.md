# Contact Management App

## Requirements

To run the you'll need: AWS permissions and keys, and a DynamoDB table with `Email(S): PartitionKey` and `Lastname(S): SortKey`

## Setup

### Build it yourself

1. First, clone the project `git clone https://github.com/emaforlin/contact-management-app.git`

2. Then move inside the project folder and install dependencies `cd ./contact-management-app && npm install`

3. Run the app
    * To run the development server (hot reload enabled): `npm run dev`
    * Or you can build the production ready app instead with: `npm run build`. To start the server use `npm start`

### Use the Docker image (Recommended)

1. Build the image`docker build -t contact-management-app .`

2. Run `docker -p<your_port>:3000 run contact-management-app`

3. Access to `http://localhost:<your_port>`


## Features

* Form to add new Contacts with: inputs validations, user friendly error messages, and loading state handling.
* Clear form button, it clears the inputs and reset validation errors.
* Contacts cards list on a different page.
* Delete Contact button integrated with the card.
* Multi-stage Dockerfile to reduce the build time and final image size.

## Project structure reasoning

1. I chose Next JS as my React framework. I didn't think it was the best fit for this project because it has many underutilized features.

2. For the storage, DynamoDB was a requirement. Given that it is a non-relation db, I choose to take advantage of this by using the *email* attribute as the __Partition Key__ and the  *lastname* as the __Sort Key__, to avoid adding unnecessary attributes.

3. To handle the database operations I'm sharing a unique instance of the *DynamoDBClient*, which is defined in */services*, and using it in my own wrapper functions. Then I call this functions from the appropriate component.

4. Dockerization. In this case I choose a __multi-stage Dockerfile__ mainly because of the final __image size improvement__ (which in this case was __about 87%__), but it also adds security (for example, you decide which files and which not to maintain in the production package).