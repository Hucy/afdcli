## 概述

  修改[vue-cli](https://github.com/vuejs/vue-cli) 而来 用生成模板文件目录,
  模板配置和vue保持一致

## 用法

  1. clone 仓库到本地：

    ```
      git clone https://github.com/Hucy/agi-cli.git
    ```
  2.  进入 `agi-cli` :

    ```
      cd agi-cli
    ```
  3. 执行 ` npm i . -g`将 模块安装到全局环境

  4. 命令行执行 ` agi ` 查看帮助：

    - `init` 生成模板文件
    - `dev`  开启开发环境
    - `pre`  部署测试环境

    待添加：
    - `dep` 部署正式环境
    - `work` 初始化工作区，[工作区介绍](https://github.com/Hucy/workflow.git)

## 默认模板

- [vue-webpack](https://github.com/vuejs-templates/webpack.git)
- [jquery-ejs-webpack](https://github.com/Hucy/jquery-ejs-webpack.git)

## 自定义模板

  模板存放路径为 ` templates `, 可在 `templates` 文件夹下新建文件目录,或者新建`workflow`，相关配置查看[workflow](https://github.com/Hucy/workflow.git)

## TODO

- 稳定后发布npm
- 增加默认react模板
- 增加在线模板 
