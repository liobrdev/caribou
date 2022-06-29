## System Requirements
- Latest LTS version of Node
- Java 8

## Getting Started

Clone this repo `git clone https://github.com/liobrdev/caribou.git`

Build and run the frontend code within the `/client` folder:

```bash
cd client
npm install
npm run dev
```

In a different terminal or tab, build and run the backend code within the `/server` folder:

```bash
cd server
mvn package
java -cp target/Server-1.0-SNAPSHOT.jar dev.liobr.randyscandies.Main
```

Or, open the `/server` folder as a Maven project within a Java IDE and run the project.

After running the previous commands, open `http://localhost:3000` in a browser.

## Just For Fun

See the deployed application at [https://randyscandies.liobr.dev](https://randyscandies.liobr.dev)!
