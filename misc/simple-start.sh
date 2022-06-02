function initialize_front_end() {
  printf "\n> ASYNC: Instalando o front-end e gerando uma build do projeto\n"
  (
    cd ./front-end
    cacheFolderFront="/tmp/delivery-app-front-end-cache"
    rm -rf $cacheFolderFront
    npm_config_loglevel=silent npm install --cache $cacheFolderFront
    npm run build
  )
}

initialize_front_end