+++
widget = "blank"
headless = true

padding = ["0", "0", "0", "0"]
+++

<!--
<iframe src="https://wiki.hosting105451.a2fa5.netcup.net/doku.php" width="100%" frameborder="0" border="0" style="height: 548px; "></iframe>
-->


<script>
document.body.style.overflow = "hidden";

var content = document.getElementById("wiki");
content.style.paddingTop = "0px";

var ifrm = document.createElement('iframe');
ifrm.setAttribute('id', 'ifrm'); 
ifrm.setAttribute('width', '100%');
//ifrm.setAttribute('scrolling', 'no');
ifrm.style.position = "absolute";
ifrm.style.border = "0";
ifrm.style.height = "100%";
ifrm.setAttribute('src', 'https://forrtwiki.tinmind.de/');
content.appendChild(ifrm);
</script>

