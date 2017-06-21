# SCDN后台管理系统
显示当前有多少客户端

## 表结构声明s
### MD5表( Database: md5, collection: md5 )

| 键名 | 类型 | 描述 |
| id | objectid | 唯一标识 |
| filename | string | 文件名 |
| url | array | 该文件被引用的地址 |
| md5 | string | 文件的MD5值 |