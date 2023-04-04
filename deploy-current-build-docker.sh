project_name="stonetop-generator"

docker kill $project_name-test >/dev/null
docker rm $project_name-test >/dev/null

function reloadprod {
  ssh root@pccloud "cd ~/$project_name ; docker-compose pull ; docker-compose down ; docker-compose up -d"
}

function push {
  docker buildx build --platform linux/amd64 --tag=$project_name . 
  docker tag $project_name pricecomstock/$project_name
  docker push pricecomstock/$project_name:latest
}

function testcontainer {
  docker run --name $project_name-test -p 5000:80 $project_name > /dev/null &
  echo "Do you still wish to deploy? This will rebuild the container for x64"
  select yn in "Yes" "No"; do
      case $yn in
          Yes ) push; break;;
          No ) break;;
      esac
  done
  docker kill $project_name-test | xargs echo "killing"
  docker rm $project_name-test | xargs echo "removing"
}

docker buildx build --no-cache --tag=$project_name .
echo ""
echo "=============================="
echo ""
echo "Container built!"
echo "You can either launch a test container on port 5000, or throw caution to the wind and just push to DockerHub"
echo "Please choose next step:"
select next in "Test" "Push" "Nothing"; do
  case $next in
    Test ) testcontainer; break;;
    Push ) push; break;;
    Nothing ) break;;
  esac
done

echo "Refresh prod?"
select next in "JustProd" "Both" "No"; do
  case $next in
    JustProd ) reloadprod; break;;
    Both ) reloadstage; reloadprod; break;;
    No ) break;;
  esac
done