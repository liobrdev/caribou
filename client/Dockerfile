FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS compiler
RUN apk add --no-cache libc6-compat
WORKDIR /client
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS cleanup
WORKDIR /client
COPY --from=compiler /client/.next ./.next
COPY --from=compiler /client/public ./public
COPY --from=compiler /client/package.json ./package.json
COPY --from=compiler /client/package-lock.json ./package-lock.json
RUN npm install --omit=dev

FROM node:lts-alpine@sha256:bb776153f81d6e931211e3cadd7eef92c811e7086993b685d1f40242d486b9bb AS runner
WORKDIR /client
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=cleanup --chown=nextjs:nodejs /client ./
EXPOSE 3000
