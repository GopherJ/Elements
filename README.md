# VueReusable

Vue Reusable Components, Directives, Prototypes


## Components

- `ReturnTop`
  ```vue
  <return-top :threshold="1/3" :duration="500"></return-top>
  ```


## Directives

- `v-fixed-top`  :  when scroll to a component, makes it fix there
- `v-focus`      :  the same as `el.focus()`
- `v-visible`    :  similar with `v-show` but it changes only visibility which means element will take space


## Prototypes


## Contribute

1. create your own branch on gitlab
2. `git clone ssh://git@git.ubudu.com:10022/GopherJ/VueReusable.git`
    1. `cd VueReusable`
    2. `git checkout -b [branch name]`
    3. `make changes`
    4. `npm run build`
    5. `git add . && git commit -m "[message]" && git push origin [branch name]`
    6. `send PR`







