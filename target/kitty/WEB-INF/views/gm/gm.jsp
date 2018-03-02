<%@ page import="com.c2engine.kitty.util.DateUtil" %>
<%--
  Created by Damn Single Studio@GAME.FUND.
  User: zeqian.zhang
  Date: 2018/1/18
  Time: 11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
//String tag = String.valueOf(System.currentTimeMillis());
    String tag = "1";
%>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />
    <title>GM</title>
    <script type="text/javascript" src="../../../etheric/js/jquery-3.2.1.min.js" charset="UTF-8"></script>
    <script type="text/javascript" src="../../../gm/js/gm_main.js?_=<%=tag%>" charset="UTF-8"></script>
    <script type="text/javascript" src="../../../etheric/js/config.js?_=<%=tag%>" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="../../../gm/css/gm_main.css?_=<%=tag%>" charset="UTF-8">


</head>
<body>
    <div class="div-body">
        <%-- header --%>
        <div class="div-head">
            <%-- logo --%>
            <div class="div-head-logo">
                <span></span>
            </div>
            <%-- user --%>
            <div class="div-head-user">
                <span></span>
            </div>
        </div>
        <%-- show --%>
        <div class="div-show">
        </div>

        <div class="div-title">
            <span>部件(Part)</span>
        </div>

        <%-- choose --%>
        <div class="div-choose">
            <div class="choose div-choose-body">
                <select>
                    <%--<option>body</option>--%>
                </select>
            </div>
            <div class="choose div-choose-tail">
                <select>
                    <%--<option>body</option>--%>
                </select>
            </div>
            <div class="choose div-choose-eye">
                <select>
                    <%--<option>body</option>--%>
                </select>
            </div>
            <div class="choose div-choose-mouth">
                <select>
                    <%--<option>body</option>--%>
                </select>
            </div>
        </div>
        <div class="div-enter">
            <button>OK</button>
        </div>
    </div>
</body>
<script>

</script>
</html>
