FROM denoland/deno:1.17.1
COPY ./index.ts ./index.ts

EXPOSE 8080
RUN deno cache ./index.ts
CMD ["run", "--allow-net", "./index.ts"]
