// website_script.js
{% if javascript -%}{{ javascript }}{%- endif %}

{% if google_analytics_id -%}
// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', '{{ google_analytics_id }}', 'auto');
ga('send', 'pageview');
// End Google Analytics
{%- endif %}
$(document).keydown(function (event) {
    if (event.keyCode == 123) { // Prevent F12
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 74) { // Prevent Ctrl+Shift+J
        return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 67) { // Prevent Ctrl+Shift+C
        return false;
    } else if (event.metaKey && event.altKey && event.keyCode == 73) { // Prevent Command+Option+I
        return false;
    } else if (event.metaKey && event.altKey && event.keyCode == 74) { // Prevent Command+Option+J
        return false;
    } else if (event.metaKey && event.altKey && event.keyCode == 67) { // Prevent Command+Option+C
        return false;
    } else if (event.metaKey && event.shiftKey && event.keyCode == 67) { // Prevent Command+Shift+C
        return false;
    } else if (event.ctrlKey && event.keyCode == 85) { // Prevent Ctrl+u
        return false;
    } else if (event.metaKey && event.keyCode == 85) { // Prevent Command+u
        return false;
    }
});
$(document).on("contextmenu", function (e) {
    e.preventDefault();
});