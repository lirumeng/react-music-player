#### 安装中的一些问题
###### react-hot-loader 一定要用beta版本
由于一个小小的问题，导致编译一直不通过， 因为我是自己安装的，没有拷老师的package.json，直接用npm install react-hot-loader导致react-hot-loader版本问题，一直报错：Module not found: Error: Can't resolve 'react-hot-loader/patch'，解决方法】npm install react-hot-loader@next 使用beta 版本。

答案来源于：http://npm.taobao.org/package/cf-rich-editor，谢谢！
