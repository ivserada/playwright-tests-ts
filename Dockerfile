# Keep the image version in sync with @playwright/test in package-lock.json.
FROM mcr.microsoft.com/playwright:v1.64.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["npm", "test"]
