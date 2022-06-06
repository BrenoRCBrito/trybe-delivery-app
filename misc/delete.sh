cd ./back-end
rm -rf package-lock.json
rm -rf node_modules
echo 'if back-end package-lock or node_modules exists, now they are deleted\n'
cd ..
cd ./front-end
rm -rf package-lock.json
rm -rf node_modules
echo 'if front-end package-lock or node_modules exists, now they are deleted\n'
cd ..
rm -rf package-lock.json
rm -rf node_modules
echo 'if rootDir package-lock or node_modules exists, now they are deleted\n'