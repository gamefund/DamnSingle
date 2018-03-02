================================

前端界面
工具：JQuery

================================


以单界面模式开发
使用一个数组来管理打开界面记录以及传递的数据

文件目录说明
css
|-- 全局样式存放

js
|-- 配置文件以及工具文件，启动控制文件

module	各个界面模块
|-- active 活动消息
|-- attributes 属性模块
|-- buy 购买界面
|-- detail 宠物详情界面
|-- error 错误界面
|-- header 顶栏
|-- homePage 主界面
|-- language 语言控制
|-- marketplace 交易所
|-- myKitties 我的宠物界面
|-- profile 提示框
|-- sale 出售
|-- setting 个人资料设置
|-- signIn 登录、注册界面
|-- sire 交配界面
|-- waitAlert 模式化界面

每个module下都包括
css
|-- 模块界面样式
js
|-- 模块界面js代码

***.html.js -- html节点内容