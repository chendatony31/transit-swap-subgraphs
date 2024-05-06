# Subgraph of Transit Swap



```
yarn codegen
yarn build:bsc // matic eth ...
yarn deploy:bsc // matic eth ...
```


## query
```javascript
let results = await fetch('https://gateway.thegraph.com/api/API_KEY_HERE/subgraphs/id/BYhYQnafkqfrCveUSoMDxMGBNnFoGGw78ykaV2ppX4JT', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `{
            orders(first: 5) {
              id
              hash
              from
            }
          }`
      })
    })
console.log(results);
```
