# redstone-payload-cli

minimal cli for grabbing 3-signed payload for a given feed ID

this is useful if you need to call the `@redstone-finance/sdk` from
non-javascript environments

binary is quite large (~50MB), so would not use this outside of local tests

## Installation

```bash
npm i -g redstone-payload-cli
```

## Usage

```
1 $ redstone-payload-cli BTC
[66,84,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,82,35,75,31,108,1,146,237,29,141,176,0...]
```
