if [ $1 == "pull" ]
then
  if [ ! -d "./cypress/fixtures" ] 
  then
    mkdir -p "./cypress/fixtures"
    cd "./cypress/fixtures"
    rm -rf .git
    git init
    git remote add -f origin git@github.com:ant-galaxy/e2e-fixtures.git
    git config core.sparsecheckout true
    echo "/playground/" >> .git/info/sparse-checkout
    git checkout -b main origin/main
  fi 
elif [ $1 == "push" ]
then
  cd "./cypress/fixtures"
  git add playground/*
  git commit -am 'feat: update fixtures'
  git push origin main
fi
