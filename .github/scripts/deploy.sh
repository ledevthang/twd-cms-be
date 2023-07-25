cd ~/twd-cms-be/
git checkout main
git pull 
yarn
npx prisma generate
yarn build
pm2 restart twendee-cms
