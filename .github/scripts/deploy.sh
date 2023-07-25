cd ~/twendee-cms-base/
git checkout main
git pull 
yarn
yarn run prisma generate
yarn build
pm2 restart twendee-cms
