# Logger

Simple frontend logger.

## Demo

[http://formidableworks.github.io/logger/](http://formidableworks.github.io/logger/)

## Local setup

```sh
# clone this repository.
git clone git@github.com:formidableworks/logger.git

# change dir
cd logger

# start splunk via docker.
docker compose up -d # V1: docker-compose up -d

# setup node env
nvm install --lts
nvm use --lts
npm i -g yarn

# install deps
yarn

# build project
yarn build

# host locally
yarn preview
```

1. Open the preview url: [http://127.0.0.1:4173/logger/](http://127.0.0.1:4173/logger/) in the browser.
1. Open the browser developer tools and click the console tab.
1. Click the `Disable msw` button (under the debug section).
1. Thats the local setup complete -- now click ze buttons. <sup>except the `enable msw` button.</sup>

## View messages in splunk.

1. visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
1. login using:
   - username: `admin`
   - password: `splunkpw`
1. Click on `Search & Reporting` in the lefft nav menu.
1. Type `source="react-splunk-prototype/ui-logging"` into the search box, and click the search button.
