<%--
  Created by Damn Single Studio@GAME.FUND.
  User: gsc1456
  Date: 2018/1/3
  Time: 11:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>异常页面</title>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/jquery.pagination.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/config.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/global.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/main.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/etheric/js/util.js"></script>
    <script>
        pageState = 1;
    </script>
    <link type="text/css" href="<%=request.getContextPath()%>/etheric/css/main.css" rel="stylesheet"/>
    <link type="text/css" href="<%=request.getContextPath()%>/etheric/css/pagination.css" rel="stylesheet"/>
</head>
<body>
    <div id="all-container">
        <div class="error-main">
            <image class="error-title-img" src="<%=request.getContextPath()%>/etheric/module/error/img/500.png"></image>
            <div class="error-msg"></div>
            <div class="error-next"></div>
        </div>
    </div>
</body>
</html>
