# hello

[zimekk.github.io/hello](https://zimekk.github.io/hello)

- [ ] Edit repository details / Website
- [ ] Settings / GitHub Pages / Select Branch
- [ ] Clone repository
- [ ] Update package.json
- [ ] Update README.md
- [ ] Push changes

```sh
git commit --amend -am "chore: initial commit"
git push -f
```

## install

```sh
nvm install v14
npm i -g yarn
```

```sh
node -v # v14.18.2
yarn -v # 1.22.19
```

## run

```sh
yarn
yarn start # ⚡️[server]: Server is running at http://localhost:8080
```

```sh
curl http://localhost:8080 # <!DOCTYPE html>
```

## docker

```sh
docker-compose config # services:
docker-compose up --build # app_1  | ⚡️[server]: Server is running at http://localhost:8080
```

```sh
curl http://localhost:8080 # <!DOCTYPE html>
```

```sh
docker system prune -f # Deleted Containers:
```

## hooks

```sh
yarn husky install
yarn husky add .husky/pre-commit "yarn pretty-quick --staged"
yarn husky add .husky/commit-msg "yarn commitlint --edit \$1"
```
