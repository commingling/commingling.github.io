#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<commingling>.github.io
git push -f git@github.com:commingling/commingling.github.io.git master

# 如果发布到 https://<commingling>.github.io/<commingling.github.io>
git push -f git@github.com:commingling/commingling.github.io.git master:gh-pages

# 把上面的 <commingling> 换成你自己的 Github 用户名，<commingling.github.io> 换成仓库名，比如我这里就是：
#git push -f git@github.com:wtyqer/blog.git master:gh-pages

cd -
