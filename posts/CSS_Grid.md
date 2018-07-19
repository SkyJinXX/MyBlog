##### v0.1
# Grid思路    
1. 定行列
2. 放项目
3. 调对齐  

# grid-template-areas  
### 范例  
```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```  
### 作用  
统一管理item占位  
# 关键
网格框 含住 元素框