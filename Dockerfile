FROM node:8
RUN yarn global add world-cup-cli-dashboard
ENTRYPOINT wc2018
